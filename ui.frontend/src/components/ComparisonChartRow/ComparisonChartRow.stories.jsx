import React from 'react';
import ComparisonChart from '../ComparisonChart';
import ComparisonChartRow from './ComparisonChartRow';
import { text } from '@storybook/addon-knobs';
import { lorem } from '../../lib/helpers/lorem';

// https://storybook.js.org/docs/formats/component-story-format/

export default {
    title: 'Elements/ComparisonChartRow',
    component: ComparisonChartRow,
    includeStories: ['DefaultView'],
};

const defaultText = lorem.generateHeading(4);

export const ContentWithMediaOnlyView = (props) => {
    const { groupID } = props;
    return (
        <ComparisonChart
            title={defaultText}
            headingLevel="h1"
            columnTitle1={defaultText}
            columnIcon1=""
            columnTitle2={defaultText}
            columnIcon2=""
        >
            <ComparisonChartRow
                rowTitle={text('First Row - Row Title 1', defaultText, groupID)}
                columnContent1={text('First Row - Column Content 1', defaultText, groupID)}
                columnContent2={text('First Row - Column Content 2', defaultText, groupID)}
            />
            <ComparisonChartRow
                rowTitle={text('Second Row - Row Title 1', defaultText, groupID)}
                columnContent1={text('Second Row - Column Content 1', defaultText, groupID)}
                columnContent2={text('Second Row - Column Content 2', defaultText, groupID)}
            />
        </ComparisonChart>
    );
};

export const DefaultView = () => {
    return <ContentWithMediaOnlyView />;
};
