import React from 'react';
import CountingNumbers from './CountingNumbers';
import SectionContainer from '../SectionContainer';

export default {
    title: 'Elements/CountingNumbers',
    component: CountingNumbers,
    includeStories: ['DefaultView'],
};

const statisticsList = [
    {
        animationStartValue: 65,
        statisticValue: 100,
        subtext: 'Lorem ipsum dolor sit amet, consecutor ajdn sddawfdwadsfadsfd adswada asdasdw.',
    },
    {
        animationStartValue: 10,
        statisticValue: 66,
        numberFormat: 'percentage',
        subtext: 'Lorem ipsum dolor sit amet, consecutor ajdn sddawfdwadsfadsfd adswada asdasdw.',
    },
    {
        animationStartValue: 700000,
        statisticValue: 1000000,
        numberFormat: 'dollarAmount',
        subtext: 'Lorem ipsum dolor sit amet, consecutor ajdn sddawfdwadsfadsfd adswada asdasdw.',
    },
    {
        animationStartValue: 100000.222,
        statisticValue: 110000.333,
        numberFormat: 'generic',
        subtext: 'Lorem ipsum dolor sit amet, consecutor ajdn sddawfdwadsfadsfd adswada asdasdw.',
    },
];

export const DefaultView = () => {
    return (
        <>
            <div style={{ height: '100vh', width: '500px' }}></div>
            <CountingNumbers
                statisticColor="vermillion"
                subtextAlignment="left"
                statistics={statisticsList}
                includeSpacingCharacters={true}
            />
        </>
    );
};
