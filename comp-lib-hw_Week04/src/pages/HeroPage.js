import React from 'react';
import Hero from '../components/Hero';

const image = '/hero.jpeg';

const HeroPage = () => {
    return (
        <div>
            <Hero variant="full" image={image} />
            <Hero variant="half" />
        </div>
    );
};


export default HeroPage;