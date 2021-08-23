import React from 'react';
import styles from './ComparisonChartRow.module.scss';
import cx from 'classnames';
import { Text } from '../index';

const ComparisonChartRowDesktop = (props) => {
    const { rowTitle } = props;
    const actualColumns = Object.keys(props).filter((k) => k.includes('columnContent')).length;
    const columns = [];
    for (let colIndex = 0; colIndex < actualColumns; colIndex++) {
        const colText = props[`columnContent${colIndex + 1}`];
        const col = (
            <div className={styles['column']} key={colIndex} role="cell">
                <Text size="large" content={colText} className={styles['column__content']} />
            </div>
        );
        columns.push(col);
    }

    return (
        <div className={cx(styles.root, styles[`columns--${actualColumns}`])} role="row">
            <div className={styles['column']} role="rowheader">
                <Text content={rowTitle} size="large" className={styles['column__content']} />
            </div>
            {columns}
        </div>
    );
};

export default ComparisonChartRowDesktop;
