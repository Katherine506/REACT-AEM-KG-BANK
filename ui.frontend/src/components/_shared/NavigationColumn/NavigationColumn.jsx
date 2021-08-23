import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { LinkBase } from '../../index';
import styles from './NavigationColumn.module.scss';
import cx from 'classnames';
import { LINK_TYPES } from '../../../lib/constants';
import headerMenuService from '../../../lib/services/headerMenuService';

const NavigationColumn = (props) => {
    const { items, title } = props;
    useEffect(() => {
        items.every((link) => {
            if (window.location.pathname.includes(link.url)) {
                link.selected = true;
                headerMenuService.setNavigationLinks(items);
                return false;
            } else {
                return true;
            }
        });
    }, [items]);

    const menuItems = items.map((link) => (
        <li key={link.text} className={cx(styles.item)}>
            <LinkBase
                className={cx('nav-menu-link', 'nav-sub-menu-focusable', styles.link)}
                target={link.type}
                url={link.url}
            >
                <span className={cx(styles['link-text-wrapper'])}>{link.text}</span>
            </LinkBase>
        </li>
    ));

    return (
        <div className={cx('nav-menu-column', styles.root)}>
            {title ? <h3 className={cx(styles.title)}>{title}</h3> : null}
            <ul>{menuItems}</ul>
        </div>
    );
};

NavigationColumn.displayName = 'NavigationColumn';

NavigationColumn.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string.isRequired,
            type: PropTypes.oneOf(LINK_TYPES).isRequired,
            url: PropTypes.string.isRequired,
        })
    ),
    title: PropTypes.string,
};

export default NavigationColumn;
