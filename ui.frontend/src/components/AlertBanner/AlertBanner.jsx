import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Icon, Text, Theme } from '../index';
import styles from './AlertBanner.module.scss';
import cx from 'classnames';
import { DARK_THEME } from '../../lib/constants';
import { t } from '@konrad/reweb-aem';
import useAuthorMode from '../../lib/helpers/useAuthorMode';

const STORAGE_NAME = 'alert-banner-dismissed';
const STORAGE_API = window.sessionStorage;

const getStoredValue = () => {
    const stored = STORAGE_API.getItem(STORAGE_NAME);
    try {
        return JSON.parse(stored) || {};
    } catch (e) {
        console.error(`Invalid value for ${STORAGE_NAME}`, e);
    }
    return Object.create(null);
};

const setStoredValue = (value) => {
    STORAGE_API.setItem(STORAGE_NAME, JSON.stringify(value));
};

const AlertBanner = (props) => {
    const getIsAlertDismissed = (id) => {
        const data = getStoredValue();
        return !!data[id];
    };

    const { text, alertId, id } = props;
    const currentAuthorMode = useAuthorMode();
    const [isAlertDismissed, setAlertDismissed] = useState(getIsAlertDismissed(alertId || id));

    const closeBanner = () => {
        let data = getStoredValue();
        data[alertId || id] = true;
        setStoredValue(data);
        setAlertDismissed(true);
    };

    const hide = currentAuthorMode !== 'edit' && isAlertDismissed;

    return (
        <Theme theme={DARK_THEME}>
            <div className={cx(styles.root, hide ? styles['root--hide'] : '')}>
                <div className={cx(styles.container)}>
                    <Text className={cx(styles.text)} content={text} size="body" />
                    <button
                        aria-label={t('Close this alert banner')}
                        className={cx(styles['icon-button'])}
                        onClick={closeBanner}
                    >
                        <Icon
                            className={cx(styles.icon)}
                            embedSVG={true}
                            size="x-small"
                            url="/etc.clientlibs/kg-bank/clientlibs/clientlib-base/resources/icons/cross-white.svg"
                        />
                    </button>
                </div>
            </div>
        </Theme>
    );
};

AlertBanner.displayName = 'AlertBanner';

AlertBanner.propTypes = {
    text: PropTypes.string.isRequired,
    alertId: PropTypes.string,
    id: PropTypes.string,
};

export default AlertBanner;
