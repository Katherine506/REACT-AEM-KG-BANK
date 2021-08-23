import React from 'react';
import PropTypes from 'prop-types';
import { t } from '@konrad/reweb-aem';
import styles from './FeaturedPost.module.scss';
import cx from 'classnames';
import ContentWithMedia from '../ContentWithMedia';
import {
    DESKTOP_POSITION,
    GRAPHICAL_ELEMENT,
    HEADING_LEVELS,
    LINK_TYPES,
    MOBILE_POSITION,
} from '../../lib/constants';
import { Button, Heading, Text } from '../index';
import { capitalize } from '../../lib/helpers/stringHeplers';

const FeaturedPost = (props) => {
    const {
        altText,
        date,
        category,
        categoryHeadingLevel,
        description,
        graphicalElement,
        image,
        linkAltText,
        linkText,
        post,
        readTime,
        title,
        titleHeadingLevel,
    } = props;

    const detailsContent = `<span>${capitalize(date)} • ${t('{0} minute read', [readTime])}</span>`;
    const defaultLinkAltText = `${t('Read the post titled {0}', [title])}`;

    return (
        <ContentWithMedia
            altText={altText}
            desktopPosition={DESKTOP_POSITION[1]}
            mobilePosition={MOBILE_POSITION[0]}
            graphicalElement={graphicalElement}
            fileReference={image}
        >
            <Heading
                headingLevel={categoryHeadingLevel}
                overrideStyle="large"
                text={category}
                className={styles['sub-heading']}
            />
            <Heading
                headingLevel={titleHeadingLevel}
                overrideStyle="h3"
                text={title}
                className={styles['title']}
            />
            <Text content={description} size="large" className={styles['description']} />
            <Text
                content={detailsContent}
                size="small"
                className={cx(styles.text, styles['details'])}
            />
            <Button
                altText={linkAltText || defaultLinkAltText}
                buttonStyle="general"
                linkText={linkText}
                linkType={LINK_TYPES[0]}
                linkUrl={post}
                className={styles['cta']}
            />
        </ContentWithMedia>
    );
};

FeaturedPost.displayName = 'FeaturedPost';

FeaturedPost.defaultProps = {};

FeaturedPost.propTypes = {
    altText: PropTypes.string,
    date: PropTypes.string,
    category: PropTypes.string,
    categoryHeadingLevel: PropTypes.oneOf(HEADING_LEVELS),
    description: PropTypes.string,
    image: PropTypes.string,
    linkAltText: PropTypes.string,
    linkText: PropTypes.string,
    post: PropTypes.string,
    readTime: PropTypes.number,
    title: PropTypes.string,
    titleHeadingLevel: PropTypes.oneOf(HEADING_LEVELS),
    graphicalElement: PropTypes.oneOf(GRAPHICAL_ELEMENT),
};

export default FeaturedPost;
