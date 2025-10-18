// ButtonPage.jsx

import React from 'react';
import Button from '../components/Button';
import Banner from '../components/Banner';

const ButtonPage = () => {
    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
            {/* Page Header */}
            <div className="mb-6 md:mb-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                    Button Component Demo
                </h1>
                <p className="text-base sm:text-lg text-gray-600 mb-4 md:mb-6">
                    Different button styles and colors.
                </p>
            </div>

            {/* Component Demo Section */}
            <div className="bg-white rounded-lg p-4 sm:p-6 mb-6 md:mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 md:mb-4">
                    Button Variants
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mb-6">
                    Try clicking the buttons below.
                </p>

                {/* Button Examples */}
                <div className="space-y-6">
                    {/* Primary Buttons */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">Primary Buttons</h3>
                        <div className="flex flex-wrap gap-3">
                            <Button
                                primary
                                onClick={() => console.log('Primary clicked')}
                            >
                                Primary
                            </Button>
                            <Button
                                primary
                                outline
                                onClick={() => console.log('Primary outline clicked')}
                            >
                                Primary Outline
                            </Button>
                            <Button
                                primary
                                rounded
                                onClick={() => console.log('Primary rounded clicked')}
                            >
                                Primary Rounded
                            </Button>
                        </div>
                    </div>

                    {/* Secondary Buttons */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">Secondary Buttons</h3>
                        <div className="flex flex-wrap gap-3">
                            <Button secondary>Secondary</Button>
                            <Button secondary outline>Secondary Outline</Button>
                            <Button secondary rounded>Secondary Rounded</Button>
                        </div>
                    </div>

                    {/* Status Buttons */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">Status Buttons</h3>
                        <div className="flex flex-wrap gap-3">
                            <Button success>Success</Button>
                            <Button warning>Warning</Button>
                            <Button danger>Danger</Button> 
                        </div>
                    </div>

                    {/* Disabled State */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">Disabled State</h3>
                        <div className="flex flex-wrap gap-3">
                            <Button primary disabled>Disabled Primary</Button>
                            <Button secondary disabled>Disabled Secondary</Button>
                            <Button success disabled>Disabled Success</Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Usage Instructions */}
            <Banner 
                title="How to Use"
                variant="blue"
                instructions={[
                    "Import the Button component",
                    "Add props like primary, secondary, success",
                    "Use rounded for round buttons",
                    "Add outline for outlined style",
                    "Set disabled to disable the button"
                ]}
            />
        </div>
    );
};

export default ButtonPage;
