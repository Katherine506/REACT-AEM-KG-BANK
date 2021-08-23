import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './CountingNumbers.module.scss';
import cx from 'classnames';
import useInterval from '../../lib/services/useInterval';
import Text from '../_shared/Text';
import { VISIBILITY_DELAYS, VISIBILITY_HEIGHT } from '../../lib/constants';

const ANIMATION_TIME = 1000;

const Stat = (props) => {
    const {
        statisticColor,
        subtextAlignment,
        animationStartValue,
        statisticValue,
        numberFormat,
        delayUntilStart,
        subText,
        includeSpacingCharacters,
        frontAccentCharacter,
        backAccentCharacter,
        index,
    } = props;

    const [currentNumber, setCurrent] = useState(animationStartValue);
    const [isAvailable, setAvailable] = useState(false);
    const [isVisible, setVisible] = useState(false);
    const containerRef = useRef();

    const front = frontAccentCharacter ? frontAccentCharacter + ' ' : '';
    const back = backAccentCharacter ? ' ' + backAccentCharacter : '';

    const [isFloat, setIsFloat] = useState(false);
    const iteratorValue = createIterator();
    const delay = ANIMATION_TIME / ((statisticValue - animationStartValue) / iteratorValue);

    function createIterator() {
        //Each statistic will have a custom value to increase by
        const isWhole =
            Number.isInteger(Number(animationStartValue)) &&
            Number.isInteger(Number(statisticValue));

        if (isWhole && statisticValue - animationStartValue < 250) {
            return 1;
        } else if (isFloat && (statisticValue - animationStartValue) / 250 < 0.1) {
            return 0.1;
        } else {
            return (statisticValue - animationStartValue) / 250;
        }
    }

    function lengthTrim(longNumber) {
        const split = longNumber.toString().split('.');
        if (split[0].length >= 7) {
            return Number(split[0]);
        } else if (split[0].length === 6) {
            return Number(split[0] + '.' + split[1][0]);
        }
    }

    function format(currentNumber) {
        if (isAvailable) {
            //Formatting currency and Intl is available in the browser
            const amount = new Intl.NumberFormat(document.documentElement.lang || 'en', {
                style: 'currency',
                currency: 'USD',
                currencyDisplay: 'symbol',
                maximumSignificantDigits: 7,
                maximumFractionDigits: 2,
            }).format(currentNumber);
            if (includeSpacingCharacters === 'false') {
                return amount.replace(/[\s,]/g, '');
            }
            return amount;
        } else {
            //Manual formatting based on number format
            let amount = currentNumber;
            if (String(currentNumber).length > 7) {
                amount = lengthTrim(currentNumber);
            }
            if (numberFormat === 'dollarAmount' && includeSpacingCharacters) {
                //Manual english dollar amount if in IE
                return '$' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            } else {
                return `${amount}${numberFormat === 'percentage' ? '%' : ''}`;
            }
        }
    }

    useInterval(
        () => {
            if (iteratorValue + currentNumber > statisticValue) {
                setCurrent(statisticValue);
            } else {
                const newValue = isFloat
                    ? parseFloat((currentNumber + iteratorValue).toFixed(2))
                    : parseInt(currentNumber + iteratorValue);
                setCurrent(newValue);
            }
        },
        delay,
        currentNumber <= statisticValue && isVisible
    );

    useEffect(() => {
        if (Intl && typeof Intl.NumberFormat === 'function' && numberFormat === 'dollarAmount') {
            //Checking here if we can us Intl formatting (not in IE)
            setAvailable(true);
        }
        if (!Number.isInteger(animationStartValue) || !Number.isInteger(statisticValue)) {
            setIsFloat(true);
        }
    }, []);

    useEffect(() => {
        const threshold =
            containerRef.current &&
            containerRef.current.getBoundingClientRect().height > VISIBILITY_HEIGHT
                ? VISIBILITY_DELAYS[0]
                : VISIBILITY_DELAYS[1];
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setVisible(entry.isIntersecting);
                    if (entry.isIntersecting) {
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold }
        );
        observer.observe(containerRef.current);
        return () => observer.unobserve(containerRef.current);
    }, [containerRef]);

    return (
        <div className={cx(styles.box)} key={index} ref={containerRef}>
            <Text
                content={`${front}${format(currentNumber)}${back}`}
                size={'large'}
                className={cx(styles[`${statisticColor}`], styles[`alignment-${subtextAlignment}`])}
            />
            <Text
                content={subText}
                size="small"
                className={cx(styles[`alignment-${subtextAlignment}`])}
            />
        </div>
    );
};

const CountingNumbers = (props) => {
    const {
        statisticColor,
        subtextAlignment,
        statistics,

        animationTime,
    } = props;

    const statItems = statistics.map((stat, index) => {
        const {
            animationStartValue,
            statisticValue,
            numberFormat,
            subtext,
            frontAccentCharacter,
            backAccentCharacter,
            includeSpacingCharacters,
        } = stat;
        return (
            <Stat
                statisticColor={statisticColor}
                animationStartValue={Number(animationStartValue)}
                statisticValue={Number(statisticValue)}
                numberFormat={numberFormat}
                subText={subtext}
                includeSpacingCharacters={includeSpacingCharacters}
                subtextAlignment={subtextAlignment}
                delayUntilStart={index * 250}
                frontAccentCharacter={frontAccentCharacter}
                backAccentCharacter={backAccentCharacter}
                animationTime={animationTime}
                key={index}
                index={index}
            />
        );
    });
    return <div className={cx(styles.root)}>{statItems}</div>;
};

CountingNumbers.displayName = 'CountingNumbers';

CountingNumbers.propTypes = {
    statisticColor: PropTypes.string.isRequired,
    subtextAlignment: PropTypes.string.isRequired,
    statistics: PropTypes.arrayOf(
        PropTypes.shape({
            animationStartValue: PropTypes.number.isRequired,
            statisticValue: PropTypes.number.isRequired,
            numberFormat: PropTypes.string,
            subtext: PropTypes.string.isRequired,
            frontAccentCharacter: PropTypes.string,
            backAccentCharacter: PropTypes.string,
            includeSpacingCharacters: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default CountingNumbers;
