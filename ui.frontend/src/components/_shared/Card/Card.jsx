import React from 'react';
import PropTypes from 'prop-types';
import styles from './Card.module.scss';
import cx from 'classnames';
import { ALIGNMENT_OPTIONS } from '../../../lib/constants';

const Card = (props) => {
    const { horizontalAlignment, className, children } = props;
    const classes = cx(
        styles.card,
        styles[`card--alignment-${horizontalAlignment}`],
        styles['card--padding'],
        `card--text-align-${horizontalAlignment}`,
        'card light-theme',
        className
    );
    return <div className={classes}>{children}</div>;
};

Card.displayName = 'Card';

Card.propTypes = {
    className: PropTypes.string,
    horizontalAlignment: PropTypes.oneOf(ALIGNMENT_OPTIONS).isRequired,
};

Card.defaultProps = {
    horizontalAlignment: 'left',
};

export default Card;
