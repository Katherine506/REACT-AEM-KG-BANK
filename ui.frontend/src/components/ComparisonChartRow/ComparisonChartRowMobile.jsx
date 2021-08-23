import React, { useEffect, useRef } from 'react';
import { render } from 'react-dom';
import styles from './ComparisonChartRow.module.scss';
import cx from 'classnames';
import { Heading, Text } from '../index';

const SELECTORS = {
    CONTAINER: 'kg-comparison-chart__container',
};

const ComparisonChartRowMobile = (props) => {
    const rowRef = useRef();
    const { rowTitle } = props;
    const actualColumns = Object.keys(props).filter((k) => k.includes('columnContent')).length;
    const cardContents = [];
    for (let cardIndex = 0; cardIndex < actualColumns; cardIndex++) {
        const rowText = props[`columnContent${cardIndex + 1}`];
        const cardRow = (
            <div className={cx(styles['card-row'], `card-${cardIndex + 1}`)} key={cardIndex}>
                <Text size="small" content={rowTitle} className={styles['column__title']} />
                <Text size="large" content={rowText} className={styles['column__content']} />
            </div>
        );
        cardContents.push({
            id: `card-${cardIndex + 1}`,
            cardRow,
        });
    }

    useEffect(() => {
        const rowElement = rowRef.current;
        if (rowElement) {
            const container = rowElement.closest(`.${SELECTORS.CONTAINER}`);
            if (container) {
                cardContents.forEach((content) => {
                    const cardBody = container.querySelector(`.card-body.${content.id}`);
                    const cardBodyRow = document.createElement('div');
                    cardBody.appendChild(cardBodyRow);
                    render(content.cardRow, cardBodyRow);
                });
            }
        }
    }, []);

    return <div ref={rowRef}></div>;
};

export default ComparisonChartRowMobile;
