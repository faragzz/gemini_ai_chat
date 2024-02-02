'use client';
import React, { useEffect, useRef, useState } from "react";
import run from "../core/Gemini/fetch";
import Lottie from "lottie-react";
import loadingAnimation from '../../public/assets/loading/loading.json'
import TextareaAutosize from 'react-textarea-autosize';


type Message = {
    text: string;
    sender: string;
};

const Chat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const messageContainerRef = useRef<HTMLDivElement>(null);
    const [loading,setLoading]=useState(false);

    const useTextToSpeech= ()=>{
        if (!messages[ messages.length-1].text)return
        var utterance = new SpeechSynthesisUtterance(messages[ messages.length-1].text);
        utterance.lang = "en-US";
        utterance.pitch= 1;
        utterance.rate=1;
        utterance.volume=0.5

        speechSynthesis.speak(utterance);
    }
    const response = async () => {
        const response = await run(newMessage);
        setLoading(false);
        setMessages((previous) => [...previous, { text: response, sender: "bot" }]);
        setNewMessage("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    useEffect(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop =
                messageContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (newMessage.trim() === "") return;
        setMessages((previous) => [
            ...previous,
            { text: newMessage, sender: "user" },
        ]);
        setNewMessage("");
        setLoading(true );

        await response();
    };

    return (
        <div className="flex flex-col items-center  w-full bg-gray-700 ">
            <div className="flex flex-col space-y-2 p-4 w-full  bg-gray-700 bg-auto pb-32 pt-10 px-10">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`rounded-md ${
                            message.sender === "bot" ? "text-white  pl-3 " : "p-3 bg-gray-400 text-black"
                        }`}
                    >
                        {message.text.split('\n').map((line, lineIndex) => (
                            <React.Fragment key={lineIndex}>
                                {line}
                                <br />
                            </React.Fragment>
                        ))}
                    </div>
                ))}

            </div>
            <div className={`flex flex-col fixed bottom-0 items-center w-2/3 mb-4  `}>
                {loading && <div className="h-[60px] w-[60px] ">
                    <Lottie animationData={loadingAnimation} loop={true}/>
                </div>}
                <div className="flex justify-center items-end w-full h-full">
                    <TextareaAutosize
                        maxRows={15}
                        minRows={1}
                        value={newMessage}
                        onKeyDown={handleKeyDown}
                        onChange={(e) => {
                            setNewMessage(e.target.value)
                        }}
                        placeholder="Type here"
                        className="input input-bordered w-full py-3 resize-none h-full"

                    />
                    <button onClick={handleSendMessage} className="ml-2 btn btn-primary">
                        Send
                    </button>
                    <button className="ml-2 btn btn-primary" onClick={ useTextToSpeech}>Speak</button>
                </div>
            </div>
        </div>
    );
};

export default Chat;