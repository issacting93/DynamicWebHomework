// Banner.js

import React from 'react';

const Banner = ({ 
    title = "Information",
    instructions = [],
    variant = "blue" // blue, green, yellow, red
}) => {
    // Color variants
    const variants = {
        blue: {
            container: "bg-blue-50",
            title: "text-blue-800",
            text: "text-blue-700"
        },
        green: {
            container: "bg-green-50",
            title: "text-green-800", 
            text: "text-green-700"
        },
        yellow: {
            container: "bg-yellow-50",
            title: "text-yellow-800",
            text: "text-yellow-700"
        },
        red: {
            container: "bg-red-50",
            title: "text-red-800",
            text: "text-red-700"
        }
    };

    const colors = variants[variant] || variants.blue;

    return (
        <div className={`${colors.container} rounded-lg p-4 sm:p-6`}>
            <h3 className={`font-semibold ${colors.title} mb-2 text-sm sm:text-base`}>
                {title}:
            </h3>
            <ul className={`${colors.text} space-y-1 text-sm sm:text-base`}>
                {instructions.map((instruction, index) => (
                    <li key={index}>• {instruction}</li>
                ))}
            </ul>
        </div>
    );
};

export default Banner;
