// Carousel.jsx

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Card from './Card';
import Button from './Button';

// Mock data for the carousel with content
const itemData = [
    {
        id: "item01",
        title: "Mountain Peak",
        img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=800&fit=crop",
        description: "Towering peaks and alpine adventures.",
        icon: "landscape"
    },
    {
        id: "item02",
        title: "Ocean Waves",
        img: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=800&fit=crop",
        description: "Endless waves perfect for surfing.",
        icon: "waves"
    },
    {
        id: "item03",
        title: "Forest Trail",
        img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=800&fit=crop",
        description: "Ancient trails through towering trees.",
        icon: "forest"
    },
    {
        id: "item04",
        title: "Desert Sunset",
        img: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&h=800&fit=crop",
        description: "Golden sand dunes at sunset.",
        icon: "wb_twilight"
    },
    {
        id: "item05",
        title: "Northern Lights",
        img: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=400&h=800&fit=crop",
        description: "Aurora borealis dancing in the sky.",
        icon: "flare"   
    },
];

export default function Carousel() {
    const [selectedItem, setSelectedItem] = useState(null);

    const handleCardClick = (itemId) => {
        if (selectedItem === itemId) {
            // Close the selected card
            setSelectedItem(null);
        } else {
            // Select a different card
            setSelectedItem(itemId);
        }
    };

    const handleClose = () => {
        setSelectedItem(null);
    };

    const carouselClasses = `carousel-container ${selectedItem ? 'state-1' : 'state-0'}`;

    return (
        <div className={carouselClasses}>
            <AnimatePresence mode="popLayout">
                {itemData.map(item => (
                    <Card
                        key={item.id}
                        imgUrl={item.img}
                        itemId={item.id}
                        itemTitle={item.title}
                        description={item.description}
                        isSelected={selectedItem === item.id}
                        onCardClick={handleCardClick}
                        onClose={handleClose}
                        icon={item.icon}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
}