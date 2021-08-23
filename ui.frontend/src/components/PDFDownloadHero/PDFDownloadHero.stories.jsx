import React from 'react';
import PDFDownloadHero from './PDFDownloadHero';
import Statistics from '../Statistics';
import { boolean, object, text } from '@storybook/addon-knobs';

// https://storybook.js.org/docs/formats/component-story-format/

export default {
    title: 'Elements/PDFDownloadHero',
    component: PDFDownloadHero,
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

const STATISTIC_ITEMS = [
    {
        statistic: '15.4',
        subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    },
    {
        statistic: '66%',
        subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    },
    {
        statistic: '1,000,000',
        subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    },
    {
        statistic: '300,000',
        subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    },
];

export const DefaultView = () => {
    return (
        <PDFDownloadHero
            ctaAltText={text('CTA Alt Text', '')}
            ctaText={text('CTA Text', 'DOWNLOAD')}
            dropdown1Label={text('Dropdown 1 Label', 'Industry')}
            dropdown1Name={text('Dropdown 1 Name', 'industry')}
            dropdown1Options={object('Dropdown 1 Options', DROPDOWN_OPTIONS)}
            dropdown1Optional={boolean('Dropdown 1 Optional', false)}
            dropdown1RequiredErrorMessage={text(
                'Dropdown 1 Required Error Message',
                'Choose an industry'
            )}
            dropdown2Label={text('Dropdown 2 Label', 'Job title')}
            dropdown2Name={text('Dropdown 2 Name', 'jobTitle')}
            dropdown2Options={object('Dropdown 2 Options', DROPDOWN_OPTIONS)}
            dropdown2Optional={boolean('Dropdown 2 Optional', false)}
            dropdown2RequiredErrorMessage={text(
                'Dropdown 2 Required Error Message',
                'Select your job title'
            )}
            dropdown3Label={text('Dropdown 3 Label', 'Geography')}
            dropdown3Name={text('Dropdown 3 Name', 'geography')}
            dropdown3Options={object('Dropdown 3 Options', DROPDOWN_OPTIONS)}
            dropdown3Optional={boolean('Dropdown 3 Optional', false)}
            dropdown3RequiredErrorMessage={text(
                'Dropdown 3 Required Error Message',
                'Select your geographical region'
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
            formHeading={text('Form Heading', 'View our findings')}
            formSubheading={text('Form Subheading', 'First, tell us a bit about yourself.')}
            newsletterPromptLabel={text(
                'Newsletter Prompt Label',
                'Opt in to receive monthly newsletters and updates'
            )}
            path={text('Path', '')}
            pdfPath={text('PDF Path', '/sample-pdf.pdf')}
            submitErrorTitle={text('Submit Error Title', 'Form submission error')}
            submitErrorCtaText={text('Submit Error CTA Text', 'RETURN TO FORM')}
            submitErrorCtaAltText={text('Submit Error CTA Alt Text', '')}
            submitSuccessTitle={text('Submit Success Title', 'Thank you!')}
            submitSuccessText={text(
                'Submit Success Text',
                'Your PDF download should begin shortly.'
            )}
            submitSuccessCtaText={text('Submit Success CTA Text', 'RETURN TO FORM')}
            submitSuccessCtaAltText={text('Submit Success CTA Alt Text', '')}
            subtitle={text(
                'Subtitle',
                'Book more deals with the right customer experience: 3 steps to take right now'
            )}
            title={text('Title', 'Non-prime vehicle financing in Canada')}
        >
            <Statistics items={object('Statistic Items', STATISTIC_ITEMS)} />
        </PDFDownloadHero>
    );
};
