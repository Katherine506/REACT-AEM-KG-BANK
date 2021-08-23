import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { LinkBase, Text, Theme } from '../index';
import styles from './Footer.module.scss';
import cx from 'classnames';
import { KEYS, LINK_TYPES, LIGHT_THEME } from '../../lib/constants';

const Footer = (props) => {
    const { children, legalText, lowerText, secondaryNavigationLinks, socialMediaLinks } = props;
    const primaryLinksNavRef = useRef();

    // This effect is used to attach keyboard event listeners to all primary navigation links
    useEffect(() => {
        const navColumns = primaryLinksNavRef.current.getElementsByClassName('nav-menu-column');
        const primaryLinks = primaryLinksNavRef.current.getElementsByClassName('nav-menu-link');

        for (let i = 0; i < primaryLinks.length; i++) {
            primaryLinks[i].addEventListener('keydown', (event) => {
                const navColumn = primaryLinks[i].closest('.nav-menu-column');
                const navColumnIndex = Array.from(navColumns).indexOf(navColumn);

                // This function is used when the left/right arrow keys are used to navigate
                // between menu links
                const goToAdjacentNavColumn = (adjacentNavColumn) => {
                    // If the link is not in the first or last column, put keyboard focus on the
                    // first link the adjacent column
                    if (adjacentNavColumn) {
                        const firstAdjacentNavColumnLink = adjacentNavColumn.querySelector(
                            '.nav-menu-link'
                        );
                        firstAdjacentNavColumnLink.focus();
                    }
                };

                switch (event.key) {
                    case KEYS.ARROW_UP:
                    case KEYS.UP:
                        // Put keyboard focus on the previous link
                        if (i !== 0) {
                            primaryLinks[i - 1].focus();
                        }
                        break;
                    case KEYS.ARROW_DOWN:
                    case KEYS.DOWN:
                        // Put keyboard focus on the next link
                        if (i !== primaryLinks.length - 1) {
                            primaryLinks[i + 1].focus();
                        }
                        break;
                    case KEYS.ARROW_LEFT:
                    case KEYS.LEFT:
                        const previousNavColumn = navColumns[navColumnIndex - 1];
                        goToAdjacentNavColumn(previousNavColumn);
                        break;
                    case KEYS.ARROW_RIGHT:
                    case KEYS.RIGHT:
                        const nextNavColumn = navColumns[navColumnIndex + 1];
                        goToAdjacentNavColumn(nextNavColumn);
                        break;
                }
            });
        }
    }, []);

    const secondaryNavigationItems = secondaryNavigationLinks
        ? secondaryNavigationLinks.map((link, index) => (
              <li key={index} className={cx(styles['secondary-navigation-item'])}>
                  <LinkBase
                      className={cx(styles['secondary-navigation-link'])}
                      url={link.url}
                      target={link.type}
                  >
                      <span
                          className={cx(styles['secondary-navigation-link-container'])}
                          dangerouslySetInnerHTML={{ __html: link.text }}
                      />
                  </LinkBase>
              </li>
          ))
        : null;

    const socialMediaItems = socialMediaLinks
        ? socialMediaLinks.map((link, index) => (
              <li key={index} className={cx(styles['social-media-navigation-item'])}>
                  <LinkBase
                      altText={link.altText}
                      className={cx(styles['social-media-navigation-link'])}
                      target="external"
                      url={link.url}
                  >
                      <img
                          alt={link.altText}
                          className={cx(styles['social-media-navigation-icon'])}
                          src={link.fileReference}
                      />
                  </LinkBase>
              </li>
          ))
        : null;

    return (
        <Theme theme={LIGHT_THEME}>
            <footer className={cx('footer', styles.root)}>
                <div className={cx(styles['top-container'])}>
                    <nav className={cx(styles.container)}>
                        <section
                            className={cx(styles['primary-links-navigation'])}
                            ref={primaryLinksNavRef}
                        >
                            {children}
                        </section>
                        {socialMediaLinks ? (
                            <section className={cx(styles['social-media-navigation'])}>
                                <ul className={cx(styles['social-media-navigation-list'])}>
                                    {socialMediaItems}
                                </ul>
                            </section>
                        ) : null}
                        {secondaryNavigationLinks ? (
                            <section className={cx(styles['secondary-navigation'])}>
                                <ul className={cx(styles['secondary-navigation-list'])}>
                                    {secondaryNavigationItems}
                                </ul>
                            </section>
                        ) : null}
                    </nav>
                    {lowerText ? (
                        <div
                            className={cx(
                                styles['bottom-text-container'],
                                styles['lower-text-container'],
                                styles['container--skinny']
                            )}
                        >
                            <Text
                                className={cx(styles['bottom-text'])}
                                content={lowerText}
                                size="labels"
                            />
                        </div>
                    ) : null}
                </div>
                {legalText ? (
                    <div
                        className={cx(
                            styles['bottom-text-container'],
                            styles['legal-text-container']
                        )}
                    >
                        <div className={cx(styles['container--skinny'])}>
                            <Text
                                className={cx(styles['bottom-text'])}
                                content={legalText}
                                size="labels"
                            />
                        </div>
                    </div>
                ) : null}
            </footer>
        </Theme>
    );
};

Footer.displayName = 'Footer';

Footer.propTypes = {
    legalText: PropTypes.string,
    lowerText: PropTypes.string,
    secondaryNavigationLinks: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.oneOf(LINK_TYPES).isRequired,
            text: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        })
    ),
    socialMediaLinks: PropTypes.arrayOf(
        PropTypes.shape({
            altText: PropTypes.string.isRequired,
            fileReference: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        })
    ),
};

export default Footer;
