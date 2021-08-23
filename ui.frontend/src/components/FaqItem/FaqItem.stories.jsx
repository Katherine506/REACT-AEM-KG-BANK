import React from 'react';
import FaqItem from './FaqItem';
import { text } from '@storybook/addon-knobs';
import { lorem } from '../../lib/helpers/lorem';

// https://storybook.js.org/docs/formats/component-story-format/

export default {
    title: 'Elements/FAQ Item',
    component: FaqItem,
};

const defaultText = lorem.generateHeading(4);

export const DefaultView = (props) => {
    const { groupID } = props;
    return (
        <FaqItem
            question={text('Question Text', defaultText, groupID)}
            answer={text('Answer Text', defaultText, groupID)}
        />
    );
};
