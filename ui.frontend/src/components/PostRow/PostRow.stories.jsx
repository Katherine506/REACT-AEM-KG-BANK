import React from 'react';
import PostRow from './PostRow';
import SectionContainer from '../SectionContainer';
import Theme from '../_shared/Theme';
import { object, select, text } from '@storybook/addon-knobs';
import { lorem } from '../../lib/helpers/lorem';
import { HEADING_LEVELS, LINK_TYPES, THEME_OPTIONS } from '../../lib/constants';

// https://storybook.js.org/docs/formats/component-story-format/

export default {
    title: 'Elements/PostRow',
    component: PostRow,
};

const getPosts = (length) => {
    const POSTS = [];
    for (let i = 0; i < length; i++) {
        POSTS.push({
            altText: 'Owl',
            category: 'Finance 101',
            date: 'June 29th, 2020',
            description: `<p>${lorem.generateParagraphs(1)}</p>`,
            image: '/magalie-st-hialire-poulin-Sik3Vh9T8J4-unsplash.jpg',
            readTime: 4,
            postUrl: `#card-${i + 1}`,
            title: `Card ${i + 1} of ${length}: ${lorem.generateHeading(5)}`,
        });
    }
    return POSTS;
};

const getPostRow = (numPosts) => {
    const posts = getPosts(numPosts);

    return (
        <Theme theme={select('Theme of Parent Component', THEME_OPTIONS, 'light')}>
            <SectionContainer
                backgroundColor={
                    select('Theme of Parent Component', THEME_OPTIONS, 'light') === 'light'
                        ? 'white'
                        : 'darkPurple'
                }
                width="full"
            >
                <PostRow
                    noPostsText="Sorry there are no blog posts currently available"
                    postCategoryHeadingLevel={select(
                        'Post Category Heading Level',
                        HEADING_LEVELS,
                        'h4'
                    )}
                    postLinkType={select('Post Link Type', LINK_TYPES, 'internal')}
                    posts={object('Posts', posts)}
                    postTitleHeadingLevel={select('Post Title Heading Level', HEADING_LEVELS, 'h3')}
                />
            </SectionContainer>
        </Theme>
    );
};

export const ThreePosts = () => {
    return getPostRow(3);
};

export const TwoPosts = () => {
    return getPostRow(2);
};

export const OnePost = () => {
    return getPostRow(1);
};

export const NoPosts = () => {
    return (
        <SectionContainer>
            <PostRow
                noPostsText={text(
                    'No Posts Text',
                    'Sorry there are no blog posts currently available'
                )}
                postLinkType="internal"
                postCategoryHeadingLevel="h4"
                posts={getPosts(0)}
                postTitleHeadingLevel="h3"
            />
        </SectionContainer>
    );
};
