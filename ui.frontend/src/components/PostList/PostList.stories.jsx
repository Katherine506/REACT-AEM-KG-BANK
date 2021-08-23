import React from 'react';
import PostList from './PostList';
import SectionContainer from '../SectionContainer';
import Theme from '../_shared/Theme';
import { object, select, text } from '@storybook/addon-knobs';
import { lorem } from '../../lib/helpers/lorem';
import { HEADING_LEVELS, LINK_TYPES, THEME_OPTIONS } from '../../lib/constants';

// https://storybook.js.org/docs/formats/component-story-format/

export default {
    title: 'Elements/PostList',
    component: PostList,
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

const getPostList = (numPosts) => {
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
                <PostList
                    morePostsCtaAltText={text('More Posts CTA Alt Text', '')}
                    morePostsCtaText={text('More Posts CTA Text', 'VIEW MORE')}
                    noPostsText="Sorry there are no blog posts currently available"
                    postLinkType={select('Post Link Type', LINK_TYPES, 'internal')}
                    postCategoryHeadingLevel={select(
                        'Post Category Heading Level',
                        HEADING_LEVELS,
                        'h4'
                    )}
                    posts={object('Posts', posts)}
                    postTitleHeadingLevel={select('Post Title Heading Level', HEADING_LEVELS, 'h3')}
                />
            </SectionContainer>
        </Theme>
    );
};

export const ManyPosts = () => {
    return getPostList(29);
};

export const FewPosts = () => {
    return getPostList(3);
};

export const NoPosts = () => {
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
                <PostList
                    morePostsCtaAltText=""
                    morePostsCtaText="VIEW MORE"
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
        </Theme>
    );
};
