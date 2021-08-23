import React from 'react';
import PropTypes from 'prop-types';
import styles from './Theme.module.scss';
import cx from 'classnames';

const Theme = (props) => {
    const { theme, children, className } = props;

    return (
        <div className={cx(`theme-root ${theme}-theme`, { [className]: className })}>
            {children}
        </div>
    );
};

Theme.displayName = 'Theme';

Theme.defaultProps = {
    theme: 'light',
};

Theme.propTypes = {
    theme: PropTypes.string,
};

export default Theme;
