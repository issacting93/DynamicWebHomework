// Hero.js


import cx from 'classnames';
import { hex } from 'framer-motion';
import React from 'react';
import '../index.css';

const Hero = ({ 
    title = "Hero Banner",
    instructions = [],
    variant = "full"  ,  // full, half
    image = "", 
}) => {
    // Color variants
    const variants = {
        full: {
            container: "background",
            title: "Design of Everyday",
            text: "text-blue-700",
            height: "h-1/2",
            width: "w-full",
            textAlign: "text-center",

        },
        half: {
            container: "bg-green-50",
            title: "Half Banner", 
            text: "text-green-700",
            height: "h-1/3",
            width: "w-full",
            textAlign: "text-left",
        } 
    };

    const sizes = variants[variant] || variants.full;

    return (
        <div className={cx(
            sizes.container,
            sizes.height,
            sizes.width,
            "rounded-lg",
            "overflow-hidden",
            "p-4",
            "sm:p-6",
            "object-cover"
        )}>
            <h3 className={`font-semibold ${sizes.title} mb-2 text-sm sm:text-base`}>
            {sizes.title} 
            </h3>

        <div className="rounded-lg overflow-hidden h-[500px] object-bottom">
            {image && <img src={image} alt="Hero" />}
            </div>
            <h1 className={`space-y-1 text-xl  m-4 black-ops-one-regular ${sizes.textAlign}`}> NEW YORK, NY</h1>
        </div>
    );
};

export default Hero;
