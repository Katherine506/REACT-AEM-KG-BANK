import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { t } from '@konrad/reweb-aem';
import PropTypes from 'prop-types';
import { Button, Icon, Text, TextInput } from '../index';
import styles from './EmailSubscribe.module.scss';
import cx from 'classnames';
import { FORM_ERROR_CODES, RECAPTCHA_BRANDING_TEXT } from '../../lib/constants';
import {
    getInitialInputState,
    handleErrors,
    validateForm,
    validateInput,
} from '../../lib/helpers/form';
import { getRecaptchaToken } from '../../lib/helpers/recatpcha';

const EmailSubscribe = (props) => {
    const {
        ctaText,
        ctaAltText,
        emailHelperText,
        emailInvalidErrorMessage,
        emailRequiredErrorMessage,
        newsletterPromptLabel,
        newsletterPromptRequiredErrorMessage,
        path,
        submitSuccessText,
    } = props;

    const fields = {
        email: {
            id: 'email',
            placeholder: emailHelperText,
            required: true,
            invalidErrorMessage: emailInvalidErrorMessage,
            requiredErrorMessage: emailRequiredErrorMessage,
        },
        newsletterPrompt: {
            type: 'checkbox',
            id: 'consent',
            label: newsletterPromptLabel,
            required: true,
            requiredErrorMessage: newsletterPromptRequiredErrorMessage,
        },
    };

    const fieldsKeysArray = Object.keys(fields);

    const [input, setInput] = useState(getInitialInputState(fields, fieldsKeysArray));
    const [submitting, setSubmitting] = useState(false);
    const [submitAttempted, setSubmitAttempted] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submitSuccessful, setSubmitSuccessful] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});
    const [nonFieldErrors, setNonFieldErrors] = useState([]);

    const formRef = useRef();

    const handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const key = fieldsKeysArray.find((key) => fields[key].id === name);
        const fieldError = fieldErrors[name];

        const validation = validateInput(fields, key, target, value, fieldError);

        setInput({
            ...input,
            [name]: {
                ...input[name],
                ...validation,
                value: value,
                serverErrorMessage: '', // Clear the field's server error message
            },
        });

        if (submitSuccessful) {
            setSubmitSuccessful(false);
        }

        if (nonFieldErrors.length !== 0) {
            setNonFieldErrors([]);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Prevent the user from firing multiple requests when clicking multiple times:
        if (submitting) {
            return;
        }

        setSubmitting(true);

        const target = event.target;
        const validatedForm = validateForm(
            fields,
            fieldsKeysArray,
            target,
            input,
            submitAttempted,
            fieldErrors
        );
        const submittedFields = validatedForm.submittedFields;
        const isFormValid = validatedForm.isFormValid;

        // Clear all fields' server error messages:
        fieldsKeysArray.forEach((key) => {
            const name = fields[key].id;

            submittedFields[name].serverErrorMessage = '';
        });

        if (!submitAttempted) {
            setSubmitAttempted(true);
        }

        const consentProvided = submittedFields.consent.value;


        if (isFormValid && consentProvided) {
            (async function () {
                try {
                    //servlet connection
                    const recaptchaToken = await getRecaptchaToken();
                    await axios.post(path + '.subscribe.json', { //where the form is, then connect to the servlet
                        path: path,
                        recaptchaToken: recaptchaToken,
                        data: {
                            email: submittedFields.email.value,
                            consentProvided: consentProvided,
                            status: 'subscribed',
                            locale: document.documentElement.lang,
                        },
                    });

                    setInput(submittedFields);
                    setSubmitting(false);
                    setSubmitted(true);
                    setSubmitSuccessful(true);
                    setFieldErrors({});
                    setNonFieldErrors([]);
                } catch (error) {
                    handleErrors(
                        error,
                        setFieldErrors,
                        setNonFieldErrors,
                        setInput,
                        submittedFields
                    );

                    setSubmitting(false);
                    setSubmitted(true);
                    setSubmitSuccessful(false);
                }
            })();
        } else {
            setInput(submittedFields);
            setSubmitting(false);
        }
    };

    useEffect(() => {
        if (fieldErrors) {
            const validatedForm = validateForm(
                fields,
                fieldsKeysArray,
                formRef.current,
                input,
                submitAttempted,
                fieldErrors
            );
            const submittedFields = validatedForm.submittedFields;

            setInput(submittedFields);
        }
    }, [fieldErrors]);

    useEffect(() => {
        if (submitSuccessful) {
            setInput(getInitialInputState(fields, fieldsKeysArray));
            setSubmitAttempted(false);
            setSubmitted(false);
        }
    }, [submitSuccessful]);

    return (
        <section className={styles.subs}>
            <div className={styles.intro}>
            <h2 className={styles.title}>Want to know more?</h2>
            <p className={styles.text}> Short one liner here. Lorem ipsum dolor sit</p>
            </div>
        <form className={styles.root} onSubmit={handleSubmit} ref={formRef} noValidate>
            <div className={styles.row}>
                <div className={styles.container}>
                    <TextInput
                        ariaLabel={fields.email.placeholder}
                        containerClassName={styles['input-container']}
                        errorMessage={input[fields.email.id].errorMessage}
                        errorMessageContainerClassName={styles['error-message-container']}
                        serverErrorMessage={input[fields.email.id].serverErrorMessage}
                        fieldClassName={styles['text-field']}
                        handleInputChange={handleInputChange}
                        id={fields.email.id}
                        isInvalid={submitAttempted ? input[fields.email.id].isInvalid : false}
                        placeholder={fields.email.placeholder}
                        required={fields.email.required}
                        type="email"
                        value={input[fields.email.id].value}
                    />
                    {submitSuccessful && (
                        <div className={styles['result-text']}>{submitSuccessText}</div>
                    )}
                    {nonFieldErrors.length !== 0 &&
                        nonFieldErrors.map((error) => (
                            <div className={cx(styles['error-message-container'])} key={error}>
                                <Icon
                                    className={cx(styles['error-message-icon'])}
                                    embedSVG={true}
                                    size="x-small"
                                    url="/etc.clientlibs/kg-bank/clientlibs/clientlib-base/resources/icons/attention.svg"
                                />
                                <div className={styles['error-message-text']}>
                                    {FORM_ERROR_CODES[error]}
                                </div>
                            </div>
                        ))}
                    <div
                        className={cx(
                            styles['input-container'],
                            styles['input-container--checkbox']
                        )}
                    >
                        <input
                            className={styles['checkbox-input']}
                            id={fields.newsletterPrompt.id}
                            name={fields.newsletterPrompt.id}
                            onChange={handleInputChange}
                            type="checkbox"
                            checked={input[fields.newsletterPrompt.id].value}
                        />
                        <label
                            className={styles['checkbox-label']}
                            htmlFor={fields.newsletterPrompt.id}
                        >
                            {newsletterPromptLabel}
                            {fields.newsletterPrompt.required && ' *'}
                        </label>
                    </div>
                    {submitAttempted && input[fields.newsletterPrompt.id].isInvalid && (
                        <div className={cx(styles['error-message-container'])}>
                            <Icon
                                className={cx(styles['error-message-icon'])}
                                embedSVG={true}
                                size="x-small"
                                url="/etc.clientlibs/kg-bank/clientlibs/clientlib-base/resources/icons/attention.svg"
                            />
                            <div className={styles['error-message-text']}>
                                {input[fields.newsletterPrompt.id].errorMessage}
                            </div>
                        </div>
                    )}
                    {input[fields.newsletterPrompt.id].serverErrorMessage && (
                        <div className={cx(styles['error-message-container'])}>
                            <Icon
                                className={cx(styles['error-message-icon'])}
                                embedSVG={true}
                                size="x-small"
                                url="/etc.clientlibs/kg-bank/clientlibs/clientlib-base/resources/icons/attention.svg"
                            />
                            <div
                                className={styles['error-message-text']}
                                dangerouslySetInnerHTML={{
                                    __html: input[fields.newsletterPrompt.id].serverErrorMessage,
                                }}
                            />
                        </div>
                    )}
                </div>
                <Button
                    altText={ctaAltText || t('Submit form to sign up for email updates')}
                    className={styles.cta}
                    linkType ={`button--general-light`}
                    linkText={ctaText}
                />
            </div>
           {/* <Text
                className={styles['recaptcha-text']}
                content={RECAPTCHA_BRANDING_TEXT}
                size="small"
            />*/}
        </form>
            <div>
                <br/>
                <br/>
            </div>

        </section>

    );
};

EmailSubscribe.displayName = 'EmailSubscribe';

EmailSubscribe.propTypes = {
    ctaText: PropTypes.string.isRequired,
    ctaAltText: PropTypes.string,
    emailHelperText: PropTypes.string.isRequired,
    emailInvalidErrorMessage: PropTypes.string.isRequired,
    emailRequiredErrorMessage: PropTypes.string.isRequired,
    newsletterPromptLabel: PropTypes.string.isRequired,
    newsletterPromptRequiredErrorMessage: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    submitSuccessText: PropTypes.string.isRequired,
};

export default EmailSubscribe;
