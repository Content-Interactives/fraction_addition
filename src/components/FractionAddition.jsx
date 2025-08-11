import React, { useState, useEffect, useRef } from 'react';
import { Container } from './ui/reused-ui/Container';
import { Input } from './ui/reused-ui/Input';
import { FlexiText } from './ui/reused-ui/FlexiText';
import { GlowButton } from './ui/reused-ui/GlowButton';
import FlexiWave from '../assets/All Flexi Poses/SVG/Flexi_Wave.svg';


const FractionAddition = () => {
    const [numerators, setNumerators] = useState(['', '']);
    const [denominators, setDenominators] = useState(['', '']);
    const [showFractions, setShowFractions] = useState(false);

    const handleNumeratorChange = (index, value) => {
        const newNumerators = [...numerators];
        newNumerators[index] = value;
        setNumerators(newNumerators);
    };

    const handleDenominatorChange = (index, value) => {
        const newDenominators = [...denominators];
        newDenominators[index] = value;
        setDenominators(newDenominators);
    };

	return (
        <Container text="Fraction Addition">
            <div className="flex justify-center items-center h-full" style={{ position: 'relative', top: '60px' }}>
                <div className="flex items-center space-x-4">
                    <div className="flex flex-col items-center w-16">
                        <p className="text-base mb-1 text-center">First Fraction</p>
                        <Input
                            value={numerators[0]}
                            onChange={(e) => handleNumeratorChange(0, e.target.value)}
                            className="text-center"
                        />
                        <hr className="w-16 border-t-2 border-black my-1" />
                        <Input
                            value={denominators[0]}
                            onChange={(e) => handleDenominatorChange(0, e.target.value)}
                            className="text-center"
                        />
                    </div>
                    <div className="text-4xl">+</div>
                    <div className="flex flex-col items-center w-16">
                        <p className="text-base mb-1 text-center">Second Fraction</p>
                        <Input
                            value={numerators[1]}
                            onChange={(e) => handleNumeratorChange(1, e.target.value)}
                            className="text-center"
                        />
                        <hr className="w-16 border-t-2 border-black my-1" />
                        <Input
                            value={denominators[1]}
                            onChange={(e) => handleDenominatorChange(1, e.target.value)}
                            className="text-center"
                        />
                    </div>
                </div>
            </div>
            <FlexiText flexiImage={FlexiWave}>
                Enter two proper fractions to see how to add them step by step
            </FlexiText>
            <div className="absolute bottom-0 right-0 z-10 p-4">
                <GlowButton onClick={() => setShowFractions(true)} bgColor="#E8EDF5">
                    <p className="whitespace-nowrap">Show Fractions</p>
                </GlowButton>
            </div>
        </Container>
    )
};


export default FractionAddition;