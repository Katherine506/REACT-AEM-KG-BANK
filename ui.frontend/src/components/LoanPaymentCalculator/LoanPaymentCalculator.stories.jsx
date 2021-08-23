import React from 'react';
import LoanPaymentCalculator from './LoanPaymentCalculator';
import SectionContainer from '../SectionContainer';
import { select, text } from '@storybook/addon-knobs';
import { LINK_TYPES } from '../../lib/constants';

// https://storybook.js.org/docs/formats/component-story-format/

export default {
    title: 'Elements/LoanPaymentCalculator',
    component: LoanPaymentCalculator,
};

export const DefaultView = () => {
    return (
        <SectionContainer>
            <LoanPaymentCalculator
                amountDefault="5000"
                amountSubtitle={text('Amount Subtitle', 'How much you want to borrow')}
                amountTitle={text('Amount Title', 'Loan amount')}
                borrowingOption1={text('Borrowing Option 1', 'Fair')}
                borrowingOption1Description={text(
                    'Borrowing Option 1 Description',
                    'Some late payments'
                )}
                borrowingOption2={text('Borrowing Option 2', 'Good')}
                borrowingOption2Description={text(
                    'Borrowing Option 2 Description',
                    'Some credit history, good to fair standing'
                )}
                borrowingOption3={text('Borrowing Option 3', 'Excellent')}
                borrowingOption3Description={text(
                    'Borrowing Option 3 Description',
                    'Well-established credit history, great standing'
                )}
                borrowingTitle={text('Borrowing Title', 'Borrowing history')}
                ctaLinkAltText={text('CTA Link Alt Text', '')}
                ctaLinkText={text('CTA Link Text', 'GET A QUOTE')}
                ctaLinkType={select('Link Type', LINK_TYPES, 'internal')}
                ctaLinkUrl={text('CTA Link URL', '/')}
                downloadText={text('Download Text', 'Download results')}
                frequencySubtitle={text('Frequency Subtitle', 'How often can you make payments?')}
                frequencyTitle={text('Frequency Title', 'Payment frequency')}
                homeownerValue={text('Homeowner Value', 'Homeowner')}
                loanTermSubtitle={text(
                    'Loan Term Subtitle',
                    'The time period you’ll need to pay back your loan'
                )}
                loanTermTitle={text('Loan Term Title', 'Loan term')}
                loanTypeSubtitle={text('Loan Type Subtitle', 'Is your loan secured or unsecured?')}
                loanTypeTitle={text('Loan Type Title', 'Loan type')}
                nonHomeownerValue={text('Non-Homeowner Value', 'Renter')}
                provinceSubtitle={text('Province Subtitle', 'The province in which you live')}
                provinceTitle={text('Province Title', 'Province')}
                resultsSubtitle={text('Results Subtitle', 'The estimated interest rate is ')}
                resultsTitle={text('Results Title', 'Estimated monthly loan payment')}
                userTypeTitle={text('User Type Title', 'Home ownership status')}
                userTypeSubtitle={text('User Type Subtitle', 'Do you rent or own your home?')}
            />
        </SectionContainer>
    );
};
