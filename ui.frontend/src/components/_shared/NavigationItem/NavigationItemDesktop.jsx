import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Icon, LinkBase } from '../../index';
import styles from './NavigationItemDesktop.module.scss';
import cx from 'classnames';
import { KEYS, LINK_TYPES } from '../../../lib/constants';
import HeaderMenuService from '../../../lib/services/headerMenuService';

const NavigationItemDesktop = (props) => {
    const { children, text, type, url } = props;
    const [isOpen, setIsOpen] = useState(false);

    const formattedName = text.toLowerCase().replace(/\s/g, '-');
    const headingId = `${formattedName}-heading`;
    const menuId = `${formattedName}-menu`;
    const itemRef = useRef();
    const headingRef = useRef();
    const menuContainerRef = useRef();
    const whichMenuIsOpen = useRef();

    let openMenuTimer;
    let closeMenuTimer;

    const openMenu = () => {
        if (isOpen) {
            // For unintended mouse leaving/re-entering. Stops the menu from closing
            clearTimeout(closeMenuTimer);
        } else if (whichMenuIsOpen.current) {
            // If another menu is open, wait 300ms then close that menu and open this menu
            openMenuTimer = setTimeout(() => {
                HeaderMenuService.setOpenMenu(formattedName);
            }, 300);
        } else {
            // If no menu is open, open this menu immediately
            HeaderMenuService.setOpenMenu(formattedName);
        }
    };

    const closeMenu = (event) => {
        const target = event.toElement || event.relatedTarget; // The element that the mouse just entered
        if (
            isOpen &&
            // Catch for reweb child that was throwing onmouseleave despite being a child
            // If the target is not a node...
            (!(target instanceof Node) ||
                // ... or if the target IS a node, but it's not part of the nav item...
                !itemRef.current.contains(target))
        ) {
            // ...then wait 300ms and close the menu
            closeMenuTimer = setTimeout(() => {
                HeaderMenuService.setOpenMenu(null);
            }, 300);
        } else {
            // For unintended mouse entering/leaving. Stops the menu from opening
            clearTimeout(openMenuTimer);
        }
    };

    // This function handles keyboard functionality for headings (i.e. the focusable top-level nav items)
    const handleHeadingKeyDown = (event) => {
        const allHeadings = document.getElementsByClassName('nav-heading');
        const heading = event.target;
        const headingIndex = Array.from(allHeadings).indexOf(heading);
        const previousHeading = allHeadings[headingIndex - 1];
        const nextHeading = allHeadings[headingIndex + 1];

        // This function is used when the left/right arrow keys are used to navigate between nav items
        const goToAdjacentHeading = (adjacentHeading) => {
            if (adjacentHeading) {
                // If an adjacent nav item exists, put keyboard focus on it
                adjacentHeading.focus();
            }

            if (isOpen) {
                if (adjacentHeading && adjacentHeading.classList.contains('nav-menu-heading')) {
                    // If the adjacent nav item has a menu, close this menu then open that menu
                    const adjacentMenuFormattedName = adjacentHeading.id.substring(
                        0,
                        adjacentHeading.id.length - 8
                    );
                    HeaderMenuService.setOpenMenu(adjacentMenuFormattedName);
                } else if (adjacentHeading) {
                    // If the adjacent nav item has no menu (i.e. is just a link), close this menu
                    HeaderMenuService.setOpenMenu(null);
                }
            }
        };

        // This function is used when the up or shift+tab keys are used on a nav item
        const handleUpOrShiftTab = () => {
            if (isOpen) {
                if (previousHeading && previousHeading.classList.contains('nav-menu-heading')) {
                    // If the previous nav item has a menu, close this menu then open that menu.
                    // Then put keyboard focus on the last link in that menu
                    const previousMenuFormattedName = previousHeading.id.substring(
                        0,
                        previousHeading.id.length - 8
                    );
                    HeaderMenuService.setOpenMenu(previousMenuFormattedName);

                    const columns = previousHeading.parentNode.querySelectorAll('.nav-menu-column');
                    const lastLink = columns[columns.length - 1].querySelector('li:last-child a');

                    const handleTransitionEnd = () => {
                        previousHeading.parentNode.removeEventListener(
                            'transitionend',
                            handleTransitionEnd
                        );

                        lastLink.focus();
                    };
                    previousHeading.parentNode.addEventListener(
                        'transitionend',
                        handleTransitionEnd
                    );
                } else {
                    // If the previous nav item has no menu (i.e. is just a link), close this menu
                    HeaderMenuService.setOpenMenu(null);
                }
            }
        };

        switch (event.key) {
            case KEYS.ARROW_LEFT:
            case KEYS.LEFT:
                event.preventDefault();
                goToAdjacentHeading(previousHeading);
                break;
            case KEYS.ARROW_RIGHT:
            case KEYS.RIGHT:
                event.preventDefault();
                goToAdjacentHeading(nextHeading);
                break;
        }

        if (children && (!url || !url.trim())) {
            switch (event.key) {
                case KEYS.ENTER:
                case KEYS.SPACE:
                case KEYS.SPACEBAR:
                    // Toggle between opening/closing the menu
                    HeaderMenuService.setOpenMenu(isOpen ? null : formattedName);
                    break;
                case KEYS.ESCAPE:
                case KEYS.ESC:
                    if (isOpen) {
                        // If the menu is open, close it
                        HeaderMenuService.setOpenMenu(null);
                    }
                    break;
                case KEYS.TAB:
                    if (event.shiftKey) {
                        handleUpOrShiftTab();
                    }
                    break;
                case KEYS.ARROW_UP:
                case KEYS.UP:
                    event.preventDefault();
                    handleUpOrShiftTab();
                    break;
                case KEYS.ARROW_DOWN:
                case KEYS.DOWN:
                    event.preventDefault();
                    const item = heading.closest('.nav-item-root');
                    const firstColumn = item.querySelector('.nav-menu-column');
                    const firstLink = item.querySelector('.nav-menu-link');

                    if (isOpen) {
                        // If the menu is already open, focus on the first link in the menu
                        firstLink.focus();
                    } else {
                        // If the menu is closed, open it
                        HeaderMenuService.setOpenMenu(formattedName);

                        // After the entry transition animation is done, focus on the first link in
                        // the menu
                        const handleTransitionEnd = () => {
                            firstColumn.removeEventListener('transitionend', handleTransitionEnd);
                            firstLink.focus();
                        };
                        firstColumn.addEventListener('transitionend', handleTransitionEnd);
                    }

                    break;
            }
        }
    };

    // This effect is used to attach keyboard event listeners to all links in menus
    useEffect(() => {
        if (children && (!url || !url.trim())) {
            setTimeout(() => {
                const allSubItems = document.getElementsByClassName('nav-sub-item');
                const menu = allSubItems[menuId];
                const menuIndex = Array.from(allSubItems).indexOf(menu);

                const menuColumns = menu ? menu.getElementsByClassName('nav-menu-column') : [];
                const menuLinks = menu ? menu.getElementsByClassName('nav-menu-link') : [];

                const nextItem =
                    menuIndex === allSubItems.length - 1 ? null : allSubItems[menuIndex + 1];
                const nextMenu =
                    nextItem && nextItem.classList.contains('nav-menu') ? nextItem : null;
                const nextMenuFormattedName = nextMenu
                    ? nextMenu.id.substring(0, nextMenu.id.length - 5)
                    : null;

                for (let i = 0; i < menuLinks.length; i++) {
                    menuLinks[i].addEventListener('keydown', (event) => {
                        const menuColumn = menuLinks[i].closest('.nav-menu-column');
                        const menuColumnIndex = Array.from(menuColumns).indexOf(menuColumn);

                        // This function is used when the left/right arrow keys are used to navigate between menu links
                        const goToAdjacentMenuColumn = (adjacentMenuColumn) => {
                            if (adjacentMenuColumn) {
                                // If the menu link is not in the first or last column, put keyboard
                                // focus on the first link in the adjacent column
                                const firstAdjacentMenuColumnLink = adjacentMenuColumn.querySelector(
                                    '.nav-menu-link'
                                );
                                firstAdjacentMenuColumnLink.focus();
                            } else {
                                // If the menu link is in the first or last column, put keyboard focus on the nav item
                                headingRef.current.focus();
                            }
                        };

                        switch (event.key) {
                            case KEYS.ESCAPE:
                            case KEYS.ESC:
                                // Close the menu and put keyboard focus on the nav item
                                HeaderMenuService.setOpenMenu(null);
                                headingRef.current.focus();
                                break;
                            case KEYS.TAB:
                                if (i === menuLinks.length - 1 && !event.shiftKey) {
                                    // If this is the last link in the menu, close this menu.
                                    // If the next nav item has a menu, open that menu
                                    HeaderMenuService.setOpenMenu(
                                        nextMenu ? nextMenuFormattedName : null
                                    );
                                }
                                break;
                            case KEYS.ARROW_UP:
                            case KEYS.UP:
                                event.preventDefault();
                                if (i === 0) {
                                    // If this is the first link in the menu, put keyboard focus on the nav item
                                    headingRef.current.focus();
                                } else {
                                    // Put keyboard focus on the previous menu link
                                    menuLinks[i - 1].focus();
                                }
                                break;
                            case KEYS.ARROW_DOWN:
                            case KEYS.DOWN:
                                event.preventDefault();
                                if (i !== menuLinks.length - 1) {
                                    // Put keyboard focus on the next menu link
                                    menuLinks[i + 1].focus();
                                } else if (i === menuLinks.length - 1 && nextMenu) {
                                    // If this is the last link in the menu, and the next nav item has
                                    // a menu, then open that menu and put keyboard focus on the nav item
                                    HeaderMenuService.setOpenMenu(nextMenuFormattedName);
                                    nextMenu.parentNode.querySelector('.nav-menu-heading').focus();
                                }
                                break;
                            case KEYS.ARROW_LEFT:
                            case KEYS.LEFT:
                                event.preventDefault();
                                const previousMenuColumn = menuColumns[menuColumnIndex - 1];
                                goToAdjacentMenuColumn(previousMenuColumn);
                                break;
                            case KEYS.ARROW_RIGHT:
                            case KEYS.RIGHT:
                                event.preventDefault();
                                const nextMenuColumn = menuColumns[menuColumnIndex + 1];
                                goToAdjacentMenuColumn(nextMenuColumn);
                                break;
                        }
                    });
                }
            });
        }
    }, [children, menuId, url]);

    // This effect is used to open/close the nav menu based on the value of the subscribed observable
    useEffect(() => {
        const subscription = HeaderMenuService.whichMenuIsOpen.subscribe((menuName) => {
            if (children && (!url || !url.trim())) {
                whichMenuIsOpen.current = menuName;

                if (menuName === formattedName) {
                    setIsOpen(true);
                } else {
                    setIsOpen(false);
                }
            }
        });

        return () => subscription.unsubscribe();
    });

    // This effect is used to immediately close a nav menu if the user clicks anywhere outside it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && !itemRef.current.contains(event.target)) {
                clearTimeout(closeMenuTimer);
                HeaderMenuService.setOpenMenu(null);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    });

    // This effect is used to toggle a class that triggers a CSS transition for the nav columns
    // when the corresponding menu is toggled
    useEffect(() => {
        if (children && (!url || !url.trim())) {
            const menuColumns = menuContainerRef.current.getElementsByClassName('nav-menu-column');
            const menuColumnOpenClassName = 'nav-menu-column-open';

            for (let i = 0; i < menuColumns.length; i++) {
                if (isOpen) {
                    menuColumns[i].classList.add(menuColumnOpenClassName);
                } else {
                    menuColumns[i].classList.remove(menuColumnOpenClassName);
                }
            }
        }
    }, [isOpen]);

    return children && (!url || !url.trim()) ? (
        // Render meganav if children exist and there is no URL for the top level item
        <div
            className={cx('nav-item-root', styles['root'])}
            onMouseEnter={openMenu}
            onMouseLeave={closeMenu}
            ref={itemRef}
        >
            <button
                aria-controls={menuId}
                aria-expanded={isOpen}
                className={cx('nav-heading', 'nav-menu-heading', styles.item, styles['non-link'])}
                id={headingId}
                onKeyDown={handleHeadingKeyDown}
                ref={headingRef}
            >
                <div className={cx(styles['item-container'])}>
                    <h2>{text}</h2>
                    <Icon
                        className={cx(styles['indicator-icon'])}
                        url={`/etc.clientlibs/kg-bank/clientlibs/clientlib-base/resources/icons/chevron-${
                            isOpen ? 'up' : 'down'
                        }.svg`}
                    />
                </div>
            </button>
            <section
                aria-expanded={isOpen}
                aria-hidden={!isOpen}
                aria-labelledby={headingId}
                className={cx(
                    'nav-sub-item',
                    'nav-menu',
                    { 'desktop-menu-open': isOpen },
                    styles.menu
                )}
                id={menuId}
            >
                <div className={cx(styles['menu-container'])} ref={menuContainerRef}>
                    {children}
                </div>
            </section>
        </div>
    ) : (
        // Otherwise, just render the top level URL.
        <div className={styles['root']}>
            <LinkBase
                altText={text}
                className={cx('nav-heading', 'nav-sub-item', styles.item, styles.link)}
                onKeyDown={handleHeadingKeyDown}
                target={type}
                url={url}
            >
                <span className={cx(styles['item-container'])}>{text}</span>
            </LinkBase>
        </div>
    );
};

NavigationItemDesktop.displayName = 'NavigationItemDesktop';

NavigationItemDesktop.propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(LINK_TYPES),
    url: PropTypes.string,
};

NavigationItemDesktop.defaultProps = {
    type: 'internal',
};

export default NavigationItemDesktop;
