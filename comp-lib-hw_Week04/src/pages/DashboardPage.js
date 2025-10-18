// DashboardPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import Accordion from '../components/Accordion';
import Banner from '../components/Banner';

const DashboardPage = () => {
    const components = [
        {
            id: 'button',
            name: 'Button',
            description: 'Basic button component with different styles',
            route: '/components/button'
        },
        {
            id: 'carousel',
            name: 'Carousel',
            description: 'Image carousel with clickable cards',
            route: '/components/carousel'
        },
        {
            id: 'banner',
            name: 'Banner',
            description: 'Info banner with different colors',
            route: '/components/banner'
        },
        {
            id: 'accordion',
            name: 'Accordion',
            description: 'Collapsible sections for content',
            route: '/components/accordion'
        },
        {
            id: 'dropdown',
            name: 'Dropdown',
            description: 'Select dropdown with custom styling',
            route: '/components/dropdown'
        }
    ];

    // Transform components data into accordion items
    const accordionItems = components.map(component => ({
        id: component.id,
        label: `${component.name}`,
        content: (
            <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed">{component.description}</p>
                <div className="flex items-center justify-between">
                  
                </div>
                <div className="pt-2">
                    <Link
                        to={component.route}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                        View Demo
                        <span className="material-icons ml-2 text-sm">arrow_forward</span>
                    </Link>
                </div>
            </div>
        )
    }));

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    Component Library
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                    A collection of reusable, accessible, and beautifully designed React components.
                </p>
                
                {/* Welcome Banner */}
                <Banner 
                    title="Welcome to the Component Library"
                    variant="blue"
                    instructions={[
                        "Browse our collection of React components",
                        "Each component includes live demos and code examples",
                        "All components are mobile-responsive and accessible"
                    ]}
                />
            </div>

            {/* Components Accordion */}
            <div className="bg-white rounded-lg   p-4 sm:p-6 mb-6 md:mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                    Available Components
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mb-6">
                    Click on any component to see details and access the demo.
                </p>
                <Accordion items={accordionItems} />
            </div>

           
        </div>
    );
};

export default DashboardPage;
