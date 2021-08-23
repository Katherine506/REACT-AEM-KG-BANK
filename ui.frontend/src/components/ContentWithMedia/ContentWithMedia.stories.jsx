import React from 'react';
import ContentWithMedia from './ContentWithMedia';
import { select, text } from '@storybook/addon-knobs';
import { DESKTOP_POSITION, GRAPHICAL_ELEMENT, MOBILE_POSITION } from '../../lib/constants';
import { Heading } from '../index';
import { lorem } from '../../lib/helpers/lorem';
import Text from '../_shared/Text';

// https://storybook.js.org/docs/formats/component-story-format/

export default {
    title: 'Elements/ContentWithMedia',
    component: ContentWithMedia,
    includeStories: ['DefaultView'],
};

export const ContentWithMediaOnlyView = (props) => {
    const { groupID } = props;
    return <ContentWithMedia>Parsys</ContentWithMedia>;
};

export const DefaultView = () => {
    return <ContentWithMediaOnlyView />;
};
