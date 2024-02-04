// pages/about.js
import React from 'react';
import Link from 'next/link';

const Page = () => {
    const rooms = ['Star Wars Room', 'Harry Potter Room'];

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-700">
            <div className="flex flex-col xl:flex-row justify-center items-center h-full w-full">
                <h1 className="ml-20 text-7xl font-bold md:mb-10 sm:mb-10 ">Choose The Room</h1>
                <div className="mockup-phone">
                    <div className="camera"></div>
                    <div className="display">
                        <div className="flex artboard artboard-demo phone-1 px-10">
                            <h1 className="mb-20 text-3xl font-medium ">RAGHUB</h1>
                            {rooms.map((room, index) => (
                                <Link key={index} href={`pages/chat/${room.toLowerCase().replace(/\s+/g, '-')}`}>
                                    <div className="mb-4 w-64 bg-amber-100 p-4 rounded-xl hover:bg-amber-50 text-center">
                                        <p className="text-black">{room}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
