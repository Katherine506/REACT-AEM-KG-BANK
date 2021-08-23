import React from 'react';
import PropTypes from 'prop-types';
import styles from './ConnectedCards.module.scss';
import { ALIGNMENT_OPTIONS } from '../../lib/constants';
import Card from '../_shared/Card';

const ConnectedCards = (props) => {
    const { className, children } = props;

    return (
        <div className={styles.root}>
            <Card horizontalAlignment={'center'} className={className}>
                <div className={styles.container}>{children}</div>
            </Card>
        </div>
    );
};

ConnectedCards.displayName = 'ConnectedCards';

ConnectedCards.propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default ConnectedCards;
