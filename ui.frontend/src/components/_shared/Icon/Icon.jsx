import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styles from './Icon.module.scss';
import cx from 'classnames';
import { ICON_SIZES } from '../../../lib/constants';

const Icon = (props) => {
    const { altText, className, url, size, inline, embedSVG, onClick } = props;
    const additionalProps = {};

    if (!altText) {
        additionalProps['aria-hidden'] = 'true';
    }

    const [svg, setSVG] = useState(null);

    useEffect(() => {
        (async function () {
            if (embedSVG) {
                setSVG((await axios(url)).data);
            }
        })();
    }, [url, embedSVG]);

    return (
        <div
            className={cx(styles.wrapper, styles[`wrapper--${inline ? 'inline' : 'block'}`])}
            {...additionalProps}
        >
            {embedSVG && svg ? (
                <div
                    className={cx(styles[`size-${size}`], { [className]: className })}
                    dangerouslySetInnerHTML={{ __html: svg }}
                    onClick={onClick}
                />
            ) : (
                <img
                    className={cx(styles[`size-${size}`], { [className]: className })}
                    alt={altText || ''}
                    onClick={onClick}
                    src={url}
                />
            )}
        </div>
    );
};

Icon.displayName = 'Icon';

Icon.propTypes = {
    altText: PropTypes.string,
    className: PropTypes.string,
    url: PropTypes.string.isRequired,
    size: PropTypes.oneOf(ICON_SIZES).isRequired,
    inline: PropTypes.bool,
    onClick: PropTypes.func,
};

Icon.defaultProps = {
    size: 'small',
    inline: false,
};

export default Icon;
