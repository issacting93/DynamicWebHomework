// DropdownPage.jsx

import React, { useState } from 'react';
import Dropdown from '../components/Dropdown';
import Banner from '../components/Banner';

const DropdownPage = () => {
    // Sample options for the dropdown
    const colorOptions = [
        { label: 'Red', value: 'red' },
        { label: 'Blue', value: 'blue' },
        { label: 'Green', value: 'green' },
        { label: 'Yellow', value: 'yellow' },
        { label: 'Purple', value: 'purple' },
        { label: 'Orange', value: 'orange' },
        { label: 'Pink', value: 'pink' },
        { label: 'Black', value: 'black' }
    ];

    const [selectedColor, setSelectedColor] = useState(null);

    const handleColorChange = (option) => {
        setSelectedColor(option);
        console.log('Selected color:', option);
    };

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
            {/* Page Header */}
            <div className="mb-6 md:mb-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                    Dropdown Component Demo
                </h1>
                <p className="text-base sm:text-lg text-gray-600 mb-4 md:mb-6">
                    Select an option from the dropdown.
                </p>
            </div>

            {/* Component Demo Section */}
            <div className="bg-white rounded-lg  p-4 sm:p-6 mb-6 md:mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 md:mb-4">
                    Interactive Dropdown
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mb-4 md:mb-6">
                    Click the dropdown to see options.
                </p>

                {/* Dropdown Component */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-2 sm:p-4">
                    <Dropdown 
                        options={colorOptions} 
                        onChange={handleColorChange}
                        label="Select a color"
                        placeholder="Choose your favorite color"
                    />
                </div>

                {/* Selected Value Display */}
                {selectedColor && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <h3 className="text-lg font-semibold text-blue-800 mb-2">Selected Value:</h3>
                        <div className="flex items-center space-x-3">
                            <div 
                                className="w-8 h-8 rounded-full border-2 border-gray-300"
                                style={{ backgroundColor: selectedColor.value }}
                            ></div>
                            <span className="text-blue-700 font-medium">
                                {selectedColor.label} ({selectedColor.value})
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* Usage Instructions */}
            <Banner 
                title="How to Use"
                variant="blue"
                instructions={[
                    "Click the dropdown to open it",
                    "Click any option to select it",
                    "Click outside to close it",
                    "Your selection shows below"
                ]}
            />

       
        </div>
    );
};

export default DropdownPage;