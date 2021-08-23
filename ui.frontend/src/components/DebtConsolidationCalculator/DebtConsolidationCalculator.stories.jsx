import React from 'react';
import DebtConsolidationCalculator from './DebtConsolidationCalculator';
import SectionContainer from '../SectionContainer';
import { object, select, text } from '@storybook/addon-knobs';
import { LINK_TYPES } from '../../lib/constants';

// https://storybook.js.org/docs/formats/component-story-format/

export default {
    title: 'Elements/DebtConsolidationCalculator',
    component: DebtConsolidationCalculator,
};

const DEBT_TYPE_OPTIONS = [
    {
        name: 'Credit card',
    },
    {
        name: 'Personal loan',
    },
    {
        name: 'Automobile loan',
    },
    {
        name: 'Student loan',
    },
    {
        name: 'Retail financing loan',
    },
    {
        name: 'Other',
    },
];

export const DefaultView = () => {
    return (
        <SectionContainer>
            <DebtConsolidationCalculator
                ctaLinkAltText={text('CTA Link Alt Text', '')}
                ctaLinkText={text('CTA Link Text', 'GET A QUOTE')}
                ctaLinkType={select('Link Type', LINK_TYPES, 'internal')}
                ctaLinkUrl={text('CTA Link URL', '/')}
                debtBalanceDefault="3000"
                debtBalanceErrorMessage={text(
                    'Debt Balance Error Message',
                    'Please enter a number between 100 and 20,000.'
                )}
                debtBalanceSubtitle={text('Debt Balance Subtitle', 'Min - $100, Max - $20,000')}
                debtBalanceTitle={text('Debt Balance Title', 'Balance owing')}
                debtTypeOptions={object('Debt Type Options', DEBT_TYPE_OPTIONS)}
                debtTypeTitle={text('Debt Type Title', 'Debt type')}
                downloadText={text('Download Text', 'Download results')}
                interestDefault="15.0"
                interestErrorMessage={text(
                    'Interest Error Message',
                    'Please enter a number between 0 and 60.'
                )}
                interestSubtitle={text('Interest Subtitle', 'Interest rate on this bill')}
                interestTitle={text('Interest Title', 'Interest')}
                monthlyPaymentDefault="100"
                monthlyPaymentErrorMessage={text(
                    'Monthly Payment Error Message',
                    'Please enter a number between 10 and 999.'
                )}
                monthlyPaymentSubtitle={text(
                    'Monthly Payment Subtitle',
                    'The amount you pay every month.'
                )}
                monthlyPaymentTitle={text('Monthly Payment Title', 'Monthly payment')}
                newBillText={text('New Bill Text', 'Add another bill')}
                totalDebtBalanceErrorMessage={text(
                    'Total Debt Balance Error Message',
                    'Total balance amounts cannot exceed $20,000.'
                )}
            />
        </SectionContainer>
    );
};
