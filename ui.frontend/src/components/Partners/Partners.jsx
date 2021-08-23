import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Partners.module.scss';
import cx from 'classnames';
import { ICONS_PATH } from '../../lib/constants';
import Icon from '../_shared/Icon';
import { t } from '@konrad/reweb-aem';
import useBreakpoint from '../../lib/helpers/useBreakpoint';
import { SwitchTransition, CSSTransition } from 'react-transition-group';

const Partners = (props) => {
    const { items } = props;
    const playIcon = ICONS_PATH + 'play.svg';
    const pauseIcon = ICONS_PATH + 'pause.svg';
    const PAUSE_ICON_ALT_TEXT = t('pause');
    const PLAY_ICON_ALT_TEXT = t('play');
    const PAUSE_ARIA_LABEL = t('Stop the scrolling animation');
    const PLAY_ARIA_LABEL = t('Play the scrolling animation');
    const [iconURL, setIconURL] = useState(pauseIcon);
    const [accessibilityInfo, setAccessibilityInfo] = useState({
        iconAltText: PAUSE_ICON_ALT_TEXT,
        buttonAriaLabel: PAUSE_ARIA_LABEL,
    });
    const marqueeRef = useRef();
    const currentBreakpoint = useBreakpoint();
    const LOGO_WIDTH_IN_REM =
        currentBreakpoint === 'desktop' || currentBreakpoint === 'desktop-l'
            ? parseFloat(styles['image-container-width-desktop'])
            : parseFloat(styles['image-container-width-mobile']);
    const [marqueeWidth, setMarqueeWidth] = useState(0);
    const totalNumberOfLogos = items ? items.length : 0;
    const [tempLogos, setTempLogos] = useState([]);

    useEffect(() => {
        const marqueeElement = marqueeRef.current;
        const marqueeElementSize = marqueeElement && marqueeElement.clientWidth;
        setMarqueeWidth(marqueeElementSize);
    }, [currentBreakpoint]);

    useEffect(() => {
        if (items && items.length > 0) {
            const timesToBeDuplicated =
                Math.round(marqueeWidth / convertRemToPixels(LOGO_WIDTH_IN_REM)) + 1;
            const tempLogos = [...items];
            let indexOfLogos = 0;
            for (let i = 0; i < timesToBeDuplicated; i++) {
                if (indexOfLogos >= items.length) {
                    indexOfLogos = 0;
                }
                tempLogos.push(items[indexOfLogos++]);
            }
            setTempLogos(tempLogos);
        }
    }, [items, marqueeWidth]);

    const convertRemToPixels = (rem) => {
        return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
    };

    const toggleIcon = () => {
        if (iconURL === playIcon) {
            setIconURL(pauseIcon);
            setAccessibilityInfo({
                iconAltText: PAUSE_ICON_ALT_TEXT,
                buttonAriaLabel: PAUSE_ARIA_LABEL,
            });
            marqueeRef.current.classList.remove(styles['animation-stopped']);
        } else {
            setIconURL(playIcon);
            setAccessibilityInfo({
                iconAltText: PLAY_ICON_ALT_TEXT,
                buttonAriaLabel: PLAY_ARIA_LABEL,
            });
            marqueeRef.current.classList.add(styles['animation-stopped']);
        }
    };

    const marqueeItems = tempLogos.map((logo, index) => (
        <li className={cx(styles['marquee-item'])} key={index}>
            <img
                src={logo.fileReference}
                alt={t(logo.altText)}
                className={cx(styles['partner-logo'])}
            />
        </li>
    ));

    const marqueeContent = (
        <ul
            className={cx(
                styles['marquee-content'],
                styles[`marquee-animation-${totalNumberOfLogos}`]
            )}
        >
            {marqueeItems}
        </ul>
    );

    return (
        <div className={cx(styles.partners)}>
            <div className={cx(styles['display-section'])}>
                <div className={cx(styles['play-pause'])}>
                    <button
                        onClick={toggleIcon}
                        className={styles['play-pause-button']}
                        aria-label={accessibilityInfo.buttonAriaLabel}
                    >
                        <SwitchTransition>
                            <CSSTransition
                                key={iconURL}
                                addEndListener={(node, done) =>
                                    node.addEventListener('transitionend', done, false)
                                }
                                classNames={{
                                    enter: styles['fade-enter'],
                                    enterActive: styles['fade-enter-active'],
                                    exit: styles['fade-exit'],
                                    exitActive: styles['fade-exit-active'],
                                }}
                            >
                                <Icon
                                    url={iconURL}
                                    size="small"
                                    altText={accessibilityInfo.iconAltText}
                                    className={cx(styles['icon'])}
                                    embedSVG={true}
                                />
                            </CSSTransition>
                        </SwitchTransition>
                    </button>
                </div>
                <div className={cx(styles['marquee'])} ref={marqueeRef}>
                    {marqueeContent}
                </div>
            </div>
        </div>
    );
};

Partners.displayName = 'Partners';

Partners.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            fileReference: PropTypes.string.isRequired,
            altText: PropTypes.string.isRequired,
        })
    ),
};

Partners.defaultProps = {
    items: [],
};

export default Partners;
