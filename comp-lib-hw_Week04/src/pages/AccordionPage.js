// AccordionPage.jsx

import React from 'react';
import Accordion from '../components/Accordion';
import Banner from '../components/Banner';
import ITEMS from '../data/items';

const AccordionPage = () => {
    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
            {/* Page Header */}
            <div className="mb-6 md:mb-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                    Accordion Component Demo
                </h1>
                <p className="text-base sm:text-lg text-gray-600 mb-4 md:mb-6">
                    Click to expand and collapse sections.
                </p>
            </div>

            {/* Component Demo Section */}
            <div className="bg-white rounded-lg p-4 sm:p-6 mb-6 md:mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 md:mb-4">
                    Interactive Accordion
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mb-4 md:mb-6">
                    Click on any section to open it.
                </p>

                {/* Accordion Component */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-2 sm:p-4 min-h-[750px]">
                    <Accordion items={ITEMS} />
                </div>
            </div>

            {/* Usage Instructions */}
            <Banner 
                title="How to Use"
                variant="blue"
                instructions={[
                    "Click any header to open that section",
                    "Click the same header to close it",
                    "Only one section can be open at a time",
                    "The arrow rotates when you click"
                ]}
            />
        </div>
    );
};

export default AccordionPage; 