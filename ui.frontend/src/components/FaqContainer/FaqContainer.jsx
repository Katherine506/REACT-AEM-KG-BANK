import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './FaqContainer.module.scss';
import { HEADING_LEVELS } from '../../lib/constants';
import { Heading } from '../index';

const FaqContainer = (props) => {
    const containerRef = useRef();
    const { title, headingLevel, children } = props;

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            const items = container.getElementsByClassName('kg-faq-item__container');
            if (items && items.length) {
                const firstItem = items[0];
                firstItem.classList.add('first');
            }
        }
    }, []);

    return (
        <div className={cx(styles.root, 'light-theme')}>
            {title && (
                <Heading
                    text={title}
                    alignment="left"
                    headingLevel={headingLevel}
                    overrideStyle="h6"
                />
            )}
            <div className="kg-faq-container__content" ref={containerRef}>
                {children}
            </div>
        </div>
    );
};

FaqContainer.displayName = 'FaqContainer';

FaqContainer.propTypes = {
    title: PropTypes.string,
    headingLevel: PropTypes.oneOf(HEADING_LEVELS),
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default FaqContainer;
