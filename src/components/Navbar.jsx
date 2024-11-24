"use client";
import { useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <div className="flex h-screen">
        {/* Sidebar */}
        <div className={`fixed inset-0 bg-gray-800 bg-opacity-50 md:hidden ${isOpen ? 'block' : 'hidden'}`} onClick={toggleSidebar}></div>

        <div
            className={`bg-[#44576D] rounded-tr-xl rounded-r-xl w-64 space-y-6 py-7 px-2 absolute md:relative md:left-0 md:top-0 md:transform-none md:w-64 md:flex-col md:space-y-4 ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300`}
        >
            {/* Logo */}
            <div className="text-white text-2xl font-bold m-4">E-Bike</div>

            {/* Links */}
            <nav className="space-y-2">
                <a href="#" className="text-[#AAC7D8] font-bold block py-2 px-4 rounded hover:bg-[#DFEBF6] hover:text-[#768A96]">Home</a>
                <a href="#" className="text-[#AAC7D8] font-bold block py-2 px-4 rounded hover:bg-[#DFEBF6] hover:text-[#768A96]">Book a Bike</a>
                <a href="#" className="text-[#AAC7D8] font-bold block py-2 px-4 rounded hover:bg-[#DFEBF6] hover:text-[#768A96]">All History</a>
                <a href="#" className="text-[#AAC7D8] font-bold block py-2 px-4 rounded hover:bg-[#DFEBF6] hover:text-[#768A96]">All Users</a>
                <a href="#" className="text-[#AAC7D8] font-bold block py-2 px-4 rounded hover:bg-[#DFEBF6] hover:text-[#768A96]">Contact</a>
            </nav>
        </div>

        {/* Toggle Button for Mobile */}
        <button
            className="md:hidden absolute top-4 left-4 text-black"
            onClick={toggleSidebar}
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </button>
        
    </div>
    );
};

const navItems = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "Services", path: "/services" },
    { title: "Blog", path: "/blog" },
    { title: "Contact", path: "/contact" },
];

export default Navbar;