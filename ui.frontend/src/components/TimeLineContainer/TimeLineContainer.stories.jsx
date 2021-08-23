import React from 'react';
import TimeLineContainer from './TimeLineContainer';
import { select, text } from '@storybook/addon-knobs';
import { LINK_TYPES, THEME_OPTIONS } from '../../lib/constants';
import { lorem } from '../../lib/helpers/lorem';
import Theme from '../_shared/Theme';
import { TimeLineItemOnlyView } from '../TimeLineItem/TimeLineItem.stories';

// https://storybook.js.org/docs/formats/component-story-format/

export default {
    title: 'Elements/TimeLineContainer',
    component: TimeLineContainer,
    includeStories: ['DefaultView'],
};

const defaultButtonText = lorem.generateHeading(2);

export const TimeLineContainerViewOnly = (props) => {
    const { groupID } = props;
    return (
        <TimeLineContainer
            altText={text('Alt Text', '', groupID)}
            linkText={text('Link Text', defaultButtonText, groupID)}
            linkUrl={text('Link URL', '/', groupID)}
            linkType={select('Link Type', LINK_TYPES, 'internal', groupID)}
        >
            <TimeLineItemOnlyView />
            <TimeLineItemOnlyView />
            <TimeLineItemOnlyView />
            <TimeLineItemOnlyView />
            <TimeLineItemOnlyView />
        </TimeLineContainer>
    );
};

export const DefaultView = () => {
    return (
        <Theme theme={select('Theme of Parent Component', THEME_OPTIONS, 'light')}>
            <TimeLineContainerViewOnly />
        </Theme>
    );
};
