// Accordion.jsx

import React, { useState } from 'react';
import { GoChevronDown } from 'react-icons/go';

const Accordion = ({ 
    items = [],
    allowMultiple = false,
    defaultExpanded = 0,
    className = ''
}) => {
    const [expandedIndex, setExpandedIndex] = useState(defaultExpanded);

    const handleClick = (nextIndex) => {
        setExpandedIndex((currentExpandedIndex) => {
            if (currentExpandedIndex === nextIndex) {
                return -1; // Close if clicking the same item
            } else {
                return nextIndex; // Expand the clicked item
            }
        });
    };


    
    const renderedItems = items.map((item, index) => {
        const isExpanded = index === expandedIndex;

        const icon = (
            <span className={`text-lg transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}>
                <GoChevronDown />
            </span>
        );

        return (
            <div key={item.id} className={`${className}`}>
                <div 
                    onClick={() => handleClick(index)}
                    className="accordion-container hover:bg-gray-50 transition-all duration-200 border border-gray-300 rounded-lg p-4 cursor-pointer"
                >  
                    <div className="accordion-item">
                        <div className="flex justify-between items-center">
                            <h2 className="font-bold text-lg">{item.label}</h2> 
                            {icon}
                        </div>
                        
                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}>
                            <hr className="my-2" />  
                            <div className="accordion-body pb-2">{item.content}</div>  
                        </div>
                    </div>
                </div>   
            </div>
        );
    });

    return (
        <div className="mx-auto space-y-4">
            {renderedItems}
        </div>
    );
};

export default Accordion;  