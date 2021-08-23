import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { linkService } from '@konrad/reweb-aem';

const LinkBase = (props) => {
    const { children, className, target, url, altText, onKeyDown, tabIndex } = props;

    return url ? (
        <a
            href={linkService.get(url)}
            aria-label={altText}
            target={target === 'external' ? '_blank' : undefined}
            className={cx({ [className]: className })}
            onKeyDown={onKeyDown}
            tabIndex={tabIndex}
        >
            {children}
        </a>
    ) : null;
};

LinkBase.displayName = 'LinkBase';

LinkBase.propTypes = {
    target: PropTypes.oneOf(['internal', 'external', 'download', null]),
    url: PropTypes.string.isRequired,
    onKeyDown: PropTypes.func,
    tabIndex: PropTypes.number,
};

export default LinkBase;
