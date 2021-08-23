import React from 'react';
import MaskedInput from 'react-text-mask';
import PropTypes from 'prop-types';
import { Icon } from '../../index';
import styles from './TextInput.module.scss';
import cx from 'classnames';

const TextInput = (props) => {
    const {
        ariaLabel,
        containerClassName,
        errorMessage,
        errorMessageContainerClassName,
        fieldClassName,
        handleInputChange,
        helpTextId,
        id,
        isInvalid,
        mask,
        placeholder,
        required,
        serverErrorMessage,
        subtitle,
        subtitleClassName,
        title,
        type,
        value,
    } = props;

    return (
        <div className={containerClassName}>
            {title && (
                <label
                    className={cx(styles.title, {
                        [styles['title-error']]: isInvalid,
                    })}
                    htmlFor={id}
                >
                    {title}
                    {required && ' *'}
                </label>
            )}
            <div className={styles['field-container']}>
                {mask ? (
                    <MaskedInput
                        aria-describedby={helpTextId || undefined}
                        aria-label={ariaLabel && !title ? ariaLabel : undefined}
                        className={cx(
                            styles.field,
                            {
                                [styles['field-error']]: isInvalid,
                            },
                            fieldClassName
                        )}
                        id={id}
                        inputMode="numeric"
                        mask={mask}
                        name={id}
                        onChange={handleInputChange}
                        placeholder={placeholder || undefined}
                        type={type}
                        value={value}
                    />
                ) : (
                    <input
                        aria-describedby={helpTextId || undefined}
                        aria-label={ariaLabel && !title ? ariaLabel : undefined}
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
                        type={type}
                        value={value}
                    />
                )}
                <span className={styles['field-focus']} />
            </div>
            {helpTextId && subtitle && (
                <div className={cx(styles.subtitle, subtitleClassName)} id={helpTextId}>
                    {subtitle}
                </div>
            )}
            {isInvalid && (
                <div
                    className={cx(
                        styles['error-message-container'],
                        errorMessageContainerClassName
                    )}
                >
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
                <div
                    className={cx(
                        styles['error-message-container'],
                        errorMessageContainerClassName
                    )}
                >
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

TextInput.displayName = 'TextInput';

TextInput.propTypes = {
    ariaLabel: PropTypes.string,
    containerClassName: PropTypes.string,
    errorMessage: PropTypes.string,
    errorMessageContainerClassName: PropTypes.string,
    fieldClassName: PropTypes.string,
    handleInputChange: PropTypes.func.isRequired,
    helpTextId: PropTypes.string,
    id: PropTypes.string.isRequired,
    isInvalid: PropTypes.bool.isRequired,
    mask: PropTypes.func,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    serverErrorMessage: PropTypes.string,
    subtitle: PropTypes.string,
    subtitleClassName: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.oneOf(['text', 'email']),
};

TextInput.defaultProps = {
    type: 'text',
};

export default TextInput;
