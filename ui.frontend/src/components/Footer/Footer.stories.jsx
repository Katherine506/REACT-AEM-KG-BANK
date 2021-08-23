import React from 'react';
import Footer from './Footer';
import NavigationColumn from '../_shared/NavigationColumn';
import html from '../../lib/helpers/htmlKnob';
import { object } from '@storybook/addon-knobs';
import facebookIcon from '../../../public/icon-facebook.svg';
import instagramIcon from '../../../public/icon-instagram.svg';
import linkedInIcon from '../../../public/icon-linkedin.svg';
import youTubeIcon from '../../../public/icon-youtube.svg';

// https://storybook.js.org/docs/formats/component-story-format/

export default {
    title: 'Elements/Footer',
    component: Footer,
};

const LEGAL_TEXT =
    '<p>In Ontario, KG Bank Financial Inc. is licensed as mortgage brokerage 10821.</p><p>**KG Bank Customer Experience Survey – November 2019 (n=6,158)</p><p>***KG Bank data 2007–2017.</p><br/><p>© 2020, ™ ® KG Bank Financial Inc.</p>';

const LOWER_TEXT =
    '<p>KG Bank is Canada’s leading non-bank provider of responsible lending solutions. With over 235 branches coast to coast, KG Bank provides personal loans and home equity loans designed to suit today’s borrowing needs. KG Bank also partners with a wide network of businesses to deliver flexible automobile and retail point-of-sale financing programs. With roots in Canada for almost 100 years, KG Bank is committed to making a difference in local communities.</p>';

const SECONDARY_NAVIGATION_LINKS = [
    {
        type: 'internal',
        text: 'Privacy & Security',
        url: '#privacy-and-security',
    },
    {
        type: 'internal',
        text: 'Terms & conditions',
        url: '#terms-and-conditions',
    },
    {
        type: 'internal',
        text: 'Accessibility',
        url: '#accessibility',
    },
];

const SOCIAL_MEDIA_LINKS = [
    {
        altText: 'Go to KG Bank Facebook page',
        fileReference: facebookIcon,
        url: 'https://www.facebook.com/KG BankCanada/',
    },
    {
        altText: 'Go to KG Bank Instagram page',
        fileReference: instagramIcon,
        url: 'https://www.instagram.com/KG Bank/',
    },
    {
        altText: 'Go to KG Bank LinkedIn page',
        fileReference: linkedInIcon,
        url: 'https://www.linkedin.com/company/KG Bank/',
    },
    {
        altText: 'Go to KG Bank YouTube page',
        fileReference: youTubeIcon,
        url: 'https://www.youtube.com/KG Bank',
    },
];

const primaryLinks = (
    <>
        <NavigationColumn
            title="Loan types"
            items={[
                {
                    type: 'internal',
                    text: 'KG Bank overview',
                    url: '#KG Bank-overview',
                },
                {
                    type: 'internal',
                    text: 'Unsecured personal loans',
                    url: '#unsecured-personal-loans',
                },
                {
                    type: 'internal',
                    text: 'Secured personal loans',
                    url: '#secured-personal-loans',
                },
                {
                    type: 'internal',
                    text: 'Mortgages',
                    url: '#mortgages',
                },
                {
                    type: 'internal',
                    text: 'Car loan',
                    url: '#car-loan',
                },
            ]}
        />
        <NavigationColumn
            title="Loan uses"
            items={[
                {
                    type: 'internal',
                    text: 'Debt consolidation',
                    url: '#debt-consolidation',
                },
                {
                    type: 'internal',
                    text: 'Emergency',
                    url: '#emergency',
                },
                {
                    type: 'internal',
                    text: 'Car repair',
                    url: '#car-repair',
                },
                {
                    type: 'internal',
                    text: 'Home improvement',
                    url: '#home-improvement',
                },
                {
                    type: 'internal',
                    text: 'Travel & vacation',
                    url: '#travel-vacation',
                },
                {
                    type: 'internal',
                    text: 'Wedding',
                    url: '#wedding',
                },
            ]}
        />
        <NavigationColumn
            title="Insurance"
            items={[
                {
                    type: 'internal',
                    text: 'Loan insurance overview',
                    url: '#loan-insurance-overview',
                },
                {
                    type: 'internal',
                    text: 'Loan insurance claims',
                    url: '#loan-insurance-claims',
                },
            ]}
        />
        <NavigationColumn
            title="Financing"
            items={[
                {
                    type: 'internal',
                    text: 'Point-of-sale financing',
                    url: '#point-of-sale-financing',
                },
                {
                    type: 'internal',
                    text: 'Automobile financing',
                    url: '#automobile-financing',
                },
            ]}
        />
        <NavigationColumn
            title="Learn"
            items={[
                {
                    type: 'internal',
                    text: 'Blog',
                    url: '#blog',
                },
                {
                    type: 'internal',
                    text: 'FAQ',
                    url: '#faq',
                },
                {
                    type: 'internal',
                    text: 'Calculator',
                    url: '#calculator',
                },
            ]}
        />
        <NavigationColumn
            title="Company"
            items={[
                {
                    type: 'internal',
                    text: 'About us',
                    url: '#about-us',
                },
                {
                    type: 'internal',
                    text: 'Learn',
                    url: '#learn',
                },
                {
                    type: 'internal',
                    text: 'Our branches',
                    url: '#our-branches',
                },
                {
                    type: 'internal',
                    text: 'Contact us',
                    url: '#contact-us',
                },
                {
                    type: 'internal',
                    text: 'Careers',
                    url: '#careers',
                },
                {
                    type: 'internal',
                    text: 'Press release',
                    url: '#press-release',
                },
                {
                    type: 'external',
                    text: 'Sample external link',
                    url: '#sample-external-link',
                },
            ]}
        />
    </>
);

export const DefaultView = () => {
    return (
        <Footer
            legalText={html('Legal Text', LEGAL_TEXT)}
            lowerText={html('Lower Text', LOWER_TEXT)}
            secondaryNavigationLinks={object(
                'Secondary Navigation Links',
                SECONDARY_NAVIGATION_LINKS
            )}
            socialMediaLinks={object('Social Media Links', SOCIAL_MEDIA_LINKS)}
        >
            {primaryLinks}
        </Footer>
    );
};
