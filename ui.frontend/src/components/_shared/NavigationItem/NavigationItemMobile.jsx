import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Icon, LinkBase } from '../../index';
import styles from './NavigationItemMobile.module.scss';
import cx from 'classnames';
import { KEYS, LINK_TYPES } from '../../../lib/constants';
import HeaderMenuService from '../../../lib/services/headerMenuService';

const NavigationItemMobile = (props) => {
    const { children, text, type, url } = props;
    const [isOpen, setIsOpen] = useState(false);

    const formattedName = text.toLowerCase().replace(/\s/g, '-');
    const headingId = `${formattedName}-heading`;
    const menuId = `${formattedName}-menu`;
    const backButtonRef = useRef();
    const itemRef = useRef();
    const menuRef = useRef();
    const topNavButtonRef = useRef();

    // This function handles keyboard functionality for top-level nav items that have menus
    const handleHeadingKeyDown = (event) => {
        if (event.key === KEYS.ARROW_RIGHT || event.key === KEYS.RIGHT) {
            setIsOpen(true);
        }
    };

    // This function handles keyboard functionality for the "Back to menu" button
    const handleBackButtonKeyDown = (event) => {
        if (event.key === KEYS.ARROW_LEFT || event.key === KEYS.LEFT) {
            setIsOpen(false);
        }
    };

    // This effect is used to attach keyboard listeners to all focusable elements in the sub nav menu
    useEffect(() => {
        const toggleButton = document.querySelector('.nav-menu-toggle-button');

        if (toggleButton && children && (!url || !url.trim())) {
            const subMenuFocusableElements = Array.from(
                itemRef.current.getElementsByClassName('nav-sub-menu-focusable')
            );
            subMenuFocusableElements.unshift(toggleButton);

            for (let i = 0; i < subMenuFocusableElements.length; i++) {
                subMenuFocusableElements[i].addEventListener('keydown', (event) => {
                    switch (event.key) {
                        case KEYS.ESCAPE:
                        case KEYS.ESC:
                            setIsOpen(false);
                            break;
                        case KEYS.ARROW_UP:
                        case KEYS.UP:
                            if (i !== 0) {
                                subMenuFocusableElements[i - 1].focus();
                            }
                            break;
                        case KEYS.ARROW_DOWN:
                        case KEYS.DOWN:
                            if (i !== 0 && i !== subMenuFocusableElements.length - 1) {
                                subMenuFocusableElements[i + 1].focus();
                            }
                            break;
                    }
                });
            }
        }
    }, [children, url]);

    // This effect is used to close the sub nav menu when the top nav menu is closed, so that
    // opening the hamburger menu again will reset the nav menu to the top level
    useEffect(() => {
        const subscription = HeaderMenuService.mobileMenuIsOpen.subscribe((isOpen) => {
            if (!isOpen) {
                setIsOpen(false);
            }
        });

        return () => subscription.unsubscribe();
    });

    // This effect is used to hide the top nav menu when the sub nav menu is opened, so that items
    // in the top nav menu are not tabbable
    useEffect(() => {
        const topMenu = document.getElementById('nav-top-menu');
        const menu = menuRef.current;

        if (isOpen) {
            topMenu.style.visibility = 'hidden';
            menu.style.visibility = 'visible';

            const handleTransitionEnd = () => {
                menu.removeEventListener('transitionend', handleTransitionEnd);
                backButtonRef.current.focus();
            };
            menu.addEventListener('transitionend', handleTransitionEnd);
        } else if (topMenu && topMenu.style.visibility === 'hidden') {
            topMenu.style.visibility = 'visible';
            menu.style.visibility = 'hidden';

            const handleTransitionEnd = () => {
                menu.removeEventListener('transitionend', handleTransitionEnd);
                topNavButtonRef.current.focus();
            };
            menu.addEventListener('transitionend', handleTransitionEnd);
        }
    }, [isOpen]);

    return children && (!url || !url.trim()) ? (
        <li className={cx(styles.root)} ref={itemRef}>
            <button
                aria-controls={menuId}
                aria-expanded={isOpen}
                aria-hidden={isOpen}
                aria-label={`Open ${text} menu`}
                className={cx('nav-top-menu-focusable', styles.item, styles['non-link'])}
                id={headingId}
                onClick={() => {
                    setIsOpen(true);
                }}
                onKeyDown={handleHeadingKeyDown}
                ref={topNavButtonRef}
            >
                <div className={cx(styles['item-container'])}>
                    <h2>{text}</h2>
                    <Icon
                        className={cx(styles['indicator-icon'])}
                        size="xx-small"
                        url="/etc.clientlibs/kg-bank/clientlibs/clientlib-base/resources/icons/chevron-right.svg"
                    />
                </div>
            </button>
            <section
                aria-expanded={isOpen}
                aria-hidden={!isOpen}
                aria-labelledby={headingId}
                className={cx(
                    'mobile-nav-menu',
                    'mobile-nav-menu-slide',
                    {
                        'mobile-nav-menu-slide-open': isOpen,
                    },
                    styles.menu
                )}
                id={menuId}
                ref={menuRef}
                style={{ visibility: 'hidden' }}
            >
                <div className={cx(styles['menu-container'])}>
                    <button
                        aria-label={`Close ${text} menu and go back to main navigation menu`}
                        className={cx('nav-sub-menu-focusable', styles['back-button'])}
                        onClick={() => setIsOpen(false)}
                        onKeyDown={handleBackButtonKeyDown}
                        ref={backButtonRef}
                    >
                        <div className={cx(styles['back-button-container'])}>
                            <Icon
                                className={cx(styles['back-icon'])}
                                size="xx-small"
                                url="/etc.clientlibs/kg-bank/clientlibs/clientlib-base/resources/icons/chevron-left.svg"
                            />
                            <span>Back to menu</span>
                        </div>
                    </button>
                    <h2 className={cx(styles['menu-title'])}>{text}</h2>
                    {children}
                </div>
            </section>
        </li>
    ) : (
        <li className={cx(styles.root)}>
            <LinkBase
                altText={text}
                className={cx('nav-top-menu-focusable', styles.item, styles.link)}
                target={type}
                url={url}
            >
                <span className={cx(styles['item-container'])}>{text}</span>
            </LinkBase>
        </li>
    );
};

NavigationItemMobile.displayName = 'NavigationItemMobile';

NavigationItemMobile.propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(LINK_TYPES),
    url: PropTypes.string,
};

NavigationItemMobile.defaultProps = {
    type: 'internal',
};

export default NavigationItemMobile;
