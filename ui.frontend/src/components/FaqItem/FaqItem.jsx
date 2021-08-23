import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './FaqItem.module.scss';
import { Heading } from '../index';
import Text from '../_shared/Text';

const FaqItem = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef();
    const itemRef = useRef();
    const SELECTORS = {
        CONTAINER: '.kg-faq-container__content',
        ITEM: '.kg-faq-item__btn',
    };

    const { answer, question, headingLevel } = props;

    const toggleAnswer = () => setIsOpen(!isOpen);

    const answerState = isOpen ? 'open' : 'closed';
    const itemName = question && question.trim().split(' ').join('-');
    const triggerId = `trigger-${itemName}`;
    const contentId = `content-${itemName}`;

    const contentElement = contentRef.current;

    const contentStyle = {
        height: isOpen && contentElement ? contentElement.clientHeight + 'px' : '0px',
    };

    const getFAQItems = () => {
        const itemElement = itemRef.current;
        const currentFAQContainer = itemElement.closest(SELECTORS.CONTAINER);
        return currentFAQContainer.querySelectorAll(SELECTORS.ITEM);
    };

    const setFocusToFirstFAQ = () => {
        const faqList = getFAQItems();
        const firstItem = faqList && faqList[0];
        firstItem.focus();
    };
    const setFocusToLastFAQ = () => {
        const faqList = getFAQItems();
        const lastItem = faqList && faqList[faqList.length - 1];
        lastItem.focus();
    };

    const keyHandling = (event) => {
        switch (event.key) {
            case 'Home':
                setFocusToFirstFAQ();
                break;
            case 'End':
                setFocusToLastFAQ();
                break;
            default:
                break;
        }
    };

    return (
        <div className={cx(styles.root, 'kg-faq-item__container')}>
            <button
                ref={itemRef}
                id={triggerId}
                aria-controls={contentId}
                className={cx(styles.question, 'kg-faq-item__btn')}
                onClick={toggleAnswer}
                aria-expanded={isOpen}
                onKeyDown={keyHandling}
            >
                <Heading text={question} headingLevel={headingLevel} className={styles.title} />
                <span
                    className={cx(
                        styles['question__icon'],
                        styles[`question__icon--${answerState}`]
                    )}
                    aria-hidden={true}
                ></span>
            </button>
            <div
                id={contentId}
                role="region"
                aria-hidden={!isOpen}
                aria-labelledby={triggerId}
                className={cx(styles.answer, styles[`answer--${answerState}`])}
                style={contentStyle}
            >
                <div ref={contentRef}>
                    <Text content={answer} size="body" />
                </div>
            </div>
        </div>
    );
};

FaqItem.displayName = 'FaqItem';

FaqItem.defaultProps = {
    question: 'question',
    answer: 'answer',
};

FaqItem.propTypes = {
    question: PropTypes.string,
    answer: PropTypes.string,
};

export default FaqItem;
