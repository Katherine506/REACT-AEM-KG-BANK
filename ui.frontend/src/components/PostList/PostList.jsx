import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Heading, PostCard } from '../index';
import styles from './PostList.module.scss';
import cx from 'classnames';
import useBreakpoint from '../../lib/helpers/useBreakpoint';
import {
    BREAKPOINT_MOBILE,
    BREAKPOINT_TABLET,
    HEADING_LEVELS,
    LINK_TYPES,
} from '../../lib/constants';

const PostList = (props) => {
    const {
        morePostsCtaAltText,
        morePostsCtaText,
        noPostsText,
        postLinkType,
        postCategoryHeadingLevel,
        posts,
        postTitleHeadingLevel,
    } = props;

    const maxPosts = {
        mobile: {
            initial: 4,
            increment: 4,
        },
        desktop: {
            initial: 12,
            increment: 12,
        },
    };
    const currentBreakpoint = useBreakpoint();
    const currentBreakpointIsMobile =
        currentBreakpoint === BREAKPOINT_MOBILE || currentBreakpoint === BREAKPOINT_TABLET;
    const [postsDisplayed, setPostsDisplayed] = useState(
        currentBreakpointIsMobile ? maxPosts.mobile.initial : maxPosts.desktop.initial
    );
    const numRemainingPosts = posts.length - postsDisplayed;
    const postsContainerRef = useRef();

    const showMorePosts = () => {
        const numPostsToDisplay = Math.min(
            numRemainingPosts,
            currentBreakpointIsMobile ? maxPosts.mobile.increment : maxPosts.desktop.increment
        );

        setPostsDisplayed(postsDisplayed + numPostsToDisplay);
    };

    const postCards = posts
        .slice(0, Math.min(posts.length, postsDisplayed))
        .map((post, index) => (
            <PostCard
                altText={post.altText}
                category={post.category}
                date={post.date}
                description={post.description}
                image={post.image}
                key={index}
                readTime={post.readTime}
                postCategoryHeadingLevel={postCategoryHeadingLevel}
                postLinkType={postLinkType}
                postTitleHeadingLevel={postTitleHeadingLevel}
                postUrl={post.postUrl}
                title={post.title}
            />
        ));

    return (
        <section className={styles.root}>
            {!!posts.length ? (
                <>
                    <div className={cx(styles['posts-container'])} ref={postsContainerRef}>
                        {postCards}
                    </div>
                    {numRemainingPosts > 0 && (
                        <div className={cx(styles['button-container'])}>
                            <Button
                                altText={morePostsCtaAltText}
                                buttonStyle="general"
                                className={cx(styles.button)}
                                linkText={morePostsCtaText}
                                onClick={showMorePosts}
                            />
                        </div>
                    )}
                </>
            ) : (
                <Heading
                    className={cx(styles['no-posts'])}
                    headingLevel="div"
                    overrideStyle="h4"
                    text={noPostsText}
                />
            )}
        </section>
    );
};

PostList.displayName = 'PostList';

PostList.propTypes = {
    morePostsCtaAltText: PropTypes.string,
    morePostsCtaText: PropTypes.string,
    noPostsText: PropTypes.string.isRequired,
    postLinkType: PropTypes.oneOf(LINK_TYPES).isRequired,
    postCategoryHeadingLevel: PropTypes.oneOf(HEADING_LEVELS).isRequired,
    posts: PropTypes.arrayOf(
        PropTypes.shape({
            altText: PropTypes.string.isRequired,
            category: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            readTime: PropTypes.number,
            postUrl: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
        })
    ),
    postTitleHeadingLevel: PropTypes.oneOf(HEADING_LEVELS).isRequired,
};

export default PostList;
