import React from "react";

const SideBar =()=>{
    const items = ["Item 1", "Item 2", "Item 3"]
    return (
        <div className="flex flex-col items-center bg-yellow-100/80 w-1/4 h-screen">
            <input
                type="text"
                className="mt-10 flex border rounded-xl px-2 py-2 w-2/3 focus:outline-none focus:border-blue-500"
                placeholder={"Search"}
            />
            {/* List */}
            <ul className="bg-amber-50 h-screen border rounded-md mt-10 -m-2 w-11/12">
                {items.map((item, index) => (
                    <li key={index} className="py-4 pl-2 border-b">
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default SideBar;