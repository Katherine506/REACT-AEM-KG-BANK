import React from 'react';
import FaqContainer from './FaqContainer';
import { select, text } from '@storybook/addon-knobs';
import { lorem } from '../../lib/helpers/lorem';
import FaqItem from '../FaqItem';
import { HEADING_LEVELS } from '../../lib/constants';

// https://storybook.js.org/docs/formats/component-story-format/

export default {
    title: 'Elements/FaqContainer',
    component: FaqContainer,
};

const THEME_OPTIONS = {
    Light: 'light',
    Dark: 'dark',
};

const defaultText = lorem.generateHeading(4);

export const DefaultView = (props) => {
    const { groupID } = props;
    return (
        <FaqContainer
            title={text('Container Title', defaultText, groupID)}
            headingLevel={select('Heading Level', HEADING_LEVELS, 'h1', groupID)}
        >
            <FaqItem question={defaultText} answer={defaultText} />
        </FaqContainer>
    );
};
