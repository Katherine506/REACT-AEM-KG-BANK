import React, { useRef } from 'react';
import Dotdotdot from 'react-dotdotdot';
import PropTypes from 'prop-types';
import { LinkBase, Text } from '../../index';
import styles from './PostCard.module.scss';
import cx from 'classnames';
import { t } from '@konrad/reweb-aem';
import { HEADING_LEVELS, LINK_TYPES } from '../../../lib/constants';
import { capitalize } from '../../../lib/helpers/stringHeplers';

const PostCard = (props) => {
    const {
        altText,
        category,
        date,
        description,
        image,
        readTime,
        postCategoryHeadingLevel,
        postLinkType,
        postTitleHeadingLevel,
        postUrl,
        title,
    } = props;
    const CategoryElement = postCategoryHeadingLevel;
    const TitleElement = postTitleHeadingLevel;
    const detailsContent = `<span>${capitalize(date)}${
        readTime ? ` • ${t('{0} minute read', [readTime])}` : ''
    }</span>`;

    const containerRef = useRef();

    const navigateToPost = () => {
        const link = containerRef.current.getElementsByClassName(styles['title-link'])[0];
        link.click();
    };

    return (
        <article className={styles.root}>
            <div className={styles.container} onClick={navigateToPost} ref={containerRef}>
                <div
                    aria-label={altText || t('Post image')}
                    className={cx(styles.image)}
                    role="img"
                    style={{ backgroundImage: `url('${image}')` }}
                />
                <CategoryElement>
                    <Text className={styles.category} content={category} size="small" />
                </CategoryElement>
                <LinkBase
                    altText={t('Read the post titled {0}', [title])}
                    className={cx(styles['title-link'])}
                    url={postUrl}
                    target={postLinkType}
                >
                    <TitleElement>
                        <Text className={styles.title} content={`<a>${title}</a>`} size="body" />
                    </TitleElement>
                </LinkBase>
                <Dotdotdot clamp={3}>
                    <Text className={styles.description} content={description} size="body" />
                </Dotdotdot>
                <Text className={styles.details} content={detailsContent} size="small" />
            </div>
        </article>
    );
};

PostCard.displayName = 'PostCard';

PostCard.propTypes = {
    altText: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    readTime: PropTypes.number,
    postCategoryHeadingLevel: PropTypes.oneOf(HEADING_LEVELS).isRequired,
    postLinkType: PropTypes.oneOf(LINK_TYPES).isRequired,
    postTitleHeadingLevel: PropTypes.oneOf(HEADING_LEVELS).isRequired,
    postUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

export default PostCard;
