import React, { useEffect } from 'react';
import styles from './ComparisonChart.module.scss';
import cx from 'classnames';
import { Heading, Icon, Card } from '../index';
import Carousel from '../_shared/Carousel';
import { getIconUrl } from '../../lib/helpers/mediaHeplers';

const SELECTORS = {
    TITLES: 'kg-comparison-chart__title',
    CONTAINER: 'kg-comparison-chart__container',
};

const ComparisonChartMobile = (props) => {
    const { headingLevel, children } = props;

    const actualColumns = Object.keys(props).filter((k) => k.includes('columnTitle')).length;
    const cards = [];
    for (let colIndex = 0; colIndex < actualColumns; colIndex++) {
        const cardIcon = props[`columnIcon${colIndex + 1}`];
        const cardTitle = props[`columnTitle${colIndex + 1}`];
        const card = (
            <Card
                horizontalAlignment="center"
                className={cx(styles.card, styles['card'], 'light-theme')}
                key={colIndex}
            >
                {cardIcon && (
                    <Icon
                        url={getIconUrl(cardIcon)}
                        size="large"
                        className={styles['card__icon']}
                    />
                )}
                <Heading
                    headingLevel={headingLevel}
                    alignment="center"
                    overrideStyle="h5"
                    className={cx(styles['card__title'], SELECTORS.TITLES)}
                >
                    <span dangerouslySetInnerHTML={{ __html: cardTitle }} />
                </Heading>
                <div className={`card-body card-${colIndex + 1}`}></div>
            </Card>
        );
        cards.push(card);
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
        <div className={SELECTORS.CONTAINER}>
            <Carousel>{cards}</Carousel>
            {children}
        </div>
    );
};

export default ComparisonChartMobile;
