import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './SectionContainer.module.scss';
import {
    ALIGNMENT_OPTIONS,
    BACKGROUND_COLORS,
    CONTAINER_WIDTH,
    FLUSH_OPTIONS,
} from '../../lib/constants';

const SectionContainer = (props) => {
    const { flush, width, alignment, backgroundColor, graphicalElement } = props;
    const themeClass = (backgroundColor === 'darkPurple' ? 'dark' : 'light') + '-theme';
    return (
        <div
            className={cx(
                styles.root,
                styles[`bg-${backgroundColor}`],
                styles[`flush-${flush}`],
                themeClass,
                'kg-section-container'
            )}
        >
            <div
                className={cx(
                    styles.content,
                    styles[`width--${width}`],
                    styles[`alignment-${alignment}`],
                    `alignment-${alignment}`,
                    styles[`decoration--${graphicalElement}`]
                )}
            >
                {props.children}
            </div>
        </div>
    );
};

SectionContainer.displayName = 'SectionContainer';

SectionContainer.defaultProps = {
    flush: 'neither',
    width: 'full',
    alignment: 'left',
    backgroundColor: 'white',
};

SectionContainer.propTypes = {
    graphicalElement: PropTypes.string,
    flush: PropTypes.oneOf(FLUSH_OPTIONS),
    width: PropTypes.oneOf(CONTAINER_WIDTH),
    alignment: PropTypes.oneOf(ALIGNMENT_OPTIONS),
    backgroundColor: PropTypes.oneOf(BACKGROUND_COLORS),
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default SectionContainer;
