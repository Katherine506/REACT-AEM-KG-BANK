import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './PostHero.module.scss';
import { Heading, Text } from '../index';
import { t } from '@konrad/reweb-aem';
import { capitalize } from '../../lib/helpers/stringHeplers';

const PostHero = (props) => {
    const { category, title, image, readTime, altText, date } = props;

    const detailsContent = `<p>${capitalize(date)} • ${t('{0} minute read', [readTime || 3])}</p>`;
    return (
        <div className={cx(styles['main-container'])}>
            <div
                role={altText ? 'img' : ''}
                aria-label={altText}
                className={cx(styles['image'])}
                style={{
                    backgroundImage: `url('${image}')`,
                }}
            />
            <div className={cx(styles.container)}>
                <Heading
                    headingLevel="h2"
                    overrideStyle="large"
                    color="darkPurple"
                    text={category}
                    className={styles['category']}
                />
                <Heading
                    headingLevel="h1"
                    overrideStyle="h3"
                    color="darkPurple"
                    text={title}
                    className={styles['title']}
                />
                <Text
                    content={detailsContent}
                    size="small"
                    className={cx(styles.text, styles['details'])}
                />
            </div>
        </div>
    );
};

PostHero.displayName = 'PostHero';

PostHero.propTypes = {
    category: PropTypes.string,
    title: PropTypes.string,
    image: PropTypes.string,
    readTime: PropTypes.string,
    altText: PropTypes.string,
    date: PropTypes.string,
};

export default PostHero;
