import React from 'react';
import PostCard from './PostCard';
import Theme from '../Theme';
import { number, select, text } from '@storybook/addon-knobs';
import html from '../../../lib/helpers/htmlKnob';
import { lorem } from '../../../lib/helpers/lorem';
import { HEADING_LEVELS, LINK_TYPES, THEME_OPTIONS } from '../../../lib/constants';

// https://storybook.js.org/docs/formats/component-story-format/

export default {
    title: 'Elements/PostCard',
    component: PostCard,
};

const DESCRIPTION_TEXT = `<p>${lorem.generateParagraphs(1)}</p>`;

export const DefaultView = () => {
    return (
        <Theme theme={select('Theme of Parent Component', THEME_OPTIONS, 'light')}>
            <PostCard
                altText={text('Image Alt Text', 'Owl')}
                category={text('Category', 'Finance 101')}
                date={text('Date', 'June 29th, 2020')}
                description={html('Description', DESCRIPTION_TEXT)}
                image={text(
                    'Image File Reference',
                    '/magalie-st-hialire-poulin-Sik3Vh9T8J4-unsplash.jpg'
                )}
                readTime={number('Read Time', 4)}
                postCategoryHeadingLevel={select(
                    'Post Category Heading Level',
                    HEADING_LEVELS,
                    'h4'
                )}
                postLinkType={select('Post Link Type', LINK_TYPES, 'internal')}
                postTitleHeadingLevel={select('Post Title Heading Level', HEADING_LEVELS, 'h3')}
                postUrl={text('Post Link URL', '/')}
                title={text('Title', 'How to apply for a personal loan')}
            />
        </Theme>
    );
};
