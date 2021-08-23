import React from 'react';
import HeroBanner from './HeroBanner';
import { object, select, text } from '@storybook/addon-knobs';
import { LINK_TYPES, SAMPLE_ICONS } from '../../lib/constants';

// https://storybook.js.org/docs/formats/component-story-format/

export default {
    title: 'Elements/HeroBanner',
    component: HeroBanner,
};

const ITEMS = [
    {
        whiteText: 'Quick personal loans',
        orangeText: '$500 - $35,000',
    },
    {
        whiteText: 'Automobile',
        orangeText: 'financing',
    },
    {
        whiteText: 'Point-of-sale',
        orangeText: 'financing and some more very very very very very very very long text',
    },
];

export const Primary = () => {
    return (
        <HeroBanner
            buttonContextIconUrl={select(
                'Button Context Icon URL',
                SAMPLE_ICONS,
                SAMPLE_ICONS['Communication (Mail)']
            )}
            buttonContextText={text(
                'Button Context Text',
                'Getting a loan quote does not impact your credit score'
            )}
            designType="primary"
            primaryCtaLinkAltText={text('Primary CTA Link Alt Text', '')}
            primaryCtaLinkText={text('Primary CTA Link Text', 'GET A LOAN QUOTE')}
            primaryCtaLinkType={select('Primary CTA Link Type', LINK_TYPES, 'internal')}
            primaryCtaLinkUrl={text('Primary CTA Link URL', '/')}
            secondaryCtaLinkAltText={text('Secondary CTA Link Alt Text', '')}
            secondaryCtaLinkText={text('Secondary CTA Link Text', 'CALCULATE LOAN PAYMENT')}
            secondaryCtaLinkType={select('Secondary CTA Link Type', LINK_TYPES, 'internal')}
            secondaryCtaLinkUrl={text('Secondary CTA Link URL', '/')}
            items={object('Items', ITEMS)}
            title={text('Title', 'Trusted by Canadians for almost 100 years.')}
        />
    );
};

export const Secondary = () => {
    return (
        <HeroBanner
            designType="secondary"
            primaryCtaLinkAltText={text('Primary CTA Link Alt Text', '')}
            primaryCtaLinkText={text('Primary CTA Link Text', 'GET A LOAN QUOTE')}
            primaryCtaLinkType={select('Primary CTA Link Type', LINK_TYPES, 'internal')}
            primaryCtaLinkUrl={text('Primary CTA Link URL', '/')}
            subtitle={text(
                'Subtitle',
                'Leverage the equity in your home to maximize your borrowing power. Get a mortgage loan up to $400,000, with affordable payments and rates from 12.99%.'
            )}
            title={text('Title', 'Affordable, accessible mortage loans and mortgage refinancing')}
        />
    );
};

export const Tertiary = () => {
    return (
        <HeroBanner
            designType="tertiary"
            primaryCtaLinkAltText={text('Primary CTA Link Alt Text', '')}
            primaryCtaLinkText={text('Primary CTA Link Text', 'GET A LOAN QUOTE')}
            primaryCtaLinkType={select('Primary CTA Link Type', LINK_TYPES, 'internal')}
            primaryCtaLinkUrl={text('Primary CTA Link URL', '/')}
            subtitle={text(
                'Subtitle',
                'Grow and manage your business with KG Bank Point-of-Sale Financing, and gain a leap forward with KG Bank PurplPay, our omnichannel digital platform, flexible consumer financing plans and ongoing program support.'
            )}
            title={text('Title', 'Personal loans that fit your life')}
        />
    );
};
