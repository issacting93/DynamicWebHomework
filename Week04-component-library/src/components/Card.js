// Card.jsx

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Card = ({
    imgUrl = "",
    itemId = "",
    itemTitle = "",
    description = "",
    isSelected = false,
    icon = "",
    onCardClick,
    onClose
}) => {
    // Simple animation configuration
    const spring = { 
        duration: 0.3, 
        ease: "easeInOut" 
    };

    return (
        <motion.div
            className={`card ${isSelected ? 'card--expanded' : ''}`}
            style={{ backgroundImage: `url(${imgUrl})` }}
            onClick={() => onCardClick(itemId)}
            layout
            transition={spring}
        >
            {/* Card poster image with smooth opacity transition */}
            <motion.div
                className="card__poster"
                style={{ backgroundImage: `url(${imgUrl})` }}
                layout
                transition={spring}
                animate={{ opacity: isSelected ? 0.3 : 1 }}
            />

            {/* Card title overlay - Only visible when not selected */}
            <AnimatePresence>
                {!isSelected && (
                    <motion.div
                        className="card__title"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <span className="material-icons card__title-icon">
                            {icon || "landscape"}
                        </span>
                        <span className="card__title-text">{itemTitle}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Expanded content overlay with smooth animations */}
            <AnimatePresence>
                {isSelected && (
                    <motion.div
                        className="card__content"
                        layout
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={spring}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Content header */}
                        <div className="card__content-header">
                            <h2 className="card__content-title">{itemTitle}</h2>
                        </div>

                        {/* Content body */}
                        <div className="card__content-body">
                            <p className="card__content-description">
                              {description || `This is the expanded content area for item ID: ${itemId}.`}
                            </p>
                        </div>

                        {/* Content footer with close button */}
                        <div className="card__content-footer">
                            <button className="card__close-btn" onClick={onClose}>
                                <span className="material-icons">close</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Card;