'use client';
import React, { useEffect, useRef, useState } from "react";
import run from "../core/Gemini/fetch";
import Lottie from "lottie-react";
import loadingAnimation from '../../public/assets/loading/loading.json';
import TextareaAutosize from 'react-textarea-autosize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStop, faPlay } from "@fortawesome/free-solid-svg-icons";
import { Message } from "../core/dto/types";
import Defualt_Layout from "./Defualt_Layout";
import { sendMessageToRoom } from "../core/fetchLocal";

interface ApiResponse {
    success: boolean;
    data?: string;
    error?: string;
}

const Chat = ({ title }: { title: string }) => {
    const [mode, setMode] = useState(true);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const messageContainerRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(false);
    const [isEmptyPage, setIsEmptyPage] = useState(true);
    const [roomNumber, setRoomNumber] = useState("1");

    useEffect(() => {
        setMessages([]);
        setIsEmptyPage(true);
    }, [title]);

    const btnHandler = async (index: number) => {
        const updatedMessages = [...messages];

        if (messages[index].btn === 'stop') {
            stop();
            updatedMessages[index].btn = 'play';
            setMessages(updatedMessages);
            console.log('pause');
        } else {
            updatedMessages[index].btn = 'stop';
            setMessages(updatedMessages);

            const utterance = new SpeechSynthesisUtterance(updatedMessages[index].text);
            utterance.lang = "en-US";
            utterance.pitch = 1;
            utterance.rate = 1;
            utterance.volume = 0.5;

            speechSynthesis.speak(utterance);
            console.log('ok');

            await new Promise((resolve) => {
                utterance.onend = () => {
                    let finalMessages = [...updatedMessages];
                    finalMessages[index].btn = 'play';
                    setMessages(finalMessages);
                    resolve();
                };
            });
        }
    };

    const stop = () => {
        speechSynthesis.cancel();
    };

    const response = async () => {
        const isGemini = title !== 'gemini';
        setMode(isGemini);

        const roomNumber = title === 'star-wars-room' ? '1' : '2';

        try {
            setLoading(true);
            let data;

            if (isGemini) {
                console.log('mode activated');
                const responseL: ApiResponse = await sendMessageToRoom(roomNumber, newMessage);
                data = responseL.data!.toString();
            } else {
                const responseG = await run(newMessage);
                data = responseG.toString();
            }

            setLoading(false);
            setMessages((previous) => [...previous, { text: data, sender: "bot", btn: 'play' }]);
            setNewMessage("");
        } catch (error) {
            console.error("Error in response:", error);
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    useEffect(() => {
        messageContainerRef.current?.scrollTo({
            top: messageContainerRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [messages]);

    const handleSendMessage = async () => {
        if (newMessage.trim() === "") return;
        setIsEmptyPage(false);
        setMessages((previous) => [
            ...previous,
            { text: newMessage, sender: "user", btn: 'play' },
        ]);
        setNewMessage("");
        setLoading(true);
        console.log(title);
        await response();
    };

    return (
        <div className="flex flex-col items-center w-full bg-gray-700">
            {!isEmptyPage ? <div className="flex flex-col space-y-2 p-4 w-full bg-gray-700 bg-auto pb-32 pt-10 px-10">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`rounded-md ${
                            message.sender === "bot" ? "text-white p-3 " : "p-3 bg-gray-400 text-black"
                        }`}
                    >
                        <div className="flex justify-end items-center pr-2 h-5">
                            <button onClick={() => btnHandler(index)}>
                                {message.btn === 'play' ? (
                                    <FontAwesomeIcon icon={faPlay} />
                                ) : (
                                    <FontAwesomeIcon icon={faStop} />
                                )}
                            </button>
                        </div>
                        {message.text.split('\n').map((line, lineIndex) => (
                            <React.Fragment key={lineIndex}>
                                {line}
                                <br />
                            </React.Fragment>
                        ))}
                    </div>
                ))}
            </div> : <Defualt_Layout />}

            <div className={`flex flex-col fixed bottom-0 items-center w-2/3 mb-4  bg-gray-700 `}>
                {loading && (
                    <div className="h-[60px] w-[60px] ">
                        <Lottie animationData={loadingAnimation} loop={true} />
                    </div>
                )}
                <div className="flex justify-center items-end w-full ">
                    <TextareaAutosize
                        maxRows={15}
                        // minRows={1}
                        value={newMessage}
                        onKeyDown={handleKeyDown}
                        onChange={(e) => {
                            setNewMessage(e.target.value);
                        }}
                        placeholder="Type here"
                        className="input input-bordered w-full py-3 resize-none"

                    />
                    <button onClick={handleSendMessage} className="ml-2 btn btn-primary">
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
