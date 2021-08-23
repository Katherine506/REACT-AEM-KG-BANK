import React from 'react';
import Theme from '../_shared/Theme';
import { select, text } from '@storybook/addon-knobs';
import { LINK_TYPES, THEME_OPTIONS } from '../../lib/constants';
import CtaBanner from './CtaBanner';
import html from '../../lib/helpers/htmlKnob';

// https://storybook.js.org/docs/formats/component-story-format/

export default {
    title: 'Elements/CtaBanner',
    component: CtaBanner,
    includeStories: ['DefaultView'],
};

const defaultBannerText = '<p><b>Want to get started with us?</b></p>';
const defaultButtonText = 'Get a loan quote';
export const CtaBannerOnlyView = (props) => {
    const { groupID } = props;
    return (
        <>
            <CtaBanner
                bannerText={html('Text Content', defaultBannerText, groupID)}
                linkText={text('Link Text', defaultButtonText, groupID)}
                altText={text('Alt Text', 'Loan Quote button', groupID)}
                linkUrl={text('Link URL', '/', groupID)}
                linkType={select('Link Type', LINK_TYPES, 'internal', groupID)}
            />
        </>
    );
};

export const DefaultView = () => {
    return (
        <Theme theme={select('Theme of Parent Component', THEME_OPTIONS, 'light')}>
            <CtaBannerOnlyView />
        </Theme>
    );
};
