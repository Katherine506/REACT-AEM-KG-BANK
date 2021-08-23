import React from 'react';
import ContactUsAutoForm from './ContactUsAutoForm';
import SectionContainer from '../SectionContainer';
import Theme from '../_shared/Theme';
import { boolean, object, select, text } from '@storybook/addon-knobs';
import { THEME_OPTIONS } from '../../lib/constants';

// https://storybook.js.org/docs/formats/component-story-format/

export default {
    title: 'Elements/ContactUsAutoForm',
    component: ContactUsAutoForm,
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
                <ContactUsAutoForm
                    ctaText={text('CTA Text', 'SUBMIT')}
                    ctaAltText={text('CTA Alt Text', '')}
                    dropdown1Label={text('Dropdown 1 Label', 'Job title')}
                    dropdown1Name={text('Dropdown 1 Name', 'jobTitle')}
                    dropdown1Options={object('Dropdown 1 Options', DROPDOWN_OPTIONS)}
                    dropdown1Optional={boolean('Dropdown 1 Optional', false)}
                    dropdown1RequiredErrorMessage={text(
                        'Dropdown 1 Required Error Message',
                        'Select your job title'
                    )}
                    dropdown2Label={text('Dropdown 2 Label', 'Years in business')}
                    dropdown2Name={text('Dropdown 2 Name', 'yearsInBusiness')}
                    dropdown2Options={object('Dropdown 2 Options', DROPDOWN_OPTIONS)}
                    dropdown2Optional={boolean('Dropdown 2 Optional', false)}
                    dropdown2RequiredErrorMessage={text(
                        'Dropdown 2 Required Error Message',
                        'Enter the amount of years'
                    )}
                    dropdown3Label={text('Dropdown 3 Label', 'Average deal')}
                    dropdown3Name={text('Dropdown 3 Name', 'averageDeal')}
                    dropdown3Options={object('Dropdown 3 Options', DROPDOWN_OPTIONS)}
                    dropdown3Optional={boolean('Dropdown 3 Optional', false)}
                    dropdown3RequiredErrorMessage={text(
                        'Dropdown 3 Required Error Message',
                        'Select a range'
                    )}
                    dropdown4Label={text('Dropdown 4 Label', 'Number of cars')}
                    dropdown4Name={text('Dropdown 4 Name', 'numberOfCars')}
                    dropdown4Options={object('Dropdown 4 Options', DROPDOWN_OPTIONS)}
                    dropdown4Optional={boolean('Dropdown 4 Optional', false)}
                    dropdown4RequiredErrorMessage={text(
                        'Dropdown 4 Required Error Message',
                        'Select a number'
                    )}
                    dropdown5Label={text('Dropdown 5 Label', 'How did you hear about us?')}
                    dropdown5Name={text('Dropdown 5 Name', 'howDidYouHearAboutUs')}
                    dropdown5Options={object('Dropdown 5 Options', DROPDOWN_OPTIONS)}
                    dropdown5Optional={boolean('Dropdown 5 Optional', false)}
                    dropdown5RequiredErrorMessage={text(
                        'Dropdown 5 Required Error Message',
                        'Select an option'
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
                    field3Label={text('Field 3 Label', 'Dealership')}
                    field3Name={text('Field 3 Name', 'dealership')}
                    field3Optional={boolean('Field 3 Optional', false)}
                    field3RequiredErrorMessage={text(
                        'Field 3 Required Error Message',
                        'Enter your dealership name'
                    )}
                    field4Label={text('Field 4 Label', 'Phone')}
                    field4Name={text('Field 4 Name', 'phone')}
                    field4Optional={boolean('Field 4 Optional', false)}
                    field4RequiredErrorMessage={text(
                        'Field 4 Required Error Message',
                        'Enter your phone number'
                    )}
                    path={text('Path', '')}
                    provinceLabel={text('Province Label', 'Province')}
                    provinceName={text('Province Name', 'province')}
                    provinceOptions={object('Province Options', DROPDOWN_OPTIONS)}
                    provinceRequiredErrorMessage={text(
                        'Province Required Error Message',
                        'Select your province'
                    )}
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
