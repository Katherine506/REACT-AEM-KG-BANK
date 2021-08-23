import React from 'react';
import ComparisonChart from './ComparisonChart';
import ComparisonChartRow from '../ComparisonChartRow/ComparisonChartRow';
import SectionContainer from '../SectionContainer';
import Theme from '../_shared/Theme';
import { select, text } from '@storybook/addon-knobs';
import { HEADING_LEVELS, SAMPLE_ICONS, THEME_OPTIONS } from '../../lib/constants';
import { lorem } from '../../lib/helpers/lorem';

// https://storybook.js.org/docs/formats/component-story-format/

export default {
    title: 'Elements/ComparisonChart',
    component: ComparisonChart,
    includeStories: ['DefaultView'],
};

const defaultText = lorem.generateHeading(4);

export const ContentWithMediaOnlyView = (props) => {
    const { groupID } = props;
    return (
        <Theme theme={select('Theme of Parent Component', THEME_OPTIONS, 'light')}>
            <SectionContainer
                backgroundColor={
                    select('Theme of Parent Component', THEME_OPTIONS, 'light') === 'light'
                        ? 'white'
                        : 'darkPurple'
                }
                width="full"
            >
                <ComparisonChart
                    title={text('Container Title', defaultText, groupID)}
                    headingLevel={select('Heading Level', HEADING_LEVELS, 'h1', groupID)}
                    columnTitle1={text('Column Title 1', defaultText, groupID)}
                    columnIcon1={select(
                        'Column Icon 1',
                        SAMPLE_ICONS,
                        SAMPLE_ICONS['Communication (Mail)'],
                        groupID
                    )}
                    columnTitle2={text('Column Title 2', defaultText, groupID)}
                    columnIcon2={select(
                        'Column Icon 2',
                        SAMPLE_ICONS,
                        SAMPLE_ICONS['Communication (Mail)'],
                        groupID
                    )}
                >
                    <ComparisonChartRow
                        rowTitle={defaultText}
                        columnContent1={defaultText}
                        columnContent2={defaultText}
                    />
                    <ComparisonChartRow
                        rowTitle={defaultText}
                        columnContent1={defaultText}
                        columnContent2={defaultText}
                    />
                </ComparisonChart>
            </SectionContainer>
        </Theme>
    );
};

export const DefaultView = () => {
    return <ContentWithMediaOnlyView />;
};
