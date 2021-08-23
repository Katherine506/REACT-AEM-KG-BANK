import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Heading, Button, Icon } from '../index';
import styles from './HeroBanner.module.scss';
import cx from 'classnames';
import { HERO_PRIMARY, HERO_TYPES, LINK_TYPES } from '../../lib/constants';
import useInterval from '../../lib/services/useInterval';
import { getIconUrl } from '../../lib/helpers/mediaHeplers';

const HERO_ANIMATION_INTERVAL = 3300;

const HeroBanner = (props) => {
    const {
        buttonContextIconUrl,
        buttonContextText,
        designType,
        primaryCtaLinkAltText,
        primaryCtaLinkText,
        primaryCtaLinkType,
        primaryCtaLinkUrl,
        secondaryCtaLinkAltText,
        secondaryCtaLinkText,
        secondaryCtaLinkType,
        secondaryCtaLinkUrl,
        items,
        title,
        subtitle,
    } = props;

    const containerRef = useRef();
    const primaryContainerRef = useRef();
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [reset, setReset] = useState(true); //Helps to force render when there's only 1 card to maintain the primary type animation

    const cards = (items || []).map(({ whiteText, orangeText }) => ({
        title: whiteText,
        subtitle: orangeText,
    }));

    useInterval(
        () => {
            setCurrentCardIndex((currentCardIndex + 1) % cards.length);
            setReset(!reset);
        },
        HERO_ANIMATION_INTERVAL,
        isPlaying
    );
    const isPrimaryType = designType === HERO_PRIMARY;
    const TitleTag = isPrimaryType ? 'h2' : 'h1';

    useEffect(() => {
        if (isPrimaryType) {
            const cardElements = primaryContainerRef.current.getElementsByClassName(styles.heading);
            let maxHeight = 0;

            for (let i = 0; i < cardElements.length; i++) {
                const height = cardElements[i].clientHeight;
                if (height > maxHeight) {
                    maxHeight = height;
                }
            }

            primaryContainerRef.current.style.height = `${maxHeight}px`;
        }
    }, [isPrimaryType, reset]);

    const headingElements = cards.map((card, index) => (
        <Heading
            headingLevel="h1"
            color="white"
            className={cx(styles.heading, {
                [styles.hidden]: currentCardIndex !== index,
            })}
        >
            <span className={styles['first-line']}>{cards[index].title}</span>
            <span className={styles['second-line']}>{cards[index].subtitle}</span>
        </Heading>
    ));

    return (
        <section className={cx(styles.root, styles[designType])}>
            <div className={cx(styles.container)} ref={containerRef}>
                {designType === HERO_PRIMARY ? (
                    <div
                        className={styles['primary-container']}
                        key={`${currentCardIndex}${reset}`}
                        ref={primaryContainerRef}
                    >
                        {headingElements}
                    </div>
                ) : null}
                <TitleTag className={cx(styles.title)}>{title}</TitleTag>
                {!isPrimaryType && subtitle ? (
                    <p className={cx(styles.subtitle)}>{subtitle}</p>
                ) : null}

                {primaryCtaLinkText && primaryCtaLinkType && primaryCtaLinkUrl ? (
                    <Button
                        altText={primaryCtaLinkAltText || undefined}
                        buttonStyle="hero-primary"
                        className={cx(styles['primary-cta'])}
                        linkText={primaryCtaLinkText}
                        linkType={primaryCtaLinkType}
                        linkUrl={primaryCtaLinkUrl}
                    />
                ) : null}
                {secondaryCtaLinkText &&
                secondaryCtaLinkType &&
                secondaryCtaLinkUrl &&
                designType === HERO_PRIMARY ? (
                    <Button
                        altText={secondaryCtaLinkAltText || undefined}
                        buttonStyle="hero-secondary"
                        linkText={secondaryCtaLinkText}
                        linkType={secondaryCtaLinkType}
                        linkUrl={secondaryCtaLinkUrl}
                    />
                ) : null}
                {designType === HERO_PRIMARY && buttonContextText ? (
                    <aside className={cx(styles['button-context'])}>
                        {buttonContextIconUrl ? (
                            <Icon
                                className={cx(styles['button-context-icon'])}
                                size="x-small"
                                url={getIconUrl(buttonContextIconUrl)}
                            />
                        ) : null}
                        <p className={cx(styles['button-context-text'])}>{buttonContextText}</p>
                    </aside>
                ) : null}
            </div>
        </section>
    );
};

HeroBanner.displayName = 'HeroBanner';

HeroBanner.propTypes = {
    buttonContextIconUrl: PropTypes.string,
    buttonContextText: PropTypes.string,
    designType: PropTypes.oneOf(HERO_TYPES).isRequired,
    primaryCtaLinkAltText: PropTypes.string,
    primaryCtaLinkText: PropTypes.string,
    primaryCtaLinkType: PropTypes.oneOf(LINK_TYPES),
    primaryCtaLinkUrl: PropTypes.string,
    secondaryCtaLinkAltText: PropTypes.string,
    secondaryCtaLinkText: PropTypes.string,
    secondaryCtaLinkType: PropTypes.oneOf(LINK_TYPES),
    secondaryCtaLinkUrl: PropTypes.string,
    subtitle: PropTypes.string,
    title: PropTypes.string.isRequired,
};

export default HeroBanner;
