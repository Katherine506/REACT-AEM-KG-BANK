import React from 'react';
import ContactUsPOSForm from './ContactUsPOSForm';
import SectionContainer from '../SectionContainer';
import Theme from '../_shared/Theme';
import { boolean, object, select, text } from '@storybook/addon-knobs';
import { THEME_OPTIONS } from '../../lib/constants';

// https://storybook.js.org/docs/formats/component-story-format/

export default {
    title: 'Elements/ContactUsPOSForm',
    component: ContactUsPOSForm,
};

const DROPDOWN_OPTIONS = [
    {
        name: 'Option 1 of 3',
        value: 'option1Of3',
    },
    {
        name: 'Option 2 of 3',
        value: 'option2Of3',
    },
    {
        name: 'Option 3 of 3',
        value: 'option3Of3',
    },
];

export const DefaultView = () => {
    return (
        <Theme theme={select('Theme of Parent Component', THEME_OPTIONS, 'light')}>
            <SectionContainer
                backgroundColor={
                    select('Theme of Parent Component', THEME_OPTIONS, 'light') === 'light'
                        ? 'white'
                        : 'darkPurple'
                }
                width="full"
            >
                <ContactUsPOSForm
                    ctaText={text('CTA Text', 'SUBMIT')}
                    ctaAltText={text('CTA Alt Text', '')}
                    dropdown1Label={text('Dropdown 1 Label', 'Industry')}
                    dropdown1Name={text('Dropdown 1 Name', 'industry')}
                    dropdown1Options={object('Dropdown 1 Options', DROPDOWN_OPTIONS)}
                    dropdown1Optional={boolean('Dropdown 1 Optional', false)}
                    dropdown1RequiredErrorMessage={text(
                        'Dropdown 1 Required Error Message',
                        'Choose an industry'
                    )}
                    dropdown2Label={text('Dropdown 2 Label', 'Business is managed/operated from')}
                    dropdown2Name={text('Dropdown 2 Name', 'businessIsManagedOperatedFrom')}
                    dropdown2Options={object('Dropdown 2 Options', DROPDOWN_OPTIONS)}
                    dropdown2Optional={boolean('Dropdown 2 Optional', false)}
                    dropdown2RequiredErrorMessage={text(
                        'Dropdown 2 Required Error Message',
                        'Select an option'
                    )}
                    dropdown3Label={text('Dropdown 3 Label', 'Average transaction amount')}
                    dropdown3Name={text('Dropdown 3 Name', 'averageTransactionAmount')}
                    dropdown3Options={object('Dropdown 3 Options', DROPDOWN_OPTIONS)}
                    dropdown3Optional={boolean('Dropdown 3 Optional', false)}
                    dropdown3RequiredErrorMessage={text(
                        'Dropdown 3 Required Error Message',
                        'Select a transaction range'
                    )}
                    emailLabel={text('Email Label', 'Email')}
                    emailInvalidErrorMessage={text(
                        'Email Invalid Error Message',
                        'Enter a valid email address'
                    )}
                    emailRequiredErrorMessage={text(
                        'Email Required Error Message',
                        'Enter your email address'
                    )}
                    field1Label={text('Field 1 Label', 'First name')}
                    field1Name={text('Field 1 Name', 'firstName')}
                    field1Optional={boolean('Field 1 Optional', false)}
                    field1RequiredErrorMessage={text(
                        'Field 1 Required Error Message',
                        'Enter your first name'
                    )}
                    field2Label={text('Field 2 Label', 'Last name')}
                    field2Name={text('Field 2 Name', 'lastName')}
                    field2Optional={boolean('Field 2 Optional', false)}
                    field2RequiredErrorMessage={text(
                        'Field 2 Required Error Message',
                        'Enter your last name'
                    )}
                    field3Label={text('Field 3 Label', 'Company')}
                    field3Name={text('Field 3 Name', 'company')}
                    field3Optional={boolean('Field 3 Optional', false)}
                    field3RequiredErrorMessage={text(
                        'Field 3 Required Error Message',
                        'Enter your company'
                    )}
                    field4Label={text('Field 4 Label', 'Job title')}
                    field4Name={text('Field 4 Name', 'jobTitle')}
                    field4Optional={boolean('Field 4 Optional', false)}
                    field4RequiredErrorMessage={text(
                        'Field 4 Required Error Message',
                        'Enter your job title'
                    )}
                    field5Label={text('Field 5 Label', 'Phone')}
                    field5Name={text('Field 5 Name', 'phone')}
                    field5Optional={boolean('Field 5 Optional', false)}
                    field5RequiredErrorMessage={text(
                        'Field 5 Required Error Message',
                        'Enter your phone number'
                    )}
                    path={text('Path', '')}
                    submitErrorTitle={text('Submit Error Title', 'Form submission error')}
                    submitErrorCtaText={text('Submit Error CTA Text', 'RETURN TO FORM')}
                    submitErrorCtaAltText={text('Submit Error CTA Alt Text', '')}
                    submitSuccessTitle={text('Submit Success Title', 'Thank you!')}
                    submitSuccessText={text(
                        'Submit Success Text',
                        'We have received your information and a KG Bank team member will reach out to you shortly.'
                    )}
                    submitSuccessCtaText={text('Submit Success CTA Text', 'RETURN TO FORM')}
                    submitSuccessCtaAltText={text('Submit Success CTA Alt Text', '')}
                    textBoxHelpText={text('Text Box Help Text', 'Tell us more about your needs')}
                    textBoxLabel={text('Text Box Label', 'How can we help')}
                    textBoxName={text('Text Box Name', 'howCanWeHelp')}
                />
            </SectionContainer>
        </Theme>
    );
};
