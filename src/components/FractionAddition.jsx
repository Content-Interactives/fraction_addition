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
    const [errors, setErrors] = useState(['', '']);

    useEffect(() => {
        const newErrors = ['', ''];
        for (let i = 0; i < 2; i++) {
            const num = parseInt(numerators[i], 10);
            const den = parseInt(denominators[i], 10);

            if (numerators[i] && denominators[i]) {
                if (num >= den) {
                    newErrors[i] = 'Numerator must be smaller than the denominator.';
                } else if (num > 10 || den > 10) {
                    newErrors[i] = 'Numbers cannot be greater than 10.';
                }
            }
        }
        setErrors(newErrors);
    }, [numerators, denominators]);

    const handleReset = () => {
        setNumerators(['', '']);
        setDenominators(['', '']);
        setShowFractions(false);
        setErrors(['', '']);
    };

    const handleNumeratorChange = (index, value) => {
        const newNumerators = [...numerators];
        newNumerators[index] = value.replace(/[^0-9]/g, '');
        setNumerators(newNumerators);
    };

    const handleDenominatorChange = (index, value) => {
        const newDenominators = [...denominators];
        newDenominators[index] = value.replace(/[^0-9]/g, '');
        setDenominators(newDenominators);
    };

	return (
        <Container 
            text="Fraction Addition"
            showResetButton={true}
            onReset={handleReset}
        >
            <div className="flex justify-center items-start h-full" style={{ position: 'relative', top: '60px' }}>
                <div className="flex items-start space-x-4">
                    <div className="flex flex-col items-center w-[4.5rem]">
                        <p className="text-base mb-2 text-center h-10 text-red-500">First Fraction</p>
                        <Input
                            value={numerators[0]}
                            onChange={(e) => handleNumeratorChange(0, e.target.value)}
                            className="text-center"
                            error={errors[0]}
                            focusColor="#008545"
                        />
                        <hr className="w-full border-t-2 border-red-500 my-1" />
                        <Input
                            value={denominators[0]}
                            onChange={(e) => handleDenominatorChange(0, e.target.value)}
                            className="text-center"
                            focusColor="#008545"
                        />
                    </div>
                    <div className="text-4xl mt-10">+</div>
                    <div className="flex flex-col items-center w-[4.5rem]">
                        <p className="text-base mb-2 text-center h-10 text-blue-500">Second Fraction</p>
                        <Input
                            value={numerators[1]}
                            onChange={(e) => handleNumeratorChange(1, e.target.value)}
                            className="text-center"
                            error={errors[1]}
                            focusColor="#008545"
                        />
                        <hr className="w-full border-t-2 border-blue-500 my-1" />
                        <Input
                            value={denominators[1]}
                            onChange={(e) => handleDenominatorChange(1, e.target.value)}
                            className="text-center"
                            focusColor="#008545"
                        />
                    </div>
                </div>
            </div>
            <FlexiText flexiImage={FlexiWave}>
                Enter two proper fractions to see how to add them step by step
            </FlexiText>
            {!showFractions && (
                <div className="absolute bottom-0 right-0 z-10 p-4">
                    <GlowButton onClick={() => setShowFractions(true)} bgColor="#E8EDF5">
                        <p className="whitespace-nowrap">Show Fractions</p>
                    </GlowButton>
                </div>
            )}
        </Container>
    )
};


export default FractionAddition;