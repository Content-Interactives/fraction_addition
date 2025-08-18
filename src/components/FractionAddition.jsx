import React, { useState, useEffect, useRef } from 'react';
import { Container } from './ui/reused-ui/Container';
import { Input } from './ui/reused-ui/Input';
import { FlexiText } from './ui/reused-ui/FlexiText';
import { GlowButton } from './ui/reused-ui/GlowButton';
import { PieChart, Pie, Cell } from 'recharts';
import FlexiWave from '../assets/All Flexi Poses/SVG/Flexi_Wave.svg';
import FlexiTeacher from '../assets/All Flexi Poses/SVG/Flexi_Teacher.svg';
import FlexiThumbsUp from '../assets/All Flexi Poses/SVG/Flexi_ThumbsUp.svg';
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
    const [showAdjustButton, setShowAdjustButton] = useState(false);
    const [fadeAdjustButton, setFadeAdjustButton] = useState(false);
    const [hideAdjustButton, setHideAdjustButton] = useState(false);
    const [fadeSecondFlexi, setFadeSecondFlexi] = useState(false);
    const [hideSecondFlexi, setHideSecondFlexi] = useState(false);
    const [showCommonFlexi, setShowCommonFlexi] = useState(false);
    const [fadeCommonFlexi, setFadeCommonFlexi] = useState(false);
    const [hideCommonFlexi, setHideCommonFlexi] = useState(false);
    const [showThumbsUpFlexi, setShowThumbsUpFlexi] = useState(false);
    const [showAddNumeratorsButton, setShowAddNumeratorsButton] = useState(false);
    const [fadeAddNumeratorsButton, setFadeAddNumeratorsButton] = useState(false);
    const [hideAddNumeratorsButton, setHideAddNumeratorsButton] = useState(false);
    const [commonDenominator, setCommonDenominator] = useState(null);
    const [showFirstMultipliers, setShowFirstMultipliers] = useState(false);
    const [firstMultiplier, setFirstMultiplier] = useState(null);
    const [showSecondMultipliers, setShowSecondMultipliers] = useState(false);
    const [secondMultiplier, setSecondMultiplier] = useState(null);
    const [animateFirstMultiplierClones, setAnimateFirstMultiplierClones] = useState(false);
    const [isSlidingFirstMultipliers, setIsSlidingFirstMultipliers] = useState(false);
    const [firstMultipliersGreyed, setFirstMultipliersGreyed] = useState(false);
    // multipliers remain visible for now; keep state but unused
    const [fadeOutFirstMultiplierLabels, setFadeOutFirstMultiplierLabels] = useState(false);
    const [hideFirstMultiplierLabels, setHideFirstMultiplierLabels] = useState(false);
    const [fadeOutFirstClones, setFadeOutFirstClones] = useState(false);
    const [hideFirstClones, setHideFirstClones] = useState(false);
    const [fadeOutFirstOriginalNumbers, setFadeOutFirstOriginalNumbers] = useState(false);
    const [hideFirstOriginalNumbers, setHideFirstOriginalNumbers] = useState(false);
    const [showFirstProducts, setShowFirstProducts] = useState(false);
    const [firstProductNumerator, setFirstProductNumerator] = useState(null);
    const [firstProductDenominator, setFirstProductDenominator] = useState(null);
    const [animateSecondMultiplierClones, setAnimateSecondMultiplierClones] = useState(false);
    const [isSlidingSecondMultipliers, setIsSlidingSecondMultipliers] = useState(false);
    const [secondMultipliersGreyed, setSecondMultipliersGreyed] = useState(false);
    const [fadeOutSecondClones, setFadeOutSecondClones] = useState(false);
    const [hideSecondClones, setHideSecondClones] = useState(false);
    const [fadeOutSecondOriginalNumbers, setFadeOutSecondOriginalNumbers] = useState(false);
    const [hideSecondOriginalNumbers, setHideSecondOriginalNumbers] = useState(false);
    const [showSecondProducts, setShowSecondProducts] = useState(false);
    const [secondProductNumerator, setSecondProductNumerator] = useState(null);
    const [secondProductDenominator, setSecondProductDenominator] = useState(null);
    // multipliers remain visible for now; keep state but unused
    const [fadeOutSecondMultiplierLabels, setFadeOutSecondMultiplierLabels] = useState(false);
    const [hideSecondMultiplierLabels, setHideSecondMultiplierLabels] = useState(false);
    const [fadeMultipliers, setFadeMultipliers] = useState(false);
    // First pie re-slice sequence controls
    const [firstPieHideSliceLines, setFirstPieHideSliceLines] = useState(false);
    const [firstPieUseCommonDenominator, setFirstPieUseCommonDenominator] = useState(false);
    // Second pie re-slice sequence controls
    const [secondPieHideSliceLines, setSecondPieHideSliceLines] = useState(false);
    const [secondPieUseCommonDenominator, setSecondPieUseCommonDenominator] = useState(false);

    useEffect(() => {
        if (!secondPieUseCommonDenominator) return;

        const timer = setTimeout(() => {
            setFadeCommonFlexi(true);
            setTimeout(() => {
                setHideCommonFlexi(true);
                setShowThumbsUpFlexi(true);
            }, 500);
        }, 2500);

        return () => clearTimeout(timer);
    }, [secondPieUseCommonDenominator]);

    useEffect(() => {
        if (!showThumbsUpFlexi) return;
        const timer = setTimeout(() => {
            setShowAddNumeratorsButton(true);
        }, 800);
        return () => clearTimeout(timer);
    }, [showThumbsUpFlexi]);

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
        setFadeCommonFlexi(false);
        setHideCommonFlexi(false);
        setShowThumbsUpFlexi(false);
        setShowAddNumeratorsButton(false);
        setFadeAddNumeratorsButton(false);
        setHideAddNumeratorsButton(false);
        setCommonDenominator(null);
        setShowFirstMultipliers(false);
        setFirstMultiplier(null);
        setShowSecondMultipliers(false);
        setSecondMultiplier(null);
        setShowAdjustButton(false);
        setFadeAdjustButton(false);
        setHideAdjustButton(false);
        setAnimateFirstMultiplierClones(false);
        setIsSlidingFirstMultipliers(false);
        setFirstMultipliersGreyed(false);
        setFadeOutFirstMultiplierLabels(false);
        setHideFirstMultiplierLabels(false);
        setFadeOutFirstClones(false);
        setHideFirstClones(false);
        setFadeOutFirstOriginalNumbers(false);
        setHideFirstOriginalNumbers(false);
        setShowFirstProducts(false);
        setFirstProductNumerator(null);
        setFirstProductDenominator(null);
        setAnimateSecondMultiplierClones(false);
        setIsSlidingSecondMultipliers(false);
        setSecondMultipliersGreyed(false);
        setFadeOutSecondClones(false);
        setHideSecondClones(false);
        setFadeOutSecondOriginalNumbers(false);
        setHideSecondOriginalNumbers(false);
        setShowSecondProducts(false);
        setSecondProductNumerator(null);
        setSecondProductDenominator(null);
        setFadeOutSecondMultiplierLabels(false);
        setHideSecondMultiplierLabels(false);
        setFadeMultipliers(false);
        setFirstPieHideSliceLines(false);
        setFirstPieUseCommonDenominator(false);
        setSecondPieHideSliceLines(false);
        setSecondPieUseCommonDenominator(false);
    };

    // After common denominator bubble appears, fade in the Adjust Fractions button
    useEffect(() => {
        if (!showCommonFlexi) return;
        const timer = setTimeout(() => {
            setShowAdjustButton(true);
        }, 300);
        return () => clearTimeout(timer);
    }, [showCommonFlexi]);

    const handleAdjustFractions = () => {
        // Start fading out the Adjust Fractions button
        setFadeAdjustButton(true);
        setTimeout(() => {
            setHideAdjustButton(true);
            // After the button finishes fading out, compute and show multipliers
            const den1 = parseInt(denominators[0], 10);
            const den2 = parseInt(denominators[1], 10);
            const lcd = commonDenominator || leastCommonMultiple(den1, den2);
            if (!den1 || !den2 || !lcd) return;
            const factor1 = lcd / den1;
            const factor2 = lcd / den2;
            setFirstMultiplier(factor1);
            setSecondMultiplier(factor2);
            const num1 = parseInt(numerators[0], 10) || 0;
            const deno1 = parseInt(denominators[0], 10) || 0;
            setFirstProductNumerator(num1 * factor1);
            setFirstProductDenominator(deno1 * factor1);
            setShowFirstMultipliers(true);
            setShowSecondMultipliers(true);
            // Delay before sliding clones, then grey originals during the slide
            setTimeout(() => {
                setAnimateFirstMultiplierClones(true);
                setIsSlidingFirstMultipliers(true);
                setFirstMultipliersGreyed(true);
                setTimeout(() => {
                    setIsSlidingFirstMultipliers(false);
                    // After slide completes, fade out clones and original numbers
                    setFadeOutFirstClones(true);
                    setFadeOutFirstOriginalNumbers(true);
                    setTimeout(() => {
                        setHideFirstClones(true);
                        setHideFirstOriginalNumbers(true);
                        // Show products where originals were, with fade-in
                        setShowFirstProducts(true);
                    }, 500); // match fade-out-animation duration
                }, 600); // matches slide-left-to-center duration
                // After first products fade in, run second fraction slide sequence (one side at a time)
                setTimeout(() => {
                    // compute second products based on factor2
                    const num2 = parseInt(numerators[1], 10) || 0;
                    const deno2 = parseInt(denominators[1], 10) || 0;
                    setSecondProductNumerator(num2 * factor2);
                    setSecondProductDenominator(deno2 * factor2);
                    // Start slide and grey originals
                    setAnimateSecondMultiplierClones(true);
                    setIsSlidingSecondMultipliers(true);
                    setSecondMultipliersGreyed(true);
                    setTimeout(() => {
                        setIsSlidingSecondMultipliers(false);
                        // fade out clones and original numbers for second fraction
                        setFadeOutSecondClones(true);
                        setFadeOutSecondOriginalNumbers(true);
                        setTimeout(() => {
                            setHideSecondClones(true);
                            setHideSecondOriginalNumbers(true);
                            setShowSecondProducts(true);
                            // Keep grey multiplier labels visible; no fade-out
                        }, 500);
                    }, 600);
                }, 1000);
            }, 800);
        }, 500);
    };

    const handleAddNumerators = () => {
        setFadeAddNumeratorsButton(true);
        setTimeout(() => {
            setHideAddNumeratorsButton(true);
            setFadeMultipliers(true);
        }, 500);
    };

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

    // After second products appear, run first pie re-slice sequence: hide lines, then switch to LCD slice count
    useEffect(() => {
        if (!showSecondProducts) return;
        if (!commonDenominator) return;
        const delayHide = setTimeout(() => {
            // 1) Fade slice lines out
            setFirstPieHideSliceLines(true);
            const delayReslice = setTimeout(() => {
                // 2) Switch to LCD slice count while still hidden so new slices mount invisible
                setFirstPieUseCommonDenominator(true);
                const delayFadeIn = setTimeout(() => {
                    // 3) Then fade the new slice lines in
                    setFirstPieHideSliceLines(false);
                    // 4) After first pie completes its fade-in, run the same sequence for the second pie
                    const delaySecondPieHide = setTimeout(() => {
                        setSecondPieHideSliceLines(true);
                        const delaySecondPieReslice = setTimeout(() => {
                            setSecondPieUseCommonDenominator(true);
                            const delaySecondPieFadeIn = setTimeout(() => {
                                setSecondPieHideSliceLines(false);
                            }, 50);
                            return () => clearTimeout(delaySecondPieFadeIn);
                        }, 300);
                        return () => clearTimeout(delaySecondPieReslice);
                    }, 400);
                    return () => clearTimeout(delaySecondPieHide);
                }, 50);
                return () => clearTimeout(delayFadeIn);
            }, 300);
            return () => clearTimeout(delayReslice);
        }, 1000);
        return () => clearTimeout(delayHide);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showSecondProducts, commonDenominator]);

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
                                <>
                                    <div className={`absolute top-1/2 -translate-y-1/2 text-lg ${firstMultipliersGreyed ? 'text-gray-400' : ''} ${fadeMultipliers ? 'fade-out-animation' : 'fade-in-animation'}`} style={{ right: '-18px' }}>
                                        x{firstMultiplier}
                                    </div>
                                    {/* Animated clone that slides over numerator */}
                                    {animateFirstMultiplierClones && !hideFirstClones && (
                                        <div className={`absolute top-1/2 text-lg slide-left-to-center ${fadeOutFirstClones ? 'fade-out-animation' : ''}`} style={{ right: '-18px' }}>
                                            x{firstMultiplier}
                                        </div>
                                    )}
                                </>
                            )}
                            {showFractions && !hideFirstOriginalNumbers && (
                                <p className={`absolute inset-0 text-2xl continue-animation flex items-center justify-center ${fadeOutFirstOriginalNumbers ? 'fade-out-animation' : ''}`}>{numerators[0]}</p>
                            )}
                            {showFractions && showFirstProducts && (
                                <p className="absolute inset-0 text-2xl fade-in-animation flex items-center justify-center">{firstProductNumerator}</p>
                            )}
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
                                <>
                                    <div className={`absolute top-1/2 -translate-y-1/2 text-lg ${firstMultipliersGreyed ? 'text-gray-400' : ''} ${fadeMultipliers ? 'fade-out-animation' : 'fade-in-animation'}`} style={{ right: '-18px' }}>
                                        x{firstMultiplier}
                                    </div>
                                    {/* Animated clone that slides over denominator */}
                                    {animateFirstMultiplierClones && !hideFirstClones && (
                                        <div className={`absolute top-1/2 text-lg slide-left-to-center ${fadeOutFirstClones ? 'fade-out-animation' : ''}`} style={{ right: '-18px' }}>
                                            x{firstMultiplier}
                                        </div>
                                    )}
                                </>
                            )}
                            {showFractions && !hideFirstOriginalNumbers && (
                                <p className={`absolute inset-0 text-2xl continue-animation flex items-center justify-center ${fadeOutFirstOriginalNumbers ? 'fade-out-animation' : ''}`}>{denominators[0]}</p>
                            )}
                            {showFractions && showFirstProducts && (
                                <p className="absolute inset-0 text-2xl fade-in-animation flex items-center justify-center">{firstProductDenominator}</p>
                            )}
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
                                <>
                                    <div className={`absolute top-1/2 -translate-y-1/2 text-lg ${secondMultipliersGreyed ? 'text-gray-400' : ''} ${fadeMultipliers ? 'fade-out-animation' : 'fade-in-animation'}`} style={{ left: '-18px' }}>
                                        {secondMultiplier}x
                                    </div>
                                    {animateSecondMultiplierClones && !hideSecondClones && (
                                        <div className={`absolute top-1/2 text-lg slide-right-to-center ${fadeOutSecondClones ? 'fade-out-animation' : ''}`} style={{ left: '-18px' }}>
                                            {secondMultiplier}x
                                        </div>
                                    )}
                                </>
                            )}
                            {showFractions && !hideSecondOriginalNumbers && (
                                <p className={`absolute inset-0 text-2xl continue-animation flex items-center justify-center ${fadeOutSecondOriginalNumbers ? 'fade-out-animation' : ''}`}>{numerators[1]}</p>
                            )}
                            {showFractions && showSecondProducts && (
                                <p className="absolute inset-0 text-2xl fade-in-animation flex items-center justify-center">{secondProductNumerator}</p>
                            )}
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
                                <>
                                    <div className={`absolute top-1/2 -translate-y-1/2 text-lg ${secondMultipliersGreyed ? 'text-gray-400' : ''} ${fadeMultipliers ? 'fade-out-animation' : 'fade-in-animation'}`} style={{ left: '-18px' }}>
                                        {secondMultiplier}x
                                    </div>
                                    {animateSecondMultiplierClones && !hideSecondClones && (
                                        <div className={`absolute top-1/2 text-lg slide-right-to-center ${fadeOutSecondClones ? 'fade-out-animation' : ''}`} style={{ left: '-18px' }}>
                                            {secondMultiplier}x
                                        </div>
                                    )}
                                </>
                            )}
                            {showFractions && !hideSecondOriginalNumbers && (
                                <p className={`absolute inset-0 text-2xl continue-animation flex items-center justify-center ${fadeOutSecondOriginalNumbers ? 'fade-out-animation' : ''}`}>{denominators[1]}</p>
                            )}
                            {showFractions && showSecondProducts && (
                                <p className="absolute inset-0 text-2xl fade-in-animation flex items-center justify-center">{secondProductDenominator}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {showPieCharts && (
                <div className="flex justify-center items-center mt-2 space-x-32 continue-animation">
                    <div className="w-28 h-28" style={{ transform: 'translateX(-8px)' }}>
                        <PieChart width={112} height={112}>
                            {/* Fill layer: keeps filled proportion static */}
                            <Pie
                                data={(() => {
                                    const den0 = parseInt(denominators[0] || 0);
                                    const num0 = parseInt(numerators[0] || 0);
                                    const safeDen = den0 > 0 ? den0 : 1;
                                    const safeNum = Math.min(num0, safeDen);
                                    return [{ value: safeNum }, { value: Math.max(safeDen - safeNum, 0) }];
                                })()}
                                cx="50%"
                                cy="50%"
                                outerRadius={50}
                                dataKey="value"
                                startAngle={90}
                                endAngle={450}
                                stroke="none"
                            >
                                <Cell fill="#EF4444" />
                                <Cell fill="#FFFFFF" />
                            </Pie>
                            {/* Outline layer: toggles slice lines and slice count without changing fill; lines fade via strokeOpacity */}
                            <Pie
                                data={Array.from({ length: (firstPieUseCommonDenominator ? parseInt(commonDenominator || 0) : parseInt(denominators[0] || 0)) || 0 }).map(() => ({ value: 1 }))}
                                cx="50%"
                                cy="50%"
                                outerRadius={50}
                                dataKey="value"
                                startAngle={90}
                                endAngle={450}
                                fill="transparent"
                            >
                                {Array.from({ length: (firstPieUseCommonDenominator ? parseInt(commonDenominator || 0) : parseInt(denominators[0] || 0)) || 0 }).map((_, index) => (
                                    <Cell
                                        key={`outline-cell-${index}`}
                                        fill="transparent"
                                        stroke="#000"
                                        strokeWidth={1}
                                        style={{ transition: 'stroke-opacity 0.3s ease', strokeOpacity: firstPieHideSliceLines ? 0 : 1 }}
                                    />
                                ))}
                            </Pie>
                            {/* Border ring: always keep the outer circle border visible */}
                            <Pie
                                data={[{ value: 1 }]}
                                cx="50%"
                                cy="50%"
                                outerRadius={50}
                                dataKey="value"
                                startAngle={90}
                                endAngle={450}
                                fill="transparent"
                            >
                                <Cell fill="transparent" stroke="#000" strokeWidth={1} />
                            </Pie>
                        </PieChart>
                    </div>
                    <div className="w-28 h-28" style={{ transform: 'translateX(8px)' }}>
                        <PieChart width={112} height={112}>
                            {/* Fill layer: keeps filled proportion static */}
                            <Pie
                                data={(() => {
                                    const den1 = parseInt(denominators[1] || 0);
                                    const num1 = parseInt(numerators[1] || 0);
                                    const safeDen = den1 > 0 ? den1 : 1;
                                    const safeNum = Math.min(num1, safeDen);
                                    return [{ value: safeNum }, { value: Math.max(safeDen - safeNum, 0) }];
                                })()}
                                cx="50%"
                                cy="50%"
                                outerRadius={50}
                                dataKey="value"
                                startAngle={90}
                                endAngle={450}
                                stroke="none"
                            >
                                <Cell fill="#3B82F6" />
                                <Cell fill="#FFFFFF" />
                            </Pie>
                            {/* Outline layer: toggles slice lines and slice count without changing fill; lines fade via strokeOpacity */}
                            <Pie
                                data={Array.from({ length: (secondPieUseCommonDenominator ? parseInt(commonDenominator || 0) : parseInt(denominators[1] || 0)) || 0 }).map(() => ({ value: 1 }))}
                                cx="50%"
                                cy="50%"
                                outerRadius={50}
                                dataKey="value"
                                startAngle={90}
                                endAngle={450}
                                fill="transparent"
                            >
                                {Array.from({ length: (secondPieUseCommonDenominator ? parseInt(commonDenominator || 0) : parseInt(denominators[1] || 0)) || 0 }).map((_, index) => (
                                    <Cell
                                        key={`outline-cell-second-${index}`}
                                        fill="transparent"
                                        stroke="#000"
                                        strokeWidth={1}
                                        style={{ transition: 'stroke-opacity 0.3s ease', strokeOpacity: secondPieHideSliceLines ? 0 : 1 }}
                                    />
                                ))}
                            </Pie>
                            {/* Border ring: always keep the outer circle border visible */}
                            <Pie
                                data={[{ value: 1 }]}
                                cx="50%"
                                cy="50%"
                                outerRadius={50}
                                dataKey="value"
                                startAngle={90}
                                endAngle={450}
                                fill="transparent"
                            >
                                <Cell fill="transparent" stroke="#000" strokeWidth={1} />
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
            {showCommonFlexi && !hideCommonFlexi && (
                <FlexiText flexiImage={FlexiTeacher} className={`${fadeCommonFlexi ? 'fade-out-up-animation' : 'fade-in-up-animation'}`}>
                    The common denominator for <span className="text-red-500 font-bold">{denominators[0]}</span> and <span className="text-blue-500 font-bold">{denominators[1]}</span> is <span className="text-purple-600 font-bold">{commonDenominator}</span>. Now let's adjust the fractions to use our common denominator.
                </FlexiText>
            )}
            {showThumbsUpFlexi && (
                <FlexiText flexiImage={FlexiThumbsUp} className="fade-in-up-animation">
                    Nice, now it's time to add the numerators!
                </FlexiText>
            )}
            {showAdjustButton && !hideAdjustButton && (
                <div className={`absolute bottom-0 right-0 z-10 p-4 ${fadeAdjustButton ? 'fade-out-animation' : 'fade-in-animation'}`}>
                    <GlowButton onClick={handleAdjustFractions} bgColor="#E8EDF5" autoShrinkOnClick={false}>
                        <p className="whitespace-nowrap">Adjust Fractions</p>
                    </GlowButton>
                </div>
            )}
            {showAddNumeratorsButton && !hideAddNumeratorsButton && (
                <div className={`absolute bottom-0 right-0 z-10 p-4 ${fadeAddNumeratorsButton ? 'fade-out-animation' : 'fade-in-animation'}`}>
                    <GlowButton onClick={handleAddNumerators} bgColor="#E8EDF5" autoShrinkOnClick={false}>
                        <p className="whitespace-nowrap">Add Numerators</p>
                    </GlowButton>
                </div>
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