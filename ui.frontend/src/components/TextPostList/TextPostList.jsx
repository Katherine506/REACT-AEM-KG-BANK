import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './TextPostList.module.scss';
import cx from 'classnames';
import { HEADING_LEVELS, LINK_TYPES } from '../../lib/constants';
import Heading from '../_shared/Heading';
import { Button, Text } from '../index';
import { LinkBase } from '../_shared/Link';

const TextPostList = (props) => {
    const {
        posts,
        postCategoryHeadingLevel,
        postTitleHeadingLevel,
        morePostsCtaAltText,
        morePostsCtaText,
        postLinkType,
        noPostsText,
    } = props;

    const [groupedItems, setGroupedItems] = useState({});
    const [showAll, setShowAll] = useState(posts.length <= 4 ? true : false);

    const showMoreAction = () => {
        setShowAll(!showAll);
    };

    useEffect(() => {
        groupItems(posts);
    }, []);

    const groupItems = (list) => {
        const grouped = {};
        list.forEach((post) => {
            if (grouped[String(post.year)]) {
                grouped[String(post.year)].push(post);
            } else {
                grouped[String(post.year)] = [post];
            }
        });
        setGroupedItems(grouped);
    };

    const postItems = (postList, postsRendered, limit) => {
        const sorted = postList.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        const formattedPosts = [];
        let position = 0;

        while (postsRendered < limit && position < sorted.length) {
            const { postUrl, altText, title, date, description } = sorted[position];
            formattedPosts.push(
                <div className={cx(styles.post)} key={position}>
                    <LinkBase
                        url={postUrl}
                        target={postLinkType}
                        className={styles['title-link']}
                        altText={altText}
                    >
                        <Heading
                            text={title}
                            headingLevel={postTitleHeadingLevel}
                            overrideStyle="large"
                            className={styles.title}
                        />
                    </LinkBase>
                    <Text content={date} size="body" className={styles.date} />
                    <Text content={description} size="body" />
                </div>
            );
            position++;
            postsRendered++;
        }

        return {
            formattedPosts,
            postsRenderedAfter: postsRendered,
        };
    };

    const formattedPosts = () => {
        const limit = showAll ? posts.length : 4;
        const formattedList = [];

        const sortedGroup = Object.keys(groupedItems).sort((a, b) => Number(b) - Number(a));
        let postsRendered = 0;

        for (let i = 0; i < sortedGroup.length; i++) {
            const { postsRenderedAfter, formattedPosts } = postItems(
                groupedItems[sortedGroup[i]],
                postsRendered,
                limit
            );
            formattedList.push(
                <div key={i}>
                    <Heading
                        headingLevel={postCategoryHeadingLevel}
                        text={sortedGroup[i]}
                        className={styles['year']}
                    />
                    <div className={cx(styles.container)}>{formattedPosts}</div>
                </div>
            );

            if (postsRenderedAfter >= limit) {
                break;
            } else {
                postsRendered = postsRenderedAfter;
            }
        }

        return formattedList;
    };

    return (
        <div className={styles.root}>
            {!!posts.length ? (
                <>
                    {formattedPosts()}
                    <div className={styles['button-box']}>
                        {!showAll && (
                            <Button
                                altText={morePostsCtaAltText}
                                buttonStyle="general"
                                linkText={morePostsCtaText}
                                onClick={showMoreAction}
                            />
                        )}
                    </div>
                </>
            ) : (
                <Heading
                    text={noPostsText}
                    headingLevel="div"
                    overrideStyle="h4"
                    className={styles['no-posts']}
                />
            )}
        </div>
    );
};

TextPostList.displayName = 'TextPostList';

TextPostList.propTypes = {
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
            timestamp: PropTypes.number.isRequired,
            description: PropTypes.string.isRequired,
            postUrl: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            year: PropTypes.number.isRequired,
        })
    ),
    postTitleHeadingLevel: PropTypes.oneOf(HEADING_LEVELS).isRequired,
};

export default TextPostList;
