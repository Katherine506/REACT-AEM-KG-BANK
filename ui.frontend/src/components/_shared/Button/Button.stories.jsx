import React from 'react';
import Button from './Button';
import Theme from '../Theme';
import { lorem } from '../../../lib/helpers/lorem';
import { select, text } from '@storybook/addon-knobs';
import { HERO_BUTTON_STYLES, LINK_TYPES, THEME_OPTIONS } from '../../../lib/constants';

// https://storybook.js.org/docs/formats/component-story-format/

export default {
    title: 'Elements/Button',
    component: Button,
    includeStories: ['DefaultView', 'HeroView'],
};

const defaultText = lorem.generateHeading(2);

export const ButtonOnlyView = (props) => {
    return <button>Button Placeholder</button>;
};
