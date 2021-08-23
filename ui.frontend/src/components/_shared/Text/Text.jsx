import React from 'react';
import PropTypes from 'prop-types';
import styles from './Text.module.scss';
import cx from 'classnames';
import { TEXT_SIZE } from '../../../lib/constants';

const Text = (props) => {
    const { size, content, className } = props;
    const classes = cx(
        styles.text,
        styles[`text-size-${size}`],
        className,
        'defines-bottom-margin'
    );
    return <div className={classes} dangerouslySetInnerHTML={{ __html: content }}></div>;
};

Text.displayName = 'Text';

Text.propTypes = {
    size: PropTypes.oneOf(TEXT_SIZE).isRequired,
    content: PropTypes.string.isRequired,
    className: PropTypes.string,
};

Text.defaultProps = {
    content: '',
    size: 'body',
};

export default Text;
