import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '../../index';
import styles from './TextAreaInput.module.scss';
import cx from 'classnames';

const TextAreaInput = (props) => {
    const {
        containerClassName,
        errorMessage,
        fieldClassName,
        handleInputChange,
        helpTextId,
        id,
        isInvalid,
        placeholder,
        required,
        serverErrorMessage,
        subtitle,
        subtitleClassName,
        title,
        value,
    } = props;

    return (
        <div className={containerClassName}>
            <label
                className={cx(styles.title, {
                    [styles['title-error']]: isInvalid,
                })}
                htmlFor={id}
            >
                {title}
                {required && ' *'}
            </label>
            <div className={styles['field-container']}>
                <textarea
                    aria-describedby={helpTextId || undefined}
                    className={cx(
                        styles.field,
                        {
                            [styles['field-error']]: isInvalid,
                        },
                        fieldClassName
                    )}
                    id={id}
                    name={id}
                    onChange={handleInputChange}
                    placeholder={placeholder || undefined}
                    value={value}
                />
                <span className={styles['field-focus']} />
            </div>
            {helpTextId && subtitle && (
                <div className={cx(styles.subtitle, subtitleClassName)} id={helpTextId}>
                    {subtitle}
                </div>
            )}
            {isInvalid && (
                <div className={styles['error-message-container']}>
                    <Icon
                        className={cx(styles['error-message-icon'])}
                        embedSVG={true}
                        size="x-small"
                        url="/etc.clientlibs/kg-bank/clientlibs/clientlib-base/resources/icons/attention.svg"
                    />
                    <div className={styles['error-message-text']}>{errorMessage}</div>
                </div>
            )}
            {serverErrorMessage && (
                <div className={styles['error-message-container']}>
                    <Icon
                        className={cx(styles['error-message-icon'])}
                        embedSVG={true}
                        size="x-small"
                        url="/etc.clientlibs/kg-bank/clientlibs/clientlib-base/resources/icons/attention.svg"
                    />
                    <div
                        className={styles['error-message-text']}
                        dangerouslySetInnerHTML={{
                            __html: serverErrorMessage,
                        }}
                    />
                </div>
            )}
        </div>
    );
};

TextAreaInput.displayName = 'TextAreaInput';

TextAreaInput.propTypes = {
    containerClassName: PropTypes.string,
    errorMessage: PropTypes.string,
    fieldClassName: PropTypes.string,
    handleInputChange: PropTypes.func.isRequired,
    helpTextId: PropTypes.string,
    id: PropTypes.string.isRequired,
    isInvalid: PropTypes.bool.isRequired,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    serverErrorMessage: PropTypes.string,
    subtitle: PropTypes.string,
    subtitleClassName: PropTypes.string,
    title: PropTypes.string.isRequired,
};

export default TextAreaInput;
