import React from 'react';
import Card from './Card';
import { boolean, select } from '@storybook/addon-knobs';
import Theme from '../Theme';
import { ButtonOnlyView } from '../Button/Button.stories';
import { TextOnlyView } from '../Text/Text.stories';
import { HeadingOnlyView } from '../Heading/Heading.stories';
import { IconOnlyView } from '../Icon/Icon.stories';
import { ALIGNMENT_OPTIONS, THEME_OPTIONS } from '../../../lib/constants';

// https://storybook.js.org/docs/formats/component-story-format/

export default {
    title: 'Elements/Card',
    component: Card,
};
const DEFAULT_THEME = 'dark';
const DEFAULT_ALIGNMENT = 'left';

const CARD_GROUP_ID = 'card';

export const DefaultView = () => {
    return (
        <Theme
            theme={select('Theme of Parent Component', THEME_OPTIONS, DEFAULT_THEME, CARD_GROUP_ID)}
        >
            <Card
                horizontalAlignment={select(
                    'Horizontal Alignment',
                    ALIGNMENT_OPTIONS,
                    DEFAULT_ALIGNMENT,
                    CARD_GROUP_ID
                )}
            >
                {toggleElementDisplayKnob('Icon', IconOnlyView)()}
                {toggleElementDisplayKnob('Heading', HeadingOnlyView)()}
                {toggleElementDisplayKnob('Text', TextOnlyView)()}
                {toggleElementDisplayKnob('Button', ButtonOnlyView)()}
            </Card>
        </Theme>
    );
};

const toggleElementDisplayKnob = (name, Component) => () => {
    return boolean(`Display ${name}?`, true, name) && <Component groupID={name} />;
};
