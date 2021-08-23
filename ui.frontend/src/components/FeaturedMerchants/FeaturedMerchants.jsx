import React, { useEffect, useState } from 'react';
import styles from './FeaturedMerchants.module.scss';
import PropTypes from 'prop-types';
import { Button, Card, Heading, Icon, Media, Text } from '../index';
import cx from 'classnames';
import { t } from '@konrad/reweb-aem';
import useBreakpoint from '../../lib/helpers/useBreakpoint';
import {
    BREAKPOINT_MOBILE,
    BREAKPOINT_TABLET,
    BREAKPOINT_DESKTOP,
    BREAKPOINT_DESKTOP_L,
    ICONS_PATH,
} from '../../lib/constants';

const FeaturedMerchants = (props) => {
    const linkIcon = ICONS_PATH + 'external-link-dark-purple.svg';
    const { merchants, loadMoreButtonText } = props;
    const currentBreakpoint = useBreakpoint();
    const [showMore, setShow] = useState(false);

    const cardsPerRow = {
        [BREAKPOINT_MOBILE]: 4,
        [BREAKPOINT_TABLET]: 6,
        [BREAKPOINT_DESKTOP]: 6,
        [BREAKPOINT_DESKTOP_L]: 8,
    };

    const currentLimit = cardsPerRow[currentBreakpoint];

    const displayedMerchants = showMore ? merchants : merchants.slice(0, currentLimit);

    const merchantItems = displayedMerchants.map((item, index) => {
        const { fileReference, altText, industry, linkText, linkType, linkUrl, linkAltText } = item;
        return (
            <li className={cx(styles['merchant'])} key={index}>
                <Card className={styles['merchant-card']}>
                    <div className={styles['merchant-card__sizer']}>
                        <Media
                            fileReference={fileReference}
                            altText={altText}
                            horizontalAlignment="center"
                            className={styles['merchant__img']}
                        />
                    </div>
                    <div className={styles['merchant-card__body']}>
                        <Heading
                            text={industry}
                            overrideStyle="large"
                            headingLevel={'h3'}
                            className={cx(styles['merchant-card__sub'])}
                        />
                        <a
                            href={linkUrl}
                            className={cx(styles['merchant-card__group'])}
                            target={linkType === 'Internal' ? '' : '_blank'}
                            aria-label={linkAltText ? linkAltText : `${linkText} Link`}
                        >
                            <Heading
                                headingLevel="h4"
                                overrideStyle="h6"
                                text={linkText}
                                className={cx(styles['merchant-card__main'])}
                            />
                            <Icon
                                className={cx(styles['merchant-card__icon'])}
                                size="x-small"
                                url={linkIcon}
                            />
                        </a>
                    </div>
                </Card>
            </li>
        );
    });

    const handleShowMore = () => setShow(!showMore);

    return (
        <div className={cx(styles.container)}>
            <ul className={styles.list}>{merchantItems}</ul>
            {merchants.length > currentLimit && !showMore && (
                <Button
                    buttonStyle="general"
                    linkText={loadMoreButtonText}
                    className={cx(styles['container__more-button'])}
                    onClick={handleShowMore}
                />
            )}
        </div>
    );
};

FeaturedMerchants.displayName = 'FeaturedMerchants';

FeaturedMerchants.defaultProps = {
    buttonText: 'See More',
};

FeaturedMerchants.propTypes = {
    heading: PropTypes.string,
    merchants: PropTypes.array.isRequired,
    description: PropTypes.string,
};

export default FeaturedMerchants;
