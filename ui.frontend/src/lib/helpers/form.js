import { FORM_ERROR_CODES } from '../constants';

export const getHelpTextId = (id) => {
    return `${id}-help-text`;
};

export const dropdownRequired = (options, optional) => {
    return options && options.length && !optional;
};

export const getInitialInputState = (fields, fieldsKeysArray) => {
    const initialInputState = {};

    fieldsKeysArray.forEach((key) => {
        let value = '';

        if (fields[key].type === 'checkbox') {
            value = false;
        }

        initialInputState[fields[key].id] = {
            isEmpty: true,
            isInvalidFormat: false,
            isInvalid: false,
            value: value,
        };
    });

    return initialInputState;
};

const isInvalidFormatString = (key, element) => {
    if (key === 'email') {
        return !element.checkValidity();
    }
};

export const removeSymbols = (currencyString) => {
    return currencyString.replace(/[^0-9.]+/g, '');
};

export const getPostData = (path, recaptchaToken, submittedFields) => {
    const postData = {
        path: path,
        recaptchaToken: recaptchaToken,
        data: {},
    };
    const dataKeysArray = Object.keys(submittedFields);

    dataKeysArray.forEach((key) => {
        postData.data[key] = submittedFields[key].value;
    });

    return postData;
};

export const handleErrors = (
    error,
    setFieldErrors,
    setNonFieldErrors,
    setInput,
    submittedFields
) => {
    const response = error.response;

    if (response) {
        if (response.status >= 500 && response.status < 600) {
            setFieldErrors({});
            setNonFieldErrors(['INTERNAL_SERVER_ERROR']);
        } else if (response.data) {
            setFieldErrors(response.data.fieldErrors);
            setNonFieldErrors(response.data.nonFieldErrors);
        }
    } else {
        console.error(error);

        setInput(submittedFields);
    }
};

export const validateForm = (
    fields,
    fieldsKeysArray,
    target,
    input,
    submitAttempted,
    fieldErrors
) => {
    const submittedFields = input;
    let isFormValid = true;

    fieldsKeysArray.forEach((key) => {
        const name = fields[key].id;
        const element = target[name];
        const value = input[name].value;
        const fieldError = fieldErrors[name];
        let serverErrorMessage;
        let validation;

        if (fieldError) {
            serverErrorMessage = fieldError.map((error) => FORM_ERROR_CODES[error]).join('<br />');
        } else {
            serverErrorMessage = '';
        }

        if (submitAttempted) {
            validation = {
                isEmpty: input[name].isEmpty,
                isInvalidFormat: input[name].isInvalidFormat,
                isInvalid: input[name].isInvalid,
                errorMessage: input[name].errorMessage,
                serverErrorMessage: serverErrorMessage,
            };
        } else {
            validation = validateInput(fields, key, element, value, fieldError);
        }

        submittedFields[fields[key].id] = {
            ...submittedFields[fields[key].id],
            ...validation,
        };

        if (validation.isInvalid) {
            isFormValid = false;
        }
    });

    return {
        submittedFields: submittedFields,
        isFormValid: isFormValid,
    };
};

export const validateInput = (fields, key, element, value, fieldError) => {
    let isEmpty;
    let isInvalidFormat;
    let isInvalid;
    let errorMessage;
    let serverErrorMessage;

    if (typeof value === 'string') {
        const trimmedValue = value.trim();
        isEmpty = trimmedValue.length === 0;
        isInvalidFormat = isInvalidFormatString(key, element);
    } else {
        isEmpty = !value;
        isInvalidFormat = false;
    }

    if (isEmpty && fields[key].required) {
        isInvalid = true;
        errorMessage = fields[key].requiredErrorMessage;
    } else if (isInvalidFormat) {
        isInvalid = true;
        errorMessage = fields[key].invalidErrorMessage;
    } else {
        isInvalid = false;
        errorMessage = '';
    }

    if (fieldError) {
        serverErrorMessage = fieldError.map((error) => FORM_ERROR_CODES[error]).join('<br />');
    } else {
        serverErrorMessage = '';
    }

    return {
        isEmpty: isEmpty,
        isInvalidFormat: isInvalidFormat,
        isInvalid: isInvalid,
        errorMessage: errorMessage,
        serverErrorMessage: serverErrorMessage,
    };
};
