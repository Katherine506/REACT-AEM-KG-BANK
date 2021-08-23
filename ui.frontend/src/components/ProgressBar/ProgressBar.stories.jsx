import React from 'react';
import ProgressBar from './ProgressBar';

// https://storybook.js.org/docs/formats/component-story-format/

export default {
    title: 'Elements/ProgressBar',
    component: ProgressBar,
    includeStories: ['DefaultView'],
};

export const DefaultView = () => {
    return <ProgressBar />;
};
