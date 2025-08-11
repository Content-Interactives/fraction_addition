import React, { useState, useEffect, useRef } from 'react';
import { Container } from './ui/reused-ui/Container';
import { Input } from './ui/reused-ui/Input';
import { FlexiText } from './ui/reused-ui/FlexiText';
import { GlowButton } from './ui/reused-ui/GlowButton';
import FlexiWave from '../assets/All Flexi Poses/SVG/Flexi_Wave.svg';
import './ui/reused-animations/width.css';


const FractionAddition = () => {
    const [numerators, setNumerators] = useState(['', '']);
    const [denominators, setDenominators] = useState(['', '']);
    const [showFractions, setShowFractions] = useState(false);
    const [errors, setErrors] = useState([false, false]);
    const [hideFractionLabels, setHideFractionLabels] = useState(false);
    const [isShrinking, setIsShrinking] = useState(false);
    const [isButtonShrinking, setIsButtonShrinking] = useState(false);
    const [showAnimatedLines, setShowAnimatedLines] = useState(false);
    const [translateFractions, setTranslateFractions] = useState(false);
    const [hidePlusSign, setHidePlusSign] = useState(false);

    useEffect(() => {
        const newErrors = [false, false];
        for (let i = 0; i < 2; i++) {
            const numStr = numerators[i];
            const denStr = denominators[i];

            if (numStr && denStr) {
                const num = parseInt(numStr, 10);
                const den = parseInt(denStr, 10);
                if (num >= den || num === 0 || den === 0) {
                    newErrors[i] = true;
                }
            } else if (numStr || denStr) {
                newErrors[i] = true;
            }
        }
        setErrors(newErrors);
    }, [numerators, denominators]);

    const handleReset = () => {
        setNumerators(['', '']);
        setDenominators(['', '']);
        setShowFractions(false);
        setErrors([false, false]);
        setHideFractionLabels(false);
        setIsShrinking(false);
        setIsButtonShrinking(false);
        setShowAnimatedLines(false);
        setTranslateFractions(false);
        setHidePlusSign(false);
    };

    const handleValueChange = (setter, values, index, value) => {
        let numericValue = value.replace(/[^0-9]/g, '');
        if (numericValue !== '' && parseInt(numericValue, 10) > 10) {
            numericValue = '10';
        }
        const newValues = [...values];
        newValues[index] = numericValue;
        setter(newValues);
    };

    const handleNumeratorChange = (index, value) => {
        handleValueChange(setNumerators, numerators, index, value);
    };

    const handleDenominatorChange = (index, value) => {
        handleValueChange(setDenominators, denominators, index, value);
    };

    const handleShowFractions = () => {
        const finalErrors = [false, false];
        let hasErrors = false;

        for (let i = 0; i < 2; i++) {
            const numStr = numerators[i];
            const denStr = denominators[i];

            if (!numStr || !denStr) {
                finalErrors[i] = true;
                hasErrors = true;
                continue;
            }

            const num = parseInt(numStr, 10);
            const den = parseInt(denStr, 10);

            if (num >= den || num === 0 || den === 0) {
                finalErrors[i] = true;
                hasErrors = true;
            }
        }

        setErrors(finalErrors);

        if (!hasErrors) {
            setHideFractionLabels(true);
            setIsButtonShrinking(true);
            setTimeout(() => {
                setIsShrinking(true);
                setTimeout(() => {
                    setShowFractions(true);
                    setTimeout(() => {
                        setShowAnimatedLines(true);
                        setTimeout(() => {
                            setTranslateFractions(true);
                            setHidePlusSign(true);
                        }, 500);
                    }, 300);
                }, 500);
            }, 500);
        }
    };

	return (
        <Container 
            text="Fraction Addition"
            showResetButton={true}
            onReset={handleReset}
        >
            <div className="flex justify-center items-start h-full" style={{ position: 'relative', top: '60px' }}>
                <div className="flex items-start space-x-4">
                    <div className={`flex flex-col items-center w-[4.5rem] transition-transform duration-500 ease-in-out ${translateFractions ? '-translate-y-20 -translate-x-16' : ''}`}>
                        <p className={`text-base mb-2 text-center h-10 text-red-500 ${hideFractionLabels ? 'fade-out-up-animation' : ''}`}>First Fraction</p>
                        <div className="relative">
                            <Input
                                value={numerators[0]}
                                onChange={(e) => handleNumeratorChange(0, e.target.value)}
                                className="text-center"
                                error={errors[0]}
                                focusColor="#5750E3"
                                containerClassName={`${isShrinking ? 'shrink-out-animation' : ''}`}
                            />
                            {showFractions && <p className="absolute inset-0 text-2xl continue-animation flex items-center justify-center">{numerators[0]}</p>}
                        </div>
                        <hr className={`w-full border-t-2 border-red-500 my-1 ${showAnimatedLines ? 'shrink-width-animation' : ''}`} />
                        <div className="relative">
                            <Input
                                value={denominators[0]}
                                onChange={(e) => handleDenominatorChange(0, e.target.value)}
                                className="text-center"
                                error={errors[0]}
                                focusColor="#5750E3"
                                containerClassName={`${isShrinking ? 'shrink-out-animation' : ''}`}
                            />
                            {showFractions && <p className="absolute inset-0 text-2xl continue-animation flex items-center justify-center">{denominators[0]}</p>}
                        </div>
                    </div>
                    <div className={`text-4xl mt-16 transition-opacity duration-300 ${hidePlusSign ? 'opacity-0' : ''}`}>+</div>
                    <div className={`flex flex-col items-center w-[4.5rem] transition-transform duration-500 ease-in-out ${translateFractions ? '-translate-y-20 translate-x-16' : ''}`}>
                        <p className={`text-base mb-2 text-center h-10 text-blue-500 ${hideFractionLabels ? 'fade-out-up-animation' : ''}`}>Second Fraction</p>
                        <div className="relative">
                            <Input
                                value={numerators[1]}
                                onChange={(e) => handleNumeratorChange(1, e.target.value)}
                                className="text-center"
                                error={errors[1]}
                                focusColor="#5750E3"
                                containerClassName={`${isShrinking ? 'shrink-out-animation' : ''}`}
                            />
                            {showFractions && <p className="absolute inset-0 text-2xl continue-animation flex items-center justify-center">{numerators[1]}</p>}
                        </div>
                        <hr className={`w-full border-t-2 border-blue-500 my-1 ${showAnimatedLines ? 'shrink-width-animation' : ''}`} />
                        <div className="relative">
                            <Input
                                value={denominators[1]}
                                onChange={(e) => handleDenominatorChange(1, e.target.value)}
                                className="text-center"
                                error={errors[1]}
                                focusColor="#5750E3"
                                containerClassName={`${isShrinking ? 'shrink-out-animation' : ''}`}
                            />
                            {showFractions && <p className="absolute inset-0 text-2xl continue-animation flex items-center justify-center">{denominators[1]}</p>}
                        </div>
                    </div>
                </div>
            </div>
            <FlexiText flexiImage={FlexiWave}>
                Enter two proper fractions to see how to add them step by step
            </FlexiText>
            {!showFractions && (
                <div className={`absolute bottom-0 right-0 z-10 p-4 ${isButtonShrinking ? 'shrink-out-animation' : ''}`}>
                    <GlowButton onClick={handleShowFractions} bgColor="#E8EDF5" autoShrinkOnClick={false}>
                        <p className="whitespace-nowrap">Show Fractions</p>
                    </GlowButton>
                </div>
            )}
        </Container>
    )
};


export default FractionAddition;