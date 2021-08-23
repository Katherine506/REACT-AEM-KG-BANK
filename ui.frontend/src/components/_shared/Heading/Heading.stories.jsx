import React from 'react';
import Heading from './Heading';
import Theme from '../Theme';
import { text, select } from '@storybook/addon-knobs';
import { ALIGNMENT_OPTIONS, HEADING_LEVELS, THEME_OPTIONS } from '../../../lib/constants';
import { lorem } from '../../../lib/helpers/lorem';

// https://storybook.js.org/docs/formats/component-story-format/

export default {
    title: 'Elements/Heading',
    component: Heading,
    includeStories: ['DefaultView'],
};

const defaultText = lorem.generateHeading(4);

export const HeadingOnlyView = (props) => {
    const { groupID } = props;
    return (
        <Heading
            text={text('Heading Text', defaultText, groupID)}
            alignment={select('Heading Alignment', ALIGNMENT_OPTIONS, 'left', groupID)}
            headingLevel={select('Heading Level', HEADING_LEVELS, 'h1', groupID)}
        />
    );
};

export const DefaultView = () => {
    return (
        <Theme theme={select('Theme of Parent Component', THEME_OPTIONS, 'light')}>
            <HeadingOnlyView />
        </Theme>
    );
};
