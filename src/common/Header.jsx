import React from 'react';
import Logo from "../assets/imgaes/Web3NestLogo.png";
import { Link } from 'react-router-dom';
import { removeItem } from '../services/localStorageService';

const Header = () => {
    return (
        <nav className="fixed top-0 z-50 w-full header dark:bg-cardbg">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start rtl:justify-end">
                        <Link to="/dashboard" className="flex ms-2 md:me-24">
                            <img src={Logo} className="h-8 me-3" alt="Logo" />
                        </Link>
                    </div>
                    <div className="flex items-center">
                        <Link to="/">
                            <button
                                className="group flex items-center justify-start w-9 h-9 bg-[#228B22] rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1"
                            >
                                <div
                                    className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3"
                                >
                                    <svg className="w-4 h-4" viewBox="0 0 512 512" fill="#ffffff">
                                        <path
                                            d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
                                        ></path>
                                    </svg>
                                </div>
                                <div
                                    className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                                    onClick={()=> removeItem('token')}
                                >
                                    Logout
                                </div>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;
