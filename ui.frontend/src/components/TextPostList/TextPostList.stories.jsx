import React from 'react';
import TextPostList from './TextPostList';
import { select, text } from '@storybook/addon-knobs';
import { HEADING_LEVELS, LINK_TYPES, THEME_OPTIONS } from '../../lib/constants';
import Theme from '../_shared/Theme';

export default {
    title: 'Elements/TextPostList',
    component: TextPostList,
};

const postList = [
    {
        altText: 'Fs Bank of Canada',
        category: 'Finance 101',
        date: '02.19.2020',
        description:
            'Duo Bank of Canada (“Duo Bank”), a Toronto-based financial services provider supported by Stephen Smith, Centerbridge Partners L.P. and Ontario Teachers’ Pension Plan (“Ontario Teachers’”), has reached a definitive agreement to purchase all outstanding shares of KG Bank Financial Holdings Inc. (“KG Bank” or “the Company”), which includes all operating subsidiaries, from an investor group led by J.C. Flowers & Co. LLC and Värde Partners, Inc.',
        readTime: 3,
        postUrl: 'www.youtube.com',
        title: 'KG Bank Financial Holdings Inc. to be Acquired by Duo Bank of Canada',
        year: 2020,
        timestamp: 1582113600,
    },
    {
        altText: 'Fs approval of in-store financing',
        category: 'Finance 101',
        date: '12.11.2019',
        description:
            "KG Bank Financial Inc. (“KG Bank”), Canada's leading non-bank provider of responsible lending solutions for near-prime borrowers, announced today that it will pre-approve, subject to meeting certain criteria, all current Accord D retailers in Quebec for in-store consumer purchase financing.",
        readTime: 3,
        postUrl: 'www.youtube.com',
        title:
            'KG Bank Financial Inc. Announces Pre-Approval of all Current Accord D Retailers for In-store Financing',
        year: 2019,
        timestamp: 1576022400,
    },
    {
        altText: 'Fs cloud migration',
        category: 'Finance 101',
        date: '06.05.2019',
        description:
            'KG Bank Financial Inc. (“KG Bank”), a privately-held consumer finance company, was recognized with an OCTAS Award yesterday during the annual Montreal gala, in the large business category for its rapid migration to a 100% cloud computing infrastructure.',
        readTime: 3,
        postUrl: 'www.youtube.com',
        title: 'KG Bank Financial Inc. Wins OCTAS Award for Cloud Migration and Transformation',
        year: 2019,
        timestamp: 1559743200,
    },
    {
        altText: 'Fs cloud migration',
        category: 'Finance 101',
        date: '09.25.2016',
        description:
            'KG Bank Financial Inc. (“KG Bank”), a privately-held consumer finance company, was recognized with an OCTAS Award yesterday during the annual Montreal gala, in the large business category for its rapid migration to a 100% cloud computing infrastructure.',
        readTime: 3,
        postUrl: 'www.youtube.com',
        title: 'KG Bank Financial Inc. Wins OCTAS Award for Cloud Migration and Transformation',
        year: 2016,
        timestamp: 1474761600,
    },
    {
        altText: 'Fs cloud migration',
        category: 'Finance 101',
        date: '03.13.2018',
        description:
            'KG Bank Financial Inc. (“KG Bank”), a privately-held consumer finance company, was recognized with an OCTAS Award yesterday during the annual Montreal gala, in the large business category for its rapid migration to a 100% cloud computing infrastructure.',
        readTime: 3,
        postUrl: 'www.youtube.com',
        title: 'KG Bank Financial Inc. Wins OCTAS Award for Cloud Migration and Transformation',
        year: 2018,
        timestamp: 1520953200,
    },
    {
        altText: 'Fs cloud migration',
        category: 'Finance 101',
        date: '01.05.2018',
        description:
            'KG Bank Financial Inc. (“KG Bank”), a privately-held consumer finance company, was recognized with an OCTAS Award yesterday during the annual Montreal gala, in the large business category for its rapid migration to a 100% cloud computing infrastructure.',
        readTime: 3,
        postUrl: 'www.youtube.com',
        title: 'KG Bank Financial Inc. Wins OCTAS Award for Cloud Migration and Transformation',
        year: 2018,
        timestamp: 1515110400,
    },
];

const postElement = (postList) => {
    return (
        <Theme theme={select('Theme of Parent Component', THEME_OPTIONS, 'light')}>
            <TextPostList
                noPostsText="Sorry there are no press releases currently available"
                postLinkType={select('Post Link Type', LINK_TYPES, 'external')}
                postCategoryHeadingLevel={select(
                    'Post Category Heading Level',
                    HEADING_LEVELS,
                    'h6'
                )}
                postTitleHeadingLevel={select('Post Category Heading Level', HEADING_LEVELS, 'div')}
                posts={postList}
                morePostsCtaAltText={text('More Posts CTA Alt Text', '')}
                morePostsCtaText={text('More Posts CTA Text', 'VIEW MORE')}
            />
        </Theme>
    );
};

export const DefaultView = () => {
    return postElement(postList);
};

export const NoPosts = () => {
    return postElement([]);
};

export const MinimalPosts = () => {
    return postElement(postList.slice(0, 3));
};
