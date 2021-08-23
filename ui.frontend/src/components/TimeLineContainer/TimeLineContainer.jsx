import React, { useEffect, useState, useRef } from 'react';
import Button from '../_shared/Button';
import styles from './TimeLineContainer.module.scss';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { LINK_TYPES } from '../../lib/constants';
import { t } from '@konrad/reweb-aem';
import useAuthorMode from '../../lib/helpers/useAuthorMode';

const TimeLineContainer = (props) => {
    const { children, altText, linkText, linkUrl, linkType } = props;
    const defaultLinkAltText = `${t('{0} Link', [linkText])}`;
    const [hasChildren, setHasChildren] = useState(false);
    const timeLineContainer = useRef();
    const currentAuthorMode = useAuthorMode();
    const isEditMode = currentAuthorMode === 'edit';
    const shouldDisplayButton = linkText && (hasChildren || isEditMode);

    useEffect(() => {
        const container = timeLineContainer.current;
        if (container) {
            let timeLineItem = timeLineContainer.current.querySelector('.timeline-item');
            if (timeLineItem) {
                setHasChildren(true);
            }
        }
    }, []);

    return (
        <div className={cx(styles['time-line-container'])} ref={timeLineContainer}>
            {children}
            {shouldDisplayButton && (
                <Button
                    altText={altText || defaultLinkAltText}
                    linkUrl={linkUrl}
                    linkText={linkText}
                    linkType={linkType}
                    className={cx(styles.button)}
                />
            )}
        </div>
    );
};

TimeLineContainer.displayName = 'TimelineContainer';

TimeLineContainer.propTypes = {
    altText: PropTypes.string,
    linkText: PropTypes.string,
    linkUrl: PropTypes.string,
    linkType: PropTypes.oneOf(LINK_TYPES).isRequired,
};

export default TimeLineContainer;
