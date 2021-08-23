import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './TimeLineItem.module.scss';
import Heading from '../_shared/Heading';
import Text from '../_shared/Text';
import { HEADING_LEVELS_TIME_LINE } from '../../lib/constants';

const TimeLineItem = (props) => {
    const { title, headingLevel, text } = props;
    return (
        <div className={cx(styles['time-line-item-container'])}>
            <div className={cx(styles['header-container'])}>
                <div className={cx(styles['step-icon-container'])}>
                    <span className={cx(styles['step-icon'])} />
                </div>
                <Heading text={title} headingLevel={headingLevel} overrideStyle="large" />
            </div>
            <Text content={text} size={'body'} className={cx(styles['text-line'])} />
        </div>
    );
};
TimeLineItem.displayName = 'TimelineItem';

TimeLineItem.propTypes = {
    title: PropTypes.string.isRequired,
    headingLevel: PropTypes.oneOf(HEADING_LEVELS_TIME_LINE),
    text: PropTypes.string.isRequired,
};

TimeLineItem.defaultProps = {
    title: '',
    headingLevel: 'h1',
    text: '',
};

export default TimeLineItem;
