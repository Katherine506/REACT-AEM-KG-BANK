import React from 'react';
import { lorem } from '../../lib/helpers/lorem';
import { select, text } from '@storybook/addon-knobs';
import html from '../../lib/helpers/htmlKnob';
import TimeLineItem from './TimeLineItem';
import { HEADING_LEVELS_TIME_LINE, THEME_OPTIONS } from '../../lib/constants';
import Theme from '../_shared/Theme';

// https://storybook.js.org/docs/formats/component-story-format/

export default {
    title: 'Elements/TimeLineItem',
    component: TimeLineItem,
    includeStories: ['DefaultView'],
};

const defaultTitle = lorem.generateHeading(4);
const defaultText = `<p><b>Lorem!</b> ${lorem.generateParagraphs(1)}</p>
    <p><a href="https://www.google.com" target="_blank">External Link</a></p>`;

export const TimeLineItemOnlyView = (props) => {
    const { groupID } = props;
    return (
        <TimeLineItem
            title={text('Heading Text', defaultTitle, groupID)}
            headingLevel={select('Heading Level', HEADING_LEVELS_TIME_LINE, 'h5', groupID)}
            text={html('Text Content', defaultText, groupID)}
        />
    );
};

export const DefaultView = () => {
    return (
        <Theme theme={select('Theme of Parent Component', THEME_OPTIONS, 'light')}>
            <TimeLineItemOnlyView />
        </Theme>
    );
};
