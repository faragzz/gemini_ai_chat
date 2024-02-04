// 'use client';
// import React, { useState } from "react";
// import Image from "next/image";
// import Link from 'next/link';
// import fetchQuote from "../core/fetch/Fetch";
// import Snackbar from '@mui/material/Snackbar';
// import {QuoteDto} from "../core/dto/QuoteDto";
//
//
// const NavBar = () => {
//     // Set the category and state variables
//     const category = 'happiness';
//     const [quote, setQuote] = useState<QuoteDto | null>(null);
//     const [snackbarOpen, setSnackbarOpen] = useState(false);
//
//     const sendUrl = async () => {
//         try {
//             const result = await fetchQuote(category);
//             setQuote(result);
//             setSnackbarOpen(true);
//             console.error('200 :', result);
//
//         } catch (error:Error) {
//             console.error('Error:', error.message);
//             setSnackbarOpen(true);
//         }
//     };
//
//     const handleSnackbarClose = () => {
//         setSnackbarOpen(false);
//         setQuote(null);
//     };
//
//
//     return (
//         <div className="flex h-32 w-full bg-amber-100 py-10 z-2 shadow-3xl shadow-white">
//             {/* Left */}
//             <div className="flex gap-10 ml-10 w-1/2">
//                 <h1 className="text-3xl font-bold">Chats</h1>
//                 <div className="flex gap-3 items-center text-lg font-medium">
//                     <Link href="/">Home</Link>
//                     <Link href="/about">About</Link>
//                     <button onClick={sendUrl}>Quote</button>
//                 </div>
//             </div>
//
//             {/* Right */}
//             <div className="flex w-1/2 justify-end items-center mr-10">
//                 <nav className="flex gap-3 items-center text-lg font-medium">
//                     <Link href="/pages/chat">Settings</Link>
//                     <a href="">
//                         <Image
//                             src="/assets/images/profile.jfif"
//                             alt="profile image"
//                             width={100}
//                             height={100}
//                             className="rounded-full"
//                         />
//                     </a>
//                 </nav>
//             </div>
//             <Snackbar
//                 open={snackbarOpen}
//                 // autoHideDuration={}
//                 onClose={handleSnackbarClose}
//                 message= {quote? quote[0].quote : 'Error'}
//             />
//         </div>
//     );
// };
//
// export default NavBar;
