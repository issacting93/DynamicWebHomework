// CarouselPage.jsx

import React from 'react';
import Carousel from '../components/Carousel';
import Banner from '../components/Banner';

const CarouselPage = () => {
    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
            {/* Page Header */}
            <div className="mb-6 md:mb-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                    Carousel Component Demo
                </h1>
                <p className="text-base sm:text-lg text-gray-600 mb-4 md:mb-6">
                    Click on cards to expand them.
                </p>
            </div>

            {/* Component Demo Section */}
            <div className="bg-white rounded-lg  p-4 sm:p-6 mb-6 md:mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 md:mb-4">
                    Interactive Carousel
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mb-4 md:mb-6">
                    Click on any card to expand it.
                </p>

                {/* Carousel Component */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-2 sm:p-4">
                    <Carousel />
                </div>
                
            </div>

            {/* Usage Instructions */}
            <Banner 
                title="How to Use"
                variant="blue"
                instructions={[
                    "Click any card to expand it",
                    "Click the expanded card to close it", 
                    "Use the close button to reset all cards",
                    "Cards animate when they expand"
                ]}
            />
        </div>
    );
};

export default CarouselPage;
