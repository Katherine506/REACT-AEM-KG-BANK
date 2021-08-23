import React from 'react';
import PropTypes from 'prop-types';
import { Icon, LinkBase } from '../../index';
import styles from './Link.module.scss';
import cx from 'classnames';

const Link = (props) => {
    const { children, target, text, theme, url, altText, className } = props;

    return (
        <LinkBase
            url={url}
            text={text}
            target={target}
            className={cx(styles.root, styles[theme], className)}
            altText={altText}
        >
            {text}
            {(target === 'download' || target === 'external') && (
                <Icon name={target} className={styles.targetIcon} />
            )}
            {children ? children : null}
        </LinkBase>
    );
};

Link.displayName = 'Link';

Link.propTypes = {
    target: PropTypes.oneOf(['internal', 'external', 'download', null]),
    text: PropTypes.string.isRequired,
    theme: PropTypes.oneOf(['primary', 'secondary', 'body']).isRequired,
    url: PropTypes.string.isRequired,
};

Link.defaultProps = {
    text: 'link',
    theme: 'primary',
};

export default Link;
