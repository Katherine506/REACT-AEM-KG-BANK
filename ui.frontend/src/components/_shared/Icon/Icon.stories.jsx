import React from 'react';
import Icon from './Icon';
import { boolean, select, text } from '@storybook/addon-knobs';
import { SAMPLE_ICONS, ICON_SIZES, THEME_OPTIONS } from '../../../lib/constants';
import Theme from '../Theme';

// https://storybook.js.org/docs/formats/component-story-format/

export default {
    title: 'Elements/Icon',
    component: Icon,
    includeStories: ['DefaultView'],
};

export const IconOnlyView = (props) => {
    const { groupID } = props;
    return (
        <Icon
            altText={text('Alt Text', '', groupID)}
            url={select('Icon', SAMPLE_ICONS, SAMPLE_ICONS['Communication (Mail)'], groupID)}
            size={select('Size', ICON_SIZES, 'large', groupID)}
            embedSVG={boolean('Embed SVG', true)}
        />
    );
};

export const DefaultView = () => {
    return (
        <Theme theme={select('Theme of Parent Component', THEME_OPTIONS, 'light')}>
            <IconOnlyView />
        </Theme>
    );
};
