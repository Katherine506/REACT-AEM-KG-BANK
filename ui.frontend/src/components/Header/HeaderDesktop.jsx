import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, LinkBase, SearchForm } from '../index';
import styles from './HeaderDesktop.module.scss';
import cx from 'classnames';
import { LINK_TYPES } from '../../lib/constants';
import { t } from '@konrad/reweb-aem';

const HeaderDesktop = (props) => {
    const {
        accountLinkAltText,
        accountLinkText,
        accountLinkUrl,
        ctaLinkAltText,
        ctaLinkText,
        ctaLinkType,
        ctaLinkURL,
        logoLinkUrl,
        fileReference,
        searchResultsUrl,
        searchPlaceholder,
        tertiaryNavigationLinks,
        languageToggleLink,
        phoneNumber,
        navItems,
    } = props;

    const [isSearchMenuOpen, setIsSearchMenuOpen] = useState(false);
    const searchMenuRef = useRef();
    const searchMenuContainerRef = useRef();

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

    const toggleSearchMenu = () => {
        setIsSearchMenuOpen(!isSearchMenuOpen);
    };

    // This effect is used to put keyboard focus on the input field when the search menu is opened
    // and the entry transition animation is done
    useEffect(() => {
        if (isSearchMenuOpen) {
            const searchMenuContainer = searchMenuContainerRef.current;

            const handleTransitionEnd = () => {
                searchMenuContainer.removeEventListener('transitionend', handleTransitionEnd);
                searchMenuContainer.querySelector('input').focus();
            };
            searchMenuContainer.addEventListener('transitionend', handleTransitionEnd);
        }
    }, [isSearchMenuOpen]);

    // This effect is used to close the search menu if the user clicks anywhere outside it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isSearchMenuOpen &&
                searchMenuRef.current &&
                !searchMenuRef.current.contains(event.target)
            ) {
                setIsSearchMenuOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => document.removeEventListener('click', handleClickOutside);
    });

    const tertiaryNavigationItems = allTertiaryNavigationLinks.map((link) => (
        <li key={link.text} className={cx(styles['tertiary-navigation-item'])}>
            <LinkBase
                altText={link.text}
                className={cx(styles['tertiary-navigation-link'])}
                target={link.type}
                url={link.url}
            >
                {link.text}
            </LinkBase>
        </li>
    ));

    return (
        <header className={cx('header', 'header-desktop', styles.root)}>
            <nav role="navigation">
                <section className={cx(styles['tertiary-navigation'])}>
                    <div className={cx(styles['tertiary-navigation-container'])}>
                        <ul className={cx(styles['tertiary-navigation-list'])}>
                            {tertiaryNavigationItems}
                            <li className={cx(styles['tertiary-navigation-item'])}>
                                {phoneNumber}
                            </li>
                        </ul>
                    </div>
                </section>
                <section className={cx('light-theme', styles['primary-navigation'])}>
                    <div className={cx(styles['primary-navigation-container'])}>
                        <div className={cx(styles['primary-navigation-subcontainer'])}>
                            <LinkBase
                                altText={t('Go to KG Bank home page')}
                                className={cx(styles['logo-link'])}
                                target="internal"
                                url={logoLinkUrl}
                            >
                                <img
                                    alt={t('KG Bank Logo')}
                                    className={cx(styles.logo)}
                                    src={fileReference}
                                />
                            </LinkBase>
                            {/*<ul className={cx(styles['primary-navigation-list'])}>{navItems}</ul>*/}
                            <div className={cx(styles['primary-navigation-list'])}>{navItems}</div>
                        </div>
                        <div
                            className={cx(
                                styles['primary-navigation-subcontainer'],
                                styles['primary-navigation-subcontainer--right']
                            )}
                        >
                            <div>
                                <button
                                    aria-label={
                                        isSearchMenuOpen ? 'Close search menu' : 'Open search menu'
                                    }
                                    className={cx(styles['search-button'])}
                                    onClick={toggleSearchMenu}
                                >
                                    <Icon
                                        className={cx(styles['search-icon'])}
                                        url="/etc.clientlibs/kg-bank/clientlibs/clientlib-base/resources/icons/search.svg"
                                        embedSVG={true}
                                    />
                                </button>
                                <section
                                    className={cx(
                                        { [styles['search-menu-open']]: isSearchMenuOpen },
                                        styles['search-menu']
                                    )}
                                    ref={searchMenuRef}
                                >
                                    <div
                                        className={cx(
                                            {
                                                [styles[
                                                    'search-menu-container-open'
                                                ]]: isSearchMenuOpen,
                                            },
                                            styles['search-menu-container']
                                        )}
                                        ref={searchMenuContainerRef}
                                    >
                                        <SearchForm
                                            resultsPath={searchResultsUrl}
                                            searchPlaceholder={searchPlaceholder}
                                        />
                                    </div>
                                </section>
                            </div>
                            <LinkBase
                                altText={accountLinkAltText || undefined}
                                className={cx(styles['primary-navigation-link'])}
                                target="external"
                                url={accountLinkUrl}
                            >
                                {accountLinkText}
                            </LinkBase>
                            <Button
                                altText={ctaLinkAltText || undefined}
                                buttonStyle="general"
                                className={cx(styles.cta)}
                                linkText={ctaLinkText}
                                linkUrl={ctaLinkURL}
                                linkType={ctaLinkType}
                            />
                        </div>
                    </div>
                </section>
            </nav>
        </header>
    );
};

HeaderDesktop.displayName = 'HeaderDesktop';

HeaderDesktop.propTypes = {
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

HeaderDesktop.defaultProps = {
    accountLinkText: 'My Account',
    tertiaryNavigationLinks: [],
    logoLinkUrl: '/',
    fileReference:
        '/etc.clientlibs/kg-bank/clientlibs/clientlib-base/resources/logos/KG Bank-logo-light.svg',
};

export default HeaderDesktop;
