import React from 'react';
import PostHero from './PostHero';

// https://storybook.js.org/docs/formats/component-story-format/

export default {
    title: 'Elements/PostHero',
    component: PostHero,
    includeStories: ['DefaultView'],
};

const PostHeroOnlyView = () => {
    return (
        <PostHero
            category={'Finance 101'}
            title={'Do not fall for these 6 financial myths'}
            image={'/post-hero-2.jpg'}
            date={'June 29th, 2020'}
            readTime={'4'}
            altText={'Post hero'}
        />
    );
};

export const DefaultView = () => {
    return <PostHeroOnlyView />;
};
