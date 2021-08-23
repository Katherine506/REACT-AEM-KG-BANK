import React from 'react';
import PropTypes from 'prop-types';
import styles from './Statistics.module.scss';
import cx from 'classnames';

const Statistics = (props) => {
    const { items } = props;
    const statisticsItems = items.map((item) => {
        return (
            <div className={cx(styles.item)} key={item.statistic}>
                <div className={cx(styles.statistic)}>{item.statistic}</div>
                <div className={cx(styles.subtitle)}>{item.subtitle}</div>
            </div>
        );
    });
    return (
        <div className={cx(styles.wrapper)}>
            <div className={cx(styles.container)}>{statisticsItems}</div>
        </div>
    );
};

Statistics.displayName = 'Statistics';

Statistics.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            statistic: PropTypes.string.isRequired,
            subtitle: PropTypes.string.isRequired,
        })
    ),
};

Statistics.defaultProps = {
    items: [],
};

export default Statistics;
