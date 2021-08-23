import React from 'react';
import Statistics from './Statistics';
import { object, select } from '@storybook/addon-knobs';
import Theme from '../_shared/Theme';
import { THEME_OPTIONS } from '../../lib/constants';

// https://storybook.js.org/docs/formats/component-story-format/

export default {
    title: 'Elements/Statistics',
    component: Statistics,
    excludeStories: ['StatisticsSingleOnlyView'],
};
const DEFAULT_THEME = 'light';
const statisticsList = [
    { statistic: '93%', subtitle: 'Customer Satisfaction' },
    { statistic: '100 Years', subtitle: 'Serving Canadians' },
    { statistic: '3.3', subtitle: 'Million loans approved' },
    { statistic: '4.3', subtitle: 'Million happy customers' },
];

export const StatisticsSingleOnlyView = (props) => {
    const { groupID } = props;
    return <Statistics items={object('Statistic Items', new Array(statisticsList[0]), groupID)} />;
};

export const StatisticsWideContainerView = (props) => {
    const { groupID } = props;
    return (
        <div style={{ width: '68rem' }}>
            <Statistics items={object('Statistic Items', statisticsList, groupID)} />
        </div>
    );
};

export const StatisticsNarrowContainerView = (props) => {
    const { groupID } = props;
    return (
        <div style={{ width: '32rem' }}>
            <Statistics items={object('Statistic Items', statisticsList, groupID)} />
        </div>
    );
};

export const DefaultView = () => {
    return (
        <Theme theme={select('Theme of Parent Component', THEME_OPTIONS, DEFAULT_THEME)}>
            <StatisticsSingleOnlyView />
        </Theme>
    );
};
