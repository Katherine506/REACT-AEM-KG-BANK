import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './PhoneNumber.module.scss';
import { Icon, LinkBase } from '../index';
import { t } from '@konrad/reweb-aem';
import useBreakpoint from '../../lib/helpers/useBreakpoint';
import { BREAKPOINT_DESKTOP, BREAKPOINT_DESKTOP_L, ICONS_PATH } from '../../lib/constants';

const PhoneNumber = (props) => {
    const { phoneNumber, altText } = props;
    const currentBreakpoint = useBreakpoint();

    const isDesktop =
        currentBreakpoint === BREAKPOINT_DESKTOP || currentBreakpoint === BREAKPOINT_DESKTOP_L;

    return (
        <LinkBase
            altText={t(altText || 'Call KG Bank')}
            target="internal"
            url={`tel:${phoneNumber}`}
            className={styles.root}
        >
            {isDesktop ? (
                phoneNumber
            ) : (
                <Icon
                    className={cx(styles['phone-icon'])}
                    size="small"
                    url={`${ICONS_PATH}communication-phone.svg`}
                    embedSVG={true}
                />
            )}
        </LinkBase>
    );
};

PhoneNumber.displayName = 'PhoneNumber';

PhoneNumber.propTypes = {
    phoneNumber: PropTypes.string.isRequired,
    altText: PropTypes.string,
};

export default PhoneNumber;
