'use client';
import React, { useEffect, useRef, useState } from "react";
import run from "../core/Gemini/fetch";

type Message = {
    text: string;
    sender: string;
};

const Chat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const messageContainerRef = useRef<HTMLDivElement>(null);

    const response = async () => {
        const response = await run(newMessage);
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
        await response();
    };

    return (
        <div className="flex flex-col items-center bg-gray-700 h-screen w-full">
            <div className="flex flex-col space-y-2 p-4 w-full h-screen">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`rounded-md ${
                            message.sender === "bot" ? "text-white  pl-3 " : "p-3 bg-gray-300 text-black"
                        }`}
                    >
                        {message.text}
                    </div>
                ))}
            </div>

            <div className="flex justify-center fixed bottom-0 w-2/3 py-2">
        <textarea
            value={newMessage}
            onKeyDown={handleKeyDown}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type here"
            className="input input-bordered w-full py-2 resize-none"
        />
                <button onClick={handleSendMessage} className="ml-2 btn btn-primary">
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;
