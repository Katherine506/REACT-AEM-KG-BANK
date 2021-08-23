import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { t } from '@konrad/reweb-aem';
import PropTypes from 'prop-types';
import {
    Button,
    ContactUsFormSubmissionResult,
    SelectInput,
    Text,
    TextAreaInput,
    TextInput,
} from '../index';
import styles from './ContactUsAutoForm.module.scss';
import cx from 'classnames';
import {
    DROPDOWN_PLACEHOLDER_TEXT,
    FORM_ERROR_CODES,
    PROVINCES,
    RECAPTCHA_BRANDING_TEXT,
} from '../../lib/constants';
import {
    dropdownRequired,
    getInitialInputState,
    getPostData,
    handleErrors,
    validateForm,
    validateInput,
} from '../../lib/helpers/form';
import { getRecaptchaToken } from '../../lib/helpers/recatpcha';

const ContactUsAutoForm = (props) => {
    const {
        ctaText,
        ctaAltText,
        dropdown1Label,
        dropdown1Name,
        dropdown1Options,
        dropdown1Optional,
        dropdown1RequiredErrorMessage,
        dropdown2Label,
        dropdown2Name,
        dropdown2Options,
        dropdown2Optional,
        dropdown2RequiredErrorMessage,
        dropdown3Label,
        dropdown3Name,
        dropdown3Options,
        dropdown3Optional,
        dropdown3RequiredErrorMessage,
        dropdown4Label,
        dropdown4Name,
        dropdown4Options,
        dropdown4Optional,
        dropdown4RequiredErrorMessage,
        dropdown5Label,
        dropdown5Name,
        dropdown5Options,
        dropdown5Optional,
        dropdown5RequiredErrorMessage,
        emailLabel,
        emailInvalidErrorMessage,
        emailRequiredErrorMessage,
        field1Label,
        field1Name,
        field1Optional,
        field1RequiredErrorMessage,
        field2Label,
        field2Name,
        field2Optional,
        field2RequiredErrorMessage,
        field3Label,
        field3Name,
        field3Optional,
        field3RequiredErrorMessage,
        field4Label,
        field4Name,
        field4Optional,
        field4RequiredErrorMessage,
        path,
        provinceLabel,
        provinceName,
        provinceRequiredErrorMessage,
        submitErrorTitle,
        submitErrorCtaText,
        submitErrorCtaAltText,
        submitSuccessTitle,
        submitSuccessText,
        submitSuccessCtaText,
        submitSuccessCtaAltText,
        textBoxHelpText,
        textBoxLabel,
        textBoxName,
    } = props;

    const fields = {
        field1: {
            id: field1Name,
            label: field1Label,
            required: !field1Optional,
            requiredErrorMessage: field1RequiredErrorMessage,
        },
        field2: {
            id: field2Name,
            label: field2Label,
            required: !field2Optional,
            requiredErrorMessage: field2RequiredErrorMessage,
        },
        dropdown1: {
            id: dropdown1Name,
            label: dropdown1Label,
            placeholder: DROPDOWN_PLACEHOLDER_TEXT,
            options: dropdown1Options,
            required: dropdownRequired(dropdown1Options, dropdown1Optional),
            requiredErrorMessage: dropdown1RequiredErrorMessage,
        },
        field3: {
            id: field3Name,
            label: field3Label,
            required: !field3Optional,
            requiredErrorMessage: field3RequiredErrorMessage,
        },
        email: {
            id: 'email',
            label: emailLabel,
            required: true,
            invalidErrorMessage: emailInvalidErrorMessage,
            requiredErrorMessage: emailRequiredErrorMessage,
        },
        field4: {
            id: field4Name,
            label: field4Label,
            required: !field4Optional,
            requiredErrorMessage: field4RequiredErrorMessage,
        },
        province: {
            id: provinceName,
            label: provinceLabel,
            placeholder: DROPDOWN_PLACEHOLDER_TEXT,
            options: PROVINCES,
            required: true,
            requiredErrorMessage: provinceRequiredErrorMessage,
        },
        dropdown2: {
            id: dropdown2Name,
            label: dropdown2Label,
            placeholder: DROPDOWN_PLACEHOLDER_TEXT,
            options: dropdown2Options,
            required: dropdownRequired(dropdown2Options, dropdown2Optional),
            requiredErrorMessage: dropdown2RequiredErrorMessage,
        },
        dropdown3: {
            id: dropdown3Name,
            label: dropdown3Label,
            placeholder: DROPDOWN_PLACEHOLDER_TEXT,
            options: dropdown3Options,
            required: dropdownRequired(dropdown3Options, dropdown3Optional),
            requiredErrorMessage: dropdown3RequiredErrorMessage,
        },
        dropdown4: {
            id: dropdown4Name,
            label: dropdown4Label,
            placeholder: DROPDOWN_PLACEHOLDER_TEXT,
            options: dropdown4Options,
            required: dropdownRequired(dropdown4Options, dropdown4Optional),
            requiredErrorMessage: dropdown4RequiredErrorMessage,
        },
        dropdown5: {
            id: dropdown5Name,
            label: dropdown5Label,
            placeholder: DROPDOWN_PLACEHOLDER_TEXT,
            options: dropdown5Options,
            required: dropdownRequired(dropdown5Options, dropdown5Optional),
            requiredErrorMessage: dropdown5RequiredErrorMessage,
        },
        textBox: {
            id: textBoxName,
            label: textBoxLabel,
            placeholder: textBoxHelpText,
            required: false,
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
        const value = target.value;
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

        if (isFormValid) {
            (async function () {
                try {
                    const recaptchaToken = await getRecaptchaToken();
                    const postData = getPostData(path, recaptchaToken, submittedFields);
                    await axios.post(path + '.contact.json', postData);

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

    const returnToForm = () => {
        if (submitSuccessful) {
            setInput(getInitialInputState(fields, fieldsKeysArray));

            setSubmitAttempted(false);
        }

        setSubmitted(false);
        setSubmitSuccessful(false);
    };

    return (
        <>
            <ContactUsFormSubmissionResult
                className={submitted ? undefined : styles.hide}
                returnToForm={returnToForm}
                submitErrorTitle={submitErrorTitle}
                submitErrorText={nonFieldErrors
                    .map((error) => FORM_ERROR_CODES[error])
                    .join('<br />')}
                submitErrorCtaText={submitErrorCtaText}
                submitErrorCtaAltText={submitErrorCtaAltText}
                submitSuccessful={submitSuccessful}
                submitSuccessTitle={submitSuccessTitle}
                submitSuccessText={submitSuccessText}
                submitSuccessCtaText={submitSuccessCtaText}
                submitSuccessCtaAltText={submitSuccessCtaAltText}
            />
            <form
                className={cx(styles.root, { [styles.hide]: submitted })}
                onSubmit={handleSubmit}
                ref={formRef}
                noValidate
            >
                {((field1Label && field1RequiredErrorMessage) ||
                    (field2Label && field2RequiredErrorMessage)) && (
                    <div className={styles.row}>
                        {field1Label && field1RequiredErrorMessage && (
                            <TextInput
                                containerClassName={styles['input-container']}
                                errorMessage={input[fields.field1.id].errorMessage}
                                serverErrorMessage={input[fields.field1.id].serverErrorMessage}
                                fieldClassName={styles['text-field']}
                                handleInputChange={handleInputChange}
                                id={fields.field1.id}
                                isInvalid={
                                    submitAttempted ? input[fields.field1.id].isInvalid : false
                                }
                                required={fields.field1.required}
                                title={fields.field1.label}
                                value={input[fields.field1.id].value}
                            />
                        )}
                        {field2Label && field2RequiredErrorMessage && (
                            <TextInput
                                containerClassName={styles['input-container']}
                                errorMessage={input[fields.field2.id].errorMessage}
                                serverErrorMessage={input[fields.field2.id].serverErrorMessage}
                                fieldClassName={styles['text-field']}
                                handleInputChange={handleInputChange}
                                id={fields.field2.id}
                                isInvalid={
                                    submitAttempted ? input[fields.field2.id].isInvalid : false
                                }
                                required={fields.field2.required}
                                title={fields.field2.label}
                                value={input[fields.field2.id].value}
                            />
                        )}
                    </div>
                )}
                {((dropdown1Label && dropdown1Options && dropdown1RequiredErrorMessage) ||
                    (field3Label && field3RequiredErrorMessage)) && (
                    <div className={styles.row}>
                        {dropdown1Label && dropdown1Options && dropdown1RequiredErrorMessage && (
                            <SelectInput
                                containerClassName={styles['input-container']}
                                errorMessage={input[fields.dropdown1.id].errorMessage}
                                serverErrorMessage={input[fields.dropdown1.id].serverErrorMessage}
                                fieldClassName={styles['select-field']}
                                handleInputChange={handleInputChange}
                                id={fields.dropdown1.id}
                                isInvalid={
                                    submitAttempted ? input[fields.dropdown1.id].isInvalid : false
                                }
                                options={fields.dropdown1.options}
                                placeholder={fields.dropdown1.placeholder}
                                required={fields.dropdown1.required}
                                title={fields.dropdown1.label}
                                value={input[fields.dropdown1.id].value}
                            />
                        )}
                        {field3Label && field3RequiredErrorMessage && (
                            <TextInput
                                containerClassName={styles['input-container']}
                                errorMessage={input[fields.field3.id].errorMessage}
                                serverErrorMessage={input[fields.field3.id].serverErrorMessage}
                                fieldClassName={styles['text-field']}
                                handleInputChange={handleInputChange}
                                id={fields.field3.id}
                                isInvalid={
                                    submitAttempted ? input[fields.field3.id].isInvalid : false
                                }
                                required={fields.field3.required}
                                title={fields.field3.label}
                                value={input[fields.field3.id].value}
                            />
                        )}
                    </div>
                )}
                <div className={styles.row}>
                    <TextInput
                        containerClassName={styles['input-container']}
                        errorMessage={input[fields.email.id].errorMessage}
                        serverErrorMessage={input[fields.email.id].serverErrorMessage}
                        fieldClassName={styles['text-field']}
                        handleInputChange={handleInputChange}
                        id={fields.email.id}
                        isInvalid={submitAttempted ? input[fields.email.id].isInvalid : false}
                        required={fields.email.required}
                        title={fields.email.label}
                        type="email"
                        value={input[fields.email.id].value}
                    />
                    {field4Label && field4RequiredErrorMessage && (
                        <TextInput
                            containerClassName={styles['input-container']}
                            errorMessage={input[fields.field4.id].errorMessage}
                            serverErrorMessage={input[fields.field4.id].serverErrorMessage}
                            fieldClassName={styles['text-field']}
                            handleInputChange={handleInputChange}
                            id={fields.field4.id}
                            isInvalid={submitAttempted ? input[fields.field4.id].isInvalid : false}
                            required={fields.field4.required}
                            title={fields.field4.label}
                            value={input[fields.field4.id].value}
                        />
                    )}
                </div>
                <div className={styles.row}>
                    <SelectInput
                        containerClassName={styles['input-container']}
                        errorMessage={input[fields.province.id].errorMessage}
                        serverErrorMessage={input[fields.province.id].serverErrorMessage}
                        fieldClassName={styles['select-field']}
                        handleInputChange={handleInputChange}
                        id={fields.province.id}
                        isInvalid={submitAttempted ? input[fields.province.id].isInvalid : false}
                        options={fields.province.options}
                        placeholder={fields.province.placeholder}
                        required={fields.province.required}
                        title={fields.province.label}
                        value={input[fields.province.id].value}
                    />
                    {dropdown2Label && dropdown2Options && dropdown2RequiredErrorMessage && (
                        <SelectInput
                            containerClassName={styles['input-container']}
                            errorMessage={input[fields.dropdown2.id].errorMessage}
                            serverErrorMessage={input[fields.dropdown2.id].serverErrorMessage}
                            fieldClassName={styles['select-field']}
                            handleInputChange={handleInputChange}
                            id={fields.dropdown2.id}
                            isInvalid={
                                submitAttempted ? input[fields.dropdown2.id].isInvalid : false
                            }
                            options={fields.dropdown2.options}
                            placeholder={fields.dropdown2.placeholder}
                            required={fields.dropdown2.required}
                            title={fields.dropdown2.label}
                            value={input[fields.dropdown2.id].value}
                        />
                    )}
                </div>
                {((dropdown3Label && dropdown3Options && dropdown3RequiredErrorMessage) ||
                    (dropdown4Label && dropdown4Options && dropdown4RequiredErrorMessage)) && (
                    <div className={styles.row}>
                        {dropdown3Label && dropdown3Options && dropdown3RequiredErrorMessage && (
                            <SelectInput
                                containerClassName={styles['input-container']}
                                errorMessage={input[fields.dropdown3.id].errorMessage}
                                serverErrorMessage={input[fields.dropdown3.id].serverErrorMessage}
                                fieldClassName={styles['select-field']}
                                handleInputChange={handleInputChange}
                                id={fields.dropdown3.id}
                                isInvalid={
                                    submitAttempted ? input[fields.dropdown3.id].isInvalid : false
                                }
                                options={fields.dropdown3.options}
                                placeholder={fields.dropdown3.placeholder}
                                required={fields.dropdown3.required}
                                title={fields.dropdown3.label}
                                value={input[fields.dropdown3.id].value}
                            />
                        )}
                        {dropdown4Label && dropdown4Options && dropdown4RequiredErrorMessage && (
                            <SelectInput
                                containerClassName={styles['input-container']}
                                errorMessage={input[fields.dropdown4.id].errorMessage}
                                serverErrorMessage={input[fields.dropdown4.id].serverErrorMessage}
                                fieldClassName={styles['select-field']}
                                handleInputChange={handleInputChange}
                                id={fields.dropdown4.id}
                                isInvalid={
                                    submitAttempted ? input[fields.dropdown4.id].isInvalid : false
                                }
                                options={fields.dropdown4.options}
                                placeholder={fields.dropdown4.placeholder}
                                required={fields.dropdown4.required}
                                title={fields.dropdown4.label}
                                value={input[fields.dropdown4.id].value}
                            />
                        )}
                    </div>
                )}
                {dropdown5Label && dropdown5Options && dropdown5RequiredErrorMessage && (
                    <div className={styles.row}>
                        <SelectInput
                            containerClassName={cx(
                                styles['input-container'],
                                styles['input-container--full-width']
                            )}
                            errorMessage={input[fields.dropdown5.id].errorMessage}
                            serverErrorMessage={input[fields.dropdown5.id].serverErrorMessage}
                            fieldClassName={styles['select-field']}
                            handleInputChange={handleInputChange}
                            id={fields.dropdown5.id}
                            isInvalid={
                                submitAttempted ? input[fields.dropdown5.id].isInvalid : false
                            }
                            options={fields.dropdown5.options}
                            placeholder={fields.dropdown5.placeholder}
                            required={fields.dropdown5.required}
                            title={fields.dropdown5.label}
                            value={input[fields.dropdown5.id].value}
                        />
                    </div>
                )}
                <div className={styles.row}>
                    <TextAreaInput
                        containerClassName={cx(
                            styles['input-container'],
                            styles['input-container--full-width']
                        )}
                        fieldClassName={styles['text-field']}
                        handleInputChange={handleInputChange}
                        id={fields.textBox.id}
                        isInvalid={submitAttempted ? input[fields.textBox.id].isInvalid : false}
                        placeholder={fields.textBox.placeholder}
                        required={fields.textBox.required}
                        title={fields.textBox.label}
                        value={input[fields.textBox.id].value}
                    />
                </div>
                <Button
                    altText={ctaAltText || t('Submit form')}
                    className={styles.cta}
                    linkText={ctaText}
                />
                <Text
                    className={styles['recaptcha-text']}
                    content={RECAPTCHA_BRANDING_TEXT}
                    size="small"
                />
            </form>
        </>
    );
};

ContactUsAutoForm.displayName = 'ContactUsAutoForm';

ContactUsAutoForm.propTypes = {
    ctaText: PropTypes.string.isRequired,
    ctaAltText: PropTypes.string,
    dropdown1Label: PropTypes.string,
    dropdown1Name: PropTypes.string,
    dropdown1Options: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        })
    ),
    dropdown1Optional: PropTypes.bool,
    dropdown1RequiredErrorMessage: PropTypes.string,
    dropdown2Label: PropTypes.string,
    dropdown2Name: PropTypes.string,
    dropdown2Options: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        })
    ),
    dropdown2Optional: PropTypes.bool,
    dropdown2RequiredErrorMessage: PropTypes.string,
    dropdown3Label: PropTypes.string,
    dropdown3Name: PropTypes.string,
    dropdown3Options: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        })
    ),
    dropdown3Optional: PropTypes.bool,
    dropdown3RequiredErrorMessage: PropTypes.string,
    dropdown4Label: PropTypes.string,
    dropdown4Name: PropTypes.string,
    dropdown4Options: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        })
    ),
    dropdown4Optional: PropTypes.bool,
    dropdown4RequiredErrorMessage: PropTypes.string,
    dropdown5Label: PropTypes.string,
    dropdown5Name: PropTypes.string,
    dropdown5Options: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        })
    ),
    dropdown5Optional: PropTypes.bool,
    dropdown5RequiredErrorMessage: PropTypes.string,
    emailLabel: PropTypes.string.isRequired,
    emailInvalidErrorMessage: PropTypes.string.isRequired,
    emailRequiredErrorMessage: PropTypes.string.isRequired,
    field1Label: PropTypes.string,
    field1Name: PropTypes.string,
    field1Optional: PropTypes.bool,
    field1RequiredErrorMessage: PropTypes.string,
    field2Label: PropTypes.string,
    field2Name: PropTypes.string,
    field2Optional: PropTypes.bool,
    field2RequiredErrorMessage: PropTypes.string,
    field3Label: PropTypes.string,
    field3Name: PropTypes.string,
    field3Optional: PropTypes.bool,
    field3RequiredErrorMessage: PropTypes.string,
    field4Label: PropTypes.string,
    field4Name: PropTypes.string,
    field4Optional: PropTypes.bool,
    field4RequiredErrorMessage: PropTypes.string,
    path: PropTypes.string.isRequired,
    provinceLabel: PropTypes.string.isRequired,
    provinceName: PropTypes.string.isRequired,
    provinceRequiredErrorMessage: PropTypes.string.isRequired,
    submitErrorTitle: PropTypes.string.isRequired,
    submitErrorCtaText: PropTypes.string.isRequired,
    submitErrorCtaAltText: PropTypes.string,
    submitSuccessTitle: PropTypes.string.isRequired,
    submitSuccessText: PropTypes.string.isRequired,
    submitSuccessCtaText: PropTypes.string.isRequired,
    submitSuccessCtaAltText: PropTypes.string,
    textBoxHelpText: PropTypes.string,
    textBoxLabel: PropTypes.string.isRequired,
    textBoxName: PropTypes.string.isRequired,
};

export default ContactUsAutoForm;
