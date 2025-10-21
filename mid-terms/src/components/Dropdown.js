import React, { useState, useRef, useEffect } from 'react';
import { GoChevronDown } from 'react-icons/go';
import cx from 'classnames';

const Dropdown = ({
    options = [],
    onChange = () => {},
    placeholder = 'Select an option',
    className = '',
    disabled = false,
    label = ''
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const dropdownRef = useRef();

    // close when clicking outside
    useEffect(() => {
        const handler = (event) => {
            if (!dropdownRef.current?.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handler, true);
        return () => {
            document.removeEventListener('click', handler);
        };
    }, []);

    const handleToggle = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
        }
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        onChange(option);
        setIsOpen(false);
    };

    const renderedOptions = options.map((option, index) => (
        <div 
            key={option.value || index}
            className="px-4 py-2 cursor-pointer hover:bg-blue-50 transition-colors text-black first:rounded-t-md last:rounded-b-md"
            onClick={() => handleOptionClick(option)}
        >
            {option.label}
        </div>
    ));

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
          
            <div 
                className={cx(
                    'w-full p-4 border border-gray-300 rounded-md bg-black white-text cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors',
                    {
                        'opacity-50 cursor-not-allowed': disabled,
                        'hover:border-gray-400': !disabled
                    }
                )}
                onClick={handleToggle}
            >
                <div className="flex justify-between items-center">
                    <span className={selectedOption ? 'text-gray-900' : 'text-gray-500'}>
                        {selectedOption?.label || placeholder}
                    </span>
                    <GoChevronDown 
                        className={cx(
                            'h-5 w-5 text-yellow-500 transition-transform duration-200',
                            {
                                'rotate-180': isOpen,
                                'text-gray-400': disabled
                            }
                        )} 
                    />
                </div>
            </div>

            {/* dropdown menu */}
            {isOpen && !disabled && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md  mt-1 z-10 max-h-60 overflow-y-auto">
                    {renderedOptions}
                </div>
            )}
        </div>
    );
};
 

export default Dropdown;