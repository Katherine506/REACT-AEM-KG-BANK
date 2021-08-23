import React from 'react';
import { t } from '@konrad/reweb-aem';
import PropTypes from 'prop-types';
import { Button } from '../../index';
import styles from './ContactUsFormSubmissionResult.module.scss';
import cx from 'classnames';

const ContactUsFormSubmissionResult = (props) => {
    const {
        className,
        returnToForm,
        submitErrorTitle,
        submitErrorText,
        submitErrorCtaText,
        submitErrorCtaAltText,
        submitSuccessful,
        submitSuccessTitle,
        submitSuccessText,
        submitSuccessCtaText,
        submitSuccessCtaAltText,
    } = props;

    return (
        <div className={cx({ [className]: className })}>
            <div className={styles['result-title']}>
                {submitSuccessful ? submitSuccessTitle : submitErrorTitle}
            </div>
            <p
                className={styles['result-text']}
                dangerouslySetInnerHTML={{
                    __html: submitSuccessful ? submitSuccessText : submitErrorText,
                }}
            />
            <Button
                altText={
                    (submitSuccessful ? submitSuccessCtaAltText : submitErrorCtaAltText) ||
                    t('Return to form')
                }
                className={styles['result-cta']}
                linkText={submitSuccessful ? submitSuccessCtaText : submitErrorCtaText}
                onClick={returnToForm}
            />
        </div>
    );
};

ContactUsFormSubmissionResult.displayName = 'ContactUsFormSubmissionResult';

ContactUsFormSubmissionResult.propTypes = {
    returnToForm: PropTypes.func.isRequired,
    submitSuccessful: PropTypes.bool.isRequired,
};

export default ContactUsFormSubmissionResult;
