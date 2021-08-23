import React from 'react';
import Text from './Text';
import Theme from '../Theme';
import { select } from '@storybook/addon-knobs';
import html from '../../../lib/helpers/htmlKnob';
import { TEXT_SIZE, THEME_OPTIONS } from '../../../lib/constants';
import { lorem } from '../../../lib/helpers/lorem';

// https://storybook.js.org/docs/formats/component-story-format/

export default {
    title: 'Elements/Text',
    component: Text,
    includeStories: ['DefaultView'],
};

const defaultText = `<p><b>Lorem!</b> ${lorem.generateParagraphs(
    1
)}</p><p>${lorem.generateParagraphs(
    1
)}</p><p><a href='/'>Internal Link</a><br/><a href='https://www.google.com' target='_blank'>External Link</a></p>
<p><b> Bold</b></p>
<p><i> Italics</i></p>
<p><b><i> Bold-Italics</i></b></p>
<p><i><b> Italics-Bold</b></i></p>
<p><b><u>Bold-underline</u></b></p>
<p><u><b>Underline-Bold</b></u></p>
<p><i><u>Italics-underline</u></i></p>
<p><u><i>Underline-Italics</i></u></p>
<p><u><i><b>Underline-Italics-Bold</b></i></u></p>
<p><i><b><u> Italics-Bold-Underline</u></b></i></u></p>
<b><p>Bold-paragraph</p></b>`;

export const TextOnlyView = (props) => {
    const { groupID } = props;
    return (
        <Text
            content={html('Text Content', defaultText, groupID)}
            size={select('Text Size', TEXT_SIZE, 'x-large', groupID)}
        />
    );
};

export const DefaultView = () => {
    return (
        <Theme theme={select('Theme of Parent Component', THEME_OPTIONS, 'light')}>
            <TextOnlyView />
        </Theme>
    );
};
