import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { LINK_TYPES } from '../../lib/constants';
import LinkBase from '../_shared/Link/LinkBase';
import styles from './List.module.scss';

const List = (props) => {
    const { items } = props;

    const single = items.length === 1;
    const ListEl = single ? 'div' : 'ul';
    const ListItemEl = single ? 'div' : 'li';

    const listItemRows = items.map((item) =>
        item.linkURL ? (
            <ListItemEl className={cx(styles['list-item'], styles['link'])} key={item.linkText}>
                <LinkBase
                    url={item.linkURL}
                    target={item.linkType}
                    className={cx(styles['anchor'])}
                >
                    <span className={cx(styles['link-text-wrapper'])}>
                        <span className={styles['text-content']}>
                            {item.linkText}
                            {item.linkType === 'external' ? (
                                <span className={cx(styles['external-link-icon'])}></span>
                            ) : null}
                        </span>
                        <span className={cx(styles['arrow-right'])}></span>
                    </span>
                </LinkBase>
            </ListItemEl>
        ) : (
            <ListItemEl
                className={cx(styles['list-item'], styles['plain-text'])}
                key={item.linkText}
            >
                {item.linkText}
            </ListItemEl>
        )
    );
    return (
        <ListEl className={cx(styles['list-container'], 'defines-bottom-margin')}>
            {listItemRows}
        </ListEl>
    );
};

List.displayName = 'List';

List.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            linkText: PropTypes.string.isRequired,
            linkURL: PropTypes.string,
            linkType: PropTypes.oneOf(LINK_TYPES),
        })
    ),
};

List.defaultProps = {
    items: [],
};

export default List;
