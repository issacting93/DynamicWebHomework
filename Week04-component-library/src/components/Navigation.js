// Navigation.js - Main navigation component

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo/Brand */}
                    <Link 
                        to="/" 
                        className="flex items-center space-x-2 text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
                    > 
                        <span> Sequencer </span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            to="/"
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                isActive('/') 
                                    ? 'text-blue-600 bg-blue-50' 
                                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                            }`}
                        >
                           Hero Banner
                        </Link>
                        <Link
                            to="/components/button"
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                isActive('/components/button') 
                                    ? 'text-blue-600 bg-blue-50' 
                                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                            }`}
                        >
                            Button
                        </Link>
                          
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button className="text-gray-700 hover:text-blue-600 transition-colors">
                            <span className="material-icons">menu</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
