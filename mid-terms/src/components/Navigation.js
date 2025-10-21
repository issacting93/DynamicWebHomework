import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// navigation bar
const Navigation = () => {
    const location = useLocation();

    // check if page is active
    const isActive = (path) => {
        return location.pathname === path;
    };


    return (
        <nav className="bg-black white-text border-b lg:flex-row flex-col  sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* logo */}
                    <Link 
                        to="/" 
                        className="flex items-center space-x-2 text-xl font-bold text-white"
                    > 
                        <span>Digital Synthesizer</span>
                    </Link>

                    {/* nav links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            to="/"
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                isActive('/') 
                                    ? 'text-white bg-black border-2 border-white' 
                                    : 'text-white hover:text-black hover:bg-white'
                            }`}
                        >
                            Sequencer
                        </Link>
                      
                        <Link
                            to="/grid"
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                isActive('/grid') 
                                    ? 'text-white bg-black border-2 border-white' 
                                    : 'text-white hover:text-black hover:bg-white'
                            }`}
                        >
                            Grid
                        </Link>
                        <Link
                            to="/controls"
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                isActive('/controls') 
                                    ? 'text-white bg-black border-2 border-white' 
                                    : 'text-white hover:text-black hover:bg-white'
                            }`}
                        >
                            Controls
                        </Link>
                        <Link
                            to="/set-up"
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                isActive('/set-up') 
                                    ? 'text-white bg-black border-2 border-white' 
                                    : 'text-white hover:text-black hover:bg-white'
                            }`}
                        >
                            Set Up
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
