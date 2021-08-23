import React, { useEffect, useRef } from 'react';
import styles from './ComparisonChart.module.scss';
import cx from 'classnames';
import { Heading, Icon } from '../index';
import { getIconUrl } from '../../lib/helpers/mediaHeplers';

const SELECTORS = {
    TITLES: 'kg-comparison-chart__title',
};

const ComparisonChartDesktop = (props) => {
    const headerRef = useRef();
    const { title, headingLevel, children } = props;
    const actualColumns = Object.keys(props).filter((k) => k.includes('columnTitle')).length;
    const iconColumns = [<div className={styles['column']} key="title" />];
    const columns = [];
    for (let colIndex = 0; colIndex < actualColumns; colIndex++) {
        const colIcon = props[`columnIcon${colIndex + 1}`];
        const iconColHeading = colIcon ? (
            <div className={styles['column']} key={colIndex}>
                <Icon url={getIconUrl(colIcon)} size="large" className={styles['column__icon']} />
            </div>
        ) : (
            <div className={styles['column']} key={colIndex} />
        );
        iconColumns.push(iconColHeading);

        const colTitle = props[`columnTitle${colIndex + 1}`];
        const colHeading = (
            <div className={styles['column']} key={colIndex} role="columnheader">
                <Heading
                    headingLevel={headingLevel}
                    alignment="center"
                    overrideStyle="h6"
                    className={cx(styles['column__title'], SELECTORS.TITLES)}
                >
                    <span dangerouslySetInnerHTML={{ __html: colTitle }} />
                </Heading>
            </div>
        );
        columns.push(colHeading);
    }

    useEffect(() => {
        const richTextTitles = document.querySelectorAll(`.${SELECTORS.TITLES} p`);
        richTextTitles.forEach((paragraph) => {
            const replacementNode = document.createElement('span');
            replacementNode.innerHTML = paragraph.innerHTML;
            paragraph.parentNode.replaceChild(replacementNode, paragraph);
        });
    }, []);

    return (
        <div
            className={cx(styles.root, styles[`columns--${actualColumns}`], 'light-theme')}
            role="table"
        >
            <div className={styles['icons']}>{iconColumns}</div>
            <div className={styles['header']} ref={headerRef} role="row">
                <div className={styles['column']} role="columnheader">
                    <Heading
                        headingLevel={headingLevel}
                        overrideStyle="h6"
                        alignment="left"
                        className={cx(styles['column__title'], SELECTORS.TITLES)}
                    >
                        <span dangerouslySetInnerHTML={{ __html: title }} />
                    </Heading>
                </div>
                {columns}
            </div>
            {children}
        </div>
    );
};

export default ComparisonChartDesktop;
