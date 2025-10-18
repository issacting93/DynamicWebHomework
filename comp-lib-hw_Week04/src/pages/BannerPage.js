// BannerPage.jsx

import React from 'react';
import Banner from '../components/Banner';

const BannerPage = () => {
    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
            {/* Page Header */}
            <div className="mb-6 md:mb-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                    Banner Component Demo
                </h1>
                <p className="text-base sm:text-lg text-gray-600 mb-4 md:mb-6">
                    Different colored banners for different messages.
                </p>
            </div>

            {/* Component Demo Section */}
            <div className="space-y-6">
                
                {/* Information Banner */}
                <div className="bg-white rounded-lg   p-4 sm:p-6">
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                        Information Banner (Blue)
                    </h2>
                    <Banner 
                        title="Getting Started"
                        variant="blue"
                        instructions={[
                            "Welcome to our component library",
                            "Each component is fully responsive",
                            "Check out the examples below"
                        ]}
                    />
                </div>

                {/* Success Banner */}
                <div className="bg-white rounded-lg p-4 sm:p-6">
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                        Success Banner (Green)
                    </h2>
                    <Banner 
                        title="Setup Complete"
                        variant="green"
                        instructions={[
                            "Your project has been successfully configured",
                            "All dependencies are installed",
                            "Ready to start development"
                        ]}
                    />
                </div>

                {/* Warning Banner */}
                <div className="bg-white rounded-lg  p-4 sm:p-6">
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                        Warning Banner (Yellow)
                    </h2>
                    <Banner 
                        title="Important Notice"
                        variant="yellow"
                        instructions={[
                            "This feature is in beta testing",
                            "Some functionality may be limited",
                            "Report any issues you encounter"
                        ]}
                    />
                </div>

                {/* Error Banner */}
                <div className="bg-white rounded-lg  p-4 sm:p-6">
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                        Error Banner (Red)
                    </h2>
                    <Banner 
                        title="Action Required"
                        variant="red"
                        instructions={[
                            "Your session will expire in 5 minutes",
                            "Save your work before continuing",
                            "Contact support if you need help"
                        ]}
                    />
                </div>
 

            </div>
        </div>
    );
};

export default BannerPage;
