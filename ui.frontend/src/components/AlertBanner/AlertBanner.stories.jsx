import React from 'react';
import AlertBanner from './AlertBanner';
import html from '../../lib/helpers/htmlKnob';
import { lorem } from '../../lib/helpers/lorem';

// https://storybook.js.org/docs/formats/component-story-format/

export default {
    title: 'Elements/AlertBanner',
    component: AlertBanner,
};

const ALERT_MESSAGE = `<p>${lorem.generateSentences(
    1
)} <a href="www.google.com" target="_blank">External Link</a> and an <a href="/">Internal Link</a> plus more text</p>`;

export const DefaultView = () => {
    return <AlertBanner text={html('Alert Message', ALERT_MESSAGE)} />;
};
