import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';

import LinkBase from '../_shared/Link/LinkBase';
import cx from 'classnames';
import styles from './SecondaryNavigation.module.scss';
import headerMenuService from '../../lib/services/headerMenuService';

const SecondaryNavigation = () => {
    const [links, setLinks] = useState([]);
    const secondaryNavRef = useRef(null);

    useEffect(() => {
        const subscription = headerMenuService.getNavigationLinksSubject().subscribe(setLinks);
        return () => subscription.unsubscribe();
    }, []);
    useEffect(() => {
        let activeTab = document.getElementsByClassName(styles['active'])[0];
        if (activeTab) {
            activeTab.scrollIntoView();
        }
    }, [links]);

    const secondaryNavItems = links.map((link) => (
        <li
            key={link.text}
            className={cx(styles['link-item'], link.selected ? styles['active'] : '')}
        >
            <LinkBase
                altText={link.text}
                className={cx(styles.link)}
                target={link.type}
                url={link.url}
            >
                <span className={cx(styles['link-text-wrapper'])}>{link.text}</span>
            </LinkBase>
        </li>
    ));
    return (
        <ul className={cx(styles['secondary-nav-container'])} ref={secondaryNavRef}>
            {secondaryNavItems}
        </ul>
    );
};

SecondaryNavigation.displayName = 'SecondaryNavigation';

export default SecondaryNavigation;
