import React, { useState, useEffect, useRef } from 'react';
import { Container } from './ui/reused-ui/Container';
import { Input } from './ui/reused-ui/Input';
import { FlexiText } from './ui/reused-ui/FlexiText';
import { GlowButton } from './ui/reused-ui/GlowButton';
import { PieChart, Pie, Cell } from 'recharts';
import FlexiWave from '../assets/All Flexi Poses/SVG/Flexi_Wave.svg';
import FlexiTeacher from '../assets/All Flexi Poses/SVG/Flexi_Teacher.svg';
import './ui/reused-animations/width.css';
import './ui/reused-animations/fade.css';


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
    const [showPieCharts, setShowPieCharts] = useState(false);
    const [showSecondFlexi, setShowSecondFlexi] = useState(false);
    const [fadeFirstFlexi, setFadeFirstFlexi] = useState(false);
    const [hideFirstFlexi, setHideFirstFlexi] = useState(false);
    const [showNextButton, setShowNextButton] = useState(false);
    const [fadeNextButton, setFadeNextButton] = useState(false);
    const [hideNextButton, setHideNextButton] = useState(false);
    const [fadeSecondFlexi, setFadeSecondFlexi] = useState(false);
    const [hideSecondFlexi, setHideSecondFlexi] = useState(false);
    const [showCommonFlexi, setShowCommonFlexi] = useState(false);
    const [commonDenominator, setCommonDenominator] = useState(null);
    const [showFirstMultipliers, setShowFirstMultipliers] = useState(false);
    const [firstMultiplier, setFirstMultiplier] = useState(null);
    const [showSecondMultipliers, setShowSecondMultipliers] = useState(false);
    const [secondMultiplier, setSecondMultiplier] = useState(null);

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
        setShowPieCharts(false);
        setShowSecondFlexi(false);
        setFadeFirstFlexi(false);
        setHideFirstFlexi(false);
        setShowNextButton(false);
        setFadeNextButton(false);
        setHideNextButton(false);
        setFadeSecondFlexi(false);
        setHideSecondFlexi(false);
        setShowCommonFlexi(false);
        setCommonDenominator(null);
        setShowFirstMultipliers(false);
        setFirstMultiplier(null);
        setShowSecondMultipliers(false);
        setSecondMultiplier(null);
    };

    // Show multiplier numbers for BOTH fractions shortly after the common denominator bubble appears
    useEffect(() => {
        if (!showCommonFlexi) return;
        const den1 = parseInt(denominators[0], 10);
        const den2 = parseInt(denominators[1], 10);
        if (!den1 || !den2) return;
        const lcd = leastCommonMultiple(den1, den2);
        if (!lcd) return;
        const factor1 = lcd / den1;
        const factor2 = lcd / den2;
        const timer = setTimeout(() => {
            setFirstMultiplier(factor1);
            setShowFirstMultipliers(true);
            setSecondMultiplier(factor2);
            setShowSecondMultipliers(true);
        }, 1000);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showCommonFlexi, denominators]);

    const greatestCommonDivisor = (a, b) => {
        let x = Math.abs(a);
        let y = Math.abs(b);
        while (y !== 0) {
            const temp = y;
            y = x % y;
            x = temp;
        }
        return x || 1;
    };

    const leastCommonMultiple = (a, b) => {
        if (a === 0 || b === 0) return 0;
        return Math.abs(a * b) / greatestCommonDivisor(a, b);
    };

    const handleFindCommonDenominator = () => {
        const den1 = parseInt(denominators[0], 10);
        const den2 = parseInt(denominators[1], 10);
        const lcd = leastCommonMultiple(den1, den2);
        setCommonDenominator(lcd);

        setFadeSecondFlexi(true);
        // Fade out the Next button as well
        setFadeNextButton(true);
        setTimeout(() => {
            setHideNextButton(true);
        }, 500);
        setTimeout(() => {
            setHideSecondFlexi(true);
            setShowCommonFlexi(true);
        }, 500);
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
                            setTimeout(() => {
                                setShowPieCharts(true);
                                setTimeout(() => {
                                    // Start fading out first Flexi
                                    setFadeFirstFlexi(true);
                                    setTimeout(() => {
                                        // After fade-out completes, unmount first Flexi and show second
                                        setHideFirstFlexi(true);
                                        setShowSecondFlexi(true);
                                        setTimeout(() => {
                                            setShowNextButton(true);
                                        }, 300);
                                    }, 500);
                                }, 2200);
                            }, 500);
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
                            {showFractions && showFirstMultipliers && firstMultiplier !== null && (
                                <div className="absolute top-1/2 -translate-y-1/2 text-lg fade-in-animation" style={{ right: '-18px' }}>
                                    x{firstMultiplier}
                                </div>
                            )}
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
                            {showFractions && showFirstMultipliers && firstMultiplier !== null && (
                                <div className="absolute top-1/2 -translate-y-1/2 text-lg fade-in-animation" style={{ right: '-18px' }}>
                                    x{firstMultiplier}
                                </div>
                            )}
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
                            {showFractions && showSecondMultipliers && secondMultiplier !== null && (
                                <div className="absolute top-1/2 -translate-y-1/2 text-lg fade-in-animation" style={{ left: '-18px' }}>
                                    {secondMultiplier}x
                                </div>
                            )}
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
                            {showFractions && showSecondMultipliers && secondMultiplier !== null && (
                                <div className="absolute top-1/2 -translate-y-1/2 text-lg fade-in-animation" style={{ left: '-18px' }}>
                                    {secondMultiplier}x
                                </div>
                            )}
                            {showFractions && <p className="absolute inset-0 text-2xl continue-animation flex items-center justify-center">{denominators[1]}</p>}
                        </div>
                    </div>
                </div>
            </div>
            {showPieCharts && (
                <div className="flex justify-center items-center mt-2 space-x-32 continue-animation">
                    <div className="w-28 h-28" style={{ transform: 'translateX(-8px)' }}>
                        <PieChart width={112} height={112}>
                            <Pie
                                data={Array.from({ length: parseInt(denominators[0]) }).map(() => ({ value: 1 }))}
                                cx="50%"
                                cy="50%"
                                outerRadius={50}
                                fill="#8884d8"
                                dataKey="value"
                                startAngle={90}
                                endAngle={450}
                            >
                                {
                                    Array.from({ length: parseInt(denominators[0]) }).map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={index < parseInt(numerators[0]) ? '#EF4444' : '#FFFFFF'} stroke="#000" strokeWidth={1} />
                                    ))
                                }
                            </Pie>
                        </PieChart>
                    </div>
                    <div className="w-28 h-28" style={{ transform: 'translateX(8px)' }}>
                        <PieChart width={112} height={112}>
                            <Pie
                                data={Array.from({ length: parseInt(denominators[1]) }).map(() => ({ value: 1 }))}
                                cx="50%"
                                cy="50%"
                                outerRadius={50}
                                fill="#8884d8"
                                dataKey="value"
                                startAngle={90}
                                endAngle={450}
                            >
                                {
                                    Array.from({ length: parseInt(denominators[1]) }).map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={index < parseInt(numerators[1]) ? '#3B82F6' : '#FFFFFF'} stroke="#000" strokeWidth={1} />
                                    ))
                                }
                            </Pie>
                        </PieChart>
                    </div>
                </div>
            )}
            {!hideFirstFlexi && (
                <FlexiText flexiImage={FlexiWave} className={`${fadeFirstFlexi ? 'fade-out-up-animation' : ''}`}>
                    Enter two proper fractions to see how to add them step by step
                </FlexiText>
            )}
            {showSecondFlexi && !hideSecondFlexi && (
                <FlexiText flexiImage={FlexiTeacher} className={`${fadeSecondFlexi ? 'fade-out-up-animation' : 'fade-in-up-animation'}`}>
                    Nice, now we find a common denominator
                </FlexiText>
            )}
            {showCommonFlexi && (
                <FlexiText flexiImage={FlexiTeacher} className="fade-in-up-animation">
                    The common denominator for <span className="text-red-500 font-bold">{denominators[0]}</span> and <span className="text-blue-500 font-bold">{denominators[1]}</span> is <span className="text-purple-600 font-bold">{commonDenominator}</span>. Now let's adjust the fractions to use our common denominator.
                </FlexiText>
            )}
            {!showFractions && (
                <div className={`absolute bottom-0 right-0 z-10 p-4 ${isButtonShrinking ? 'shrink-out-animation' : ''}`}>
                    <GlowButton onClick={handleShowFractions} bgColor="#E8EDF5" autoShrinkOnClick={false}>
                        <p className="whitespace-nowrap">Show Fractions</p>
                    </GlowButton>
                </div>
            )}
            {showNextButton && !hideNextButton && (
                <div className={`absolute bottom-0 right-0 z-10 p-4 ${fadeNextButton ? 'fade-out-animation' : 'fade-in-animation'}`}>
                    <GlowButton onClick={handleFindCommonDenominator} bgColor="#E8EDF5" autoShrinkOnClick={false}>
                        <p className="whitespace-nowrap">Find Common Denominator</p>
                    </GlowButton>
                </div>
            )}
        </Container>
)
};


export default FractionAddition;