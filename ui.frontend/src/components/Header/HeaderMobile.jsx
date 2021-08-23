import React, { useEffect, useRef, useState } from 'react';
import FocusLock from 'react-focus-lock';
import PropTypes from 'prop-types';
import { Icon, LinkBase } from '../index';
import styles from './HeaderMobile.module.scss';
import cx from 'classnames';
import { KEYS, LINK_TYPES } from '../../lib/constants';
import { linkService } from '@konrad/reweb-aem';
import { throttle } from '../../lib/helpers/throttle';
import HeaderMenuService from '../../lib/services/headerMenuService';
import { t } from '@konrad/reweb-aem';
import URL from 'url-parse';

const HeaderMobile = (props) => {
    const {
        accountLinkAltText,
        accountLinkText,
        accountLinkUrl,
        phoneLinkText,
        phoneLinkUrl,
        ctaLinkAltText,
        ctaLinkText,
        ctaLinkType,
        ctaLinkUrl,
        logoLinkUrl,
        fileReference,
        searchResultsUrl,
        searchPlaceholder,
        languageToggleLink,
        tertiaryNavigationLinks,
        phoneNumber,
        navItems,
        wcChildren,
    } = props;
    const [isOpen, setIsOpen] = useState(false);
    const headerRef = useRef();
    const topMenuRef = useRef();
    const searchFormInputRef = useRef();
    const toggleButtonRef = useRef();

    const currentUrl = new URL(window.location.href, '', true);
    const q = currentUrl.query ? currentUrl.query['q'] : '';

    let allTertiaryNavigationLinks = tertiaryNavigationLinks;
    if (languageToggleLink) {
        allTertiaryNavigationLinks = [
            {
                type: 'internal',
                text: languageToggleLink.text,
                url: languageToggleLink.url,
            },
        ].concat(tertiaryNavigationLinks);
    }

    // This function handles keyboard functionality for the hamburger/close icon
    const handleToggleKeyDown = (event) => {
        if (event.key === KEYS.ARROW_DOWN || event.key === KEYS.DOWN) {
            if (!isOpen) {
                HeaderMenuService.setMobileMenuOpen(true);
                setTimeout(() => {
                    searchFormInputRef.current.focus();
                }, 0);
            } else {
                searchFormInputRef.current.focus();
            }
        } else if ((event.key === KEYS.ARROW_UP || event.key === KEYS.UP) && isOpen) {
            HeaderMenuService.setMobileMenuOpen(false);
        }
    };

    useEffect(() => {
        // Since the header is wrapped in a FocusLock component, select that wrapper element and
        // make it sticky so that the header is always at the top of the page
        const headerFocusLockWrapper = headerRef.current.closest('div');

        // headerFocusLockWrapper.style.position = 'sticky';
        // headerFocusLockWrapper.style.top = '0';
        // headerFocusLockWrapper.style.zIndex = zIndexVariables['z-index-header'];

        // Attach keyboard listeners to all focusable elements in the top nav menu
        const topMenuFocusableElements = document.getElementsByClassName('nav-top-menu-focusable');
        for (let i = 0; i < topMenuFocusableElements.length; i++) {
            topMenuFocusableElements[i].addEventListener('keydown', (event) => {
                switch (event.key) {
                    case KEYS.ESCAPE:
                    case KEYS.ESC:
                        HeaderMenuService.setMobileMenuOpen(false);
                        toggleButtonRef.current.focus();
                        break;
                    case KEYS.ARROW_UP:
                    case KEYS.UP:
                        if (i !== 0) {
                            topMenuFocusableElements[i - 1].focus();
                        }
                        break;
                    case KEYS.ARROW_DOWN:
                    case KEYS.DOWN:
                        if (i !== 0 && i !== topMenuFocusableElements.length - 1) {
                            topMenuFocusableElements[i + 1].focus();
                        }
                        break;
                }
            });
        }

        // Close the nav menu when the component is about to unmount (specifically so that when
        // the browser is resized to desktop and then back to mobile, the nav menu isn't still open)
        return () => HeaderMenuService.setMobileMenuOpen(false);
    }, []);

    // This effect is used to open/close the nav menu based on the value of the subscribed observable
    useEffect(() => {
        const subscription = HeaderMenuService.mobileMenuIsOpen.subscribe((isOpen) => {
            if (isOpen) {
                setIsOpen(true);
                document.body.style.overflow = 'hidden';
            } else {
                setIsOpen(false);
                document.body.style.overflow = 'visible';
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    });

    // Visibility toggle has to be done using inline styling (rather than a class toggle) because
    // it is also manipulated in the NavigationItemMobile component using inline styling
    useEffect(() => {
        if (isOpen) {
            topMenuRef.current.style.visibility = 'visible';
        } else {
            topMenuRef.current.style.visibility = 'hidden';
        }
    }, [isOpen]);

    // There is an issue where the bottom of the slide-out navigation is covered by the bottom
    // navigation bar in mobile browsers. This happens because viewport height includes the
    // height of the bottom nav bar (even though that area isn't always visible). To fix this, we
    // avoid the use of the vh unit in CSS and instead calculate the actual viewport height unit
    // value (i.e. 1% of the visible viewport height) and store it in a CSS variable:
    useEffect(() => {
        const getViewportHeightUnit = () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        getViewportHeightUnit();
        const throttledGetVhUnit = throttle(getViewportHeightUnit, 100);

        window.addEventListener('resize', throttledGetVhUnit);

        return () => {
            window.removeEventListener('resize', throttledGetVhUnit);
        };
    }, []);

    const tertiaryNavigationItems = allTertiaryNavigationLinks.map((link) => (
        <li key={link.text} className={cx(styles['tertiary-navigation-item'])}>
            <LinkBase
                altText={link.text}
                className={cx('nav-top-menu-focusable', styles['tertiary-navigation-link'])}
                target={link.type}
                url={link.url}
            >
                {link.text}
            </LinkBase>
        </li>
    ));

    return (
        <FocusLock disabled={!isOpen}>
            <header className={cx('header', styles.root)} ref={headerRef} id={'header'}>
                <nav className={cx({ 'mobile-nav-open': isOpen })} role="navigation">
                    <div className={cx(styles['navigation-container'])}>
                        <LinkBase
                            altText={t('Go to KG Bank home page')}
                            className={cx(styles['logo-link'])}
                            target="internal"
                            url={logoLinkUrl}
                        >
                            <img
                                alt="KG Bank Logo"
                                className={cx(styles.logo)}
                                src={fileReference}
                            />
                        </LinkBase>
                        <div className={cx(styles['navigation-subcontainer'])}>
                            {phoneNumber}
                            <div className={cx(styles['menu-container'])}>
                                <button
                                    aria-controls="nav-top-menu"
                                    aria-expanded={isOpen}
                                    aria-label="Open main navigation menu"
                                    className={cx(
                                        'nav-top-menu-focusable',
                                        'nav-menu-toggle-button',
                                        { 'nav-menu-toggle-button-open': isOpen },
                                        styles['toggle-button']
                                    )}
                                    id="nav-toggle-button"
                                    onClick={() => HeaderMenuService.setMobileMenuOpen(!isOpen)}
                                    onKeyDown={handleToggleKeyDown}
                                    ref={toggleButtonRef}
                                >
                                    <span />
                                    <span />
                                    <span />
                                    <span />
                                </button>
                                <div
                                    aria-label="Close navigation menu"
                                    className={cx(styles.overlay, {
                                        'mobile-nav-overlay-active': isOpen,
                                    })}
                                    onClick={() => HeaderMenuService.setMobileMenuOpen(false)}
                                />
                                <form
                                    className={cx(
                                        'mobile-nav-menu-slide',
                                        {
                                            'mobile-nav-menu-slide-open': isOpen,
                                        },
                                        styles.form
                                    )}
                                    method="GET"
                                    action={linkService.get(searchResultsUrl)}
                                >
                                    <div className={cx(styles['form-container'])}>
                                        <Icon
                                            className={cx(styles['search-icon'])}
                                            size={'x-small'}
                                            url="/etc.clientlibs/kg-bank/clientlibs/clientlib-base/resources/icons/search.svg"
                                        />
                                        <input
                                            aria-label="Search website"
                                            className={cx(styles['input-field'])}
                                            name="q"
                                            placeholder={searchPlaceholder || t('Search')}
                                            defaultValue={q}
                                            ref={searchFormInputRef}
                                            type="search"
                                        />
                                    </div>
                                </form>
                                <section
                                    aria-expanded={isOpen}
                                    aria-hidden={!isOpen}
                                    aria-labelledby="nav-toggle-button"
                                    className={cx('mobile-nav-menu', 'mobile-nav-menu-slide', {
                                        'mobile-nav-menu-slide-open': isOpen,
                                    })}
                                    id="nav-top-menu"
                                    ref={topMenuRef}
                                >
                                    <div className={cx(styles['top-menu-container'])}>
                                        <div>
                                            <section className={cx(styles['primary-navigation'])}>
                                                <ul>{navItems}</ul>
                                            </section>
                                        </div>
                                        <div>
                                            <section className={cx(styles['tertiary-navigation'])}>
                                                <ul>
                                                    {tertiaryNavigationItems}
                                                    <li
                                                        className={cx(
                                                            styles['tertiary-navigation-item']
                                                        )}
                                                    >
                                                        <LinkBase
                                                            altText={t('Call KG Bank')}
                                                            className={cx(
                                                                'nav-top-menu-focusable',
                                                                styles['tertiary-navigation-link']
                                                            )}
                                                            target="internal"
                                                            url={phoneLinkUrl}
                                                        >
                                                            {phoneLinkText}
                                                        </LinkBase>
                                                    </li>
                                                </ul>
                                            </section>
                                            <LinkBase
                                                altText={accountLinkAltText || undefined}
                                                className={cx(
                                                    'nav-top-menu-focusable',
                                                    styles['top-menu-link'],
                                                    styles['account-link']
                                                )}
                                                target="external"
                                                url={accountLinkUrl}
                                            >
                                                <span
                                                    className={cx(
                                                        styles['top-menu-link-container']
                                                    )}
                                                >
                                                    {accountLinkText}
                                                </span>
                                            </LinkBase>
                                            <LinkBase
                                                altText={ctaLinkAltText || undefined}
                                                className={cx(
                                                    'nav-top-menu-focusable',
                                                    styles['top-menu-link'],
                                                    styles['cta-link']
                                                )}
                                                target={ctaLinkType}
                                                url={ctaLinkUrl}
                                            >
                                                <span
                                                    className={cx(
                                                        styles['top-menu-link-container']
                                                    )}
                                                >
                                                    {ctaLinkText}
                                                </span>
                                            </LinkBase>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </FocusLock>
    );
};

HeaderMobile.displayName = 'HeaderMobile';

HeaderMobile.propTypes = {
    accountLinkAltText: PropTypes.string.isRequired,
    accountLinkText: PropTypes.string.isRequired,
    accountLinkUrl: PropTypes.string.isRequired,
    ctaLinkAltText: PropTypes.string,
    ctaLinkText: PropTypes.string.isRequired,
    ctaLinkType: PropTypes.oneOf(LINK_TYPES).isRequired,
    ctaLinkUrl: PropTypes.string.isRequired,
    fileReference: PropTypes.string,
    logoLinkUrl: PropTypes.string,
    phoneLinkText: PropTypes.string.isRequired,
    phoneLinkUrl: PropTypes.string.isRequired,
    searchResultsUrl: PropTypes.string.isRequired,
    searchPlaceholder: PropTypes.string,
    languageToggleLink: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        })
    ),
    tertiaryNavigationLinks: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.oneOf(LINK_TYPES).isRequired,
            text: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        })
    ),
};

HeaderMobile.defaultProps = {
    accountLinkText: 'My Account',
    tertiaryNavigationLinks: [],
    logoLinkUrl: '/',
    fileReference:
        '/etc.clientlibs/kg-bank/clientlibs/clientlib-base/resources/logos/KG Bank-logo-light.svg',
};

export default HeaderMobile;
