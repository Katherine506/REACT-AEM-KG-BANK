import React from 'react';
import cx from 'classnames';
import styles from './CtaBanner.module.scss';
import PropTypes from 'prop-types';
import { LINK_TYPES } from '../../lib/constants';
import Text from '../_shared/Text';
import Button from '../_shared/Button';

const CtaBanner = (props) => {
    const { bannerText, linkText, altText, linkUrl, linkType } = props;
    return (
        <div className={cx(styles.container)}>
            <div className={cx(styles['text-wrapper'])}>
                <Text content={bannerText} className={cx(styles.text)} />
            </div>
            <Button
                linkText={linkText}
                linkUrl={linkUrl}
                linkType={linkType}
                altText={altText || linkText}
            />
        </div>
    );
};

CtaBanner.displayName = 'CtaBanner';

CtaBanner.propTypes = {
    bannerText: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
    altText: PropTypes.string,
    linkUrl: PropTypes.string.isRequired,
    linkType: PropTypes.oneOf(LINK_TYPES).isRequired,
};

export default CtaBanner;
