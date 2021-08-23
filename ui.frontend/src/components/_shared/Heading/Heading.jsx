import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './Heading.module.scss';
import colors from '../../../styles/constants/colors.scss';
import { ALIGNMENT_OPTIONS, HEADING_LEVELS, HEADING_STYLES } from '../../../lib/constants';

const Heading = (props) => {
    const { id, text, color, children, alignment, className, headingLevel, overrideStyle } = props;

    const TagElement = headingLevel;
    const headingClass = overrideStyle || (headingLevel === 'div' ? 'h1' : headingLevel);

    return (
        <TagElement
            ref={(ref) => {
                // Update the CQ Decoration Tag parent element with a class that can be used to set margins.
                const decorationElement = ref && ref.closest('.heading');
                decorationElement && decorationElement.classList.add(`heading--${overrideStyle}`);
            }}
            id={id}
            className={cx(
                styles.root,
                styles[headingClass],
                styles[`alignment-${alignment}`],
                styles[`color-${color}`],
                className
            )}
        >
            {text || children}
        </TagElement>
    );
};

Heading.displayName = 'Heading';

Heading.defaultProps = {
    color: 'purple',
    alignment: 'left',
    headingLevel: 'h1',
};

Heading.propTypes = {
    id: PropTypes.string,
    text: PropTypes.string,
    className: PropTypes.string,
    color: PropTypes.oneOf(Object.keys(colors)),
    alignment: PropTypes.oneOf(ALIGNMENT_OPTIONS),
    headingLevel: PropTypes.oneOf(HEADING_LEVELS),
    overrideStyle: PropTypes.oneOf(HEADING_STYLES),
};

export default Heading;
