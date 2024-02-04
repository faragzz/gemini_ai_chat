'use client';
import styles from './page.module.css';
import NavBar from '../../../components/NavBar'
import SideBar from "../../../components/SideBar";
import React, { useState } from 'react';
import NavBarU from '../../../components/NavBarU'
import Chat from '../../../components/chat';


interface pageProps{
    params:{room:string}
}
const Index = ({params}) => {


    const [title, setTitle] = React.useState(params.room);

    const handleRoomClick = (roomName: string) => {
        setTitle(roomName);
    };

    return (
        <div className="h-screen">
            <div className="fixed z-10 w-full">
                <NavBarU  handleNavbarClick={handleRoomClick} title={title} />
            </div>
            <div className="flex py-14 h-screen bg-gray-700">
                <Chat title={title} />
            </div>
        </div>
    );
};

export default Index;
