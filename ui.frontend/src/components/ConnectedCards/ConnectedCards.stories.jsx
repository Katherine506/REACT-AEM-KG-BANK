import React from 'react';
import ConnectedCards from './ConnectedCards';
import { boolean, select } from '@storybook/addon-knobs';
import { IconOnlyView } from '../_shared/Icon/Icon.stories';
import { HeadingOnlyView } from '../_shared/Heading/Heading.stories';
import { TextOnlyView } from '../_shared/Text/Text.stories';
import { ButtonOnlyView } from '../_shared/Button/Button.stories';
import Theme from '../_shared/Theme';
import { ALIGNMENT_OPTIONS, THEME_OPTIONS } from '../../lib/constants';

// https://storybook.js.org/docs/formats/component-story-format/

export default {
    title: 'Elements/ConnectedCards',
    component: ConnectedCards,
};

const DEFAULT_THEME = 'dark';
const DEFAULT_ALIGNMENT = 'left';
const CARD_GROUP_ID = 'card';

export const DefaultView = () => {
    const icon = toggleElementDisplayKnob('Icon', IconOnlyView)();
    const heading = toggleElementDisplayKnob('Heading', HeadingOnlyView)();
    const text = toggleElementDisplayKnob('Text', TextOnlyView)();
    const button = toggleElementDisplayKnob('Button', ButtonOnlyView)();

    const parsys = (
        <div className="parsys">
            {icon}
            {heading}
            {text}
            {button}
        </div>
    );

    return (
        <Theme
            theme={select('Theme of Parent Component', THEME_OPTIONS, DEFAULT_THEME, CARD_GROUP_ID)}
        >
            <ConnectedCards
                horizontalAlignment={select(
                    'Horizontal Alignment',
                    ALIGNMENT_OPTIONS,
                    DEFAULT_ALIGNMENT,
                    CARD_GROUP_ID
                )}
            >
                <div className="rwc-cnt">
                    {parsys}
                    {parsys}
                    {parsys}
                </div>
            </ConnectedCards>
        </Theme>
    );
};

const toggleElementDisplayKnob = (name, Component) => () => {
    return boolean(`Display ${name}?`, true, name) && <Component groupID={name} />;
};
