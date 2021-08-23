import React from 'react';
import Header from './Header';
import AlertBanner from '../AlertBanner';
import NavigationColumn from '../_shared/NavigationColumn';
import NavigationItem from '../_shared/NavigationItem';
import html from '../../lib/helpers/htmlKnob';
import { files, object, select, text } from '@storybook/addon-knobs';
import { lorem } from '../../lib/helpers/lorem';
import { LINK_TYPES } from '../../lib/constants';
import SecondaryNavigation from '../SecondaryNavigation/SecondaryNavigation';
// https://storybook.js.org/docs/formats/component-story-format/

export default {
    title: 'Elements/Header',
    component: Header,
};

const ALERT_MESSAGE = `<p>${lorem.generateSentences(1)}</p>`;

const TERTIARY_NAVIGATION_ITEMS = [
    {
        type: 'internal',
        text: 'Francais',
        url: '#francais',
    },
    {
        type: 'internal',
        text: 'Careers',
        url: '#careers',
    },
    {
        type: 'internal',
        text: 'Contact us',
        url: '#contact-us',
    },
    {
        type: 'external',
        text: 'Sample external link',
        url: '#sample-external-link',
    },
];

const primaryNavigationItems = (
    <>
        <NavigationItem text="Loans">
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
        </NavigationItem>
        <NavigationItem text="Automobile financing" type="internal" url="#automobile-financing" />
        <NavigationItem
            text="Point-of-sale financing"
            type="internal"
            url="#point-of-sale-financing"
        />
        <NavigationItem text="About us" type="internal" url="#about-us" />
        <NavigationItem text="Learn">
            <NavigationColumn
                title="Column 1"
                items={[
                    {
                        type: 'internal',
                        text: 'Internal Link 1',
                        url: '#link-one',
                    },
                    {
                        type: 'internal',
                        text: 'Internal Link 2',
                        url: '#link-two',
                    },
                    {
                        type: 'internal',
                        text: 'Internal Link 3',
                        url: '#link-three',
                    },
                    {
                        type: 'internal',
                        text: 'Internal Link 4',
                        url: '#link-four',
                    },
                    {
                        type: 'internal',
                        text: 'Internal Link 5',
                        url: '#link-five',
                    },
                    {
                        type: 'internal',
                        text: 'Internal Link 6',
                        url: '#link-six',
                    },
                    {
                        type: 'internal',
                        text: 'Internal Link 7',
                        url: '#link-seven',
                    },
                    {
                        type: 'internal',
                        text: 'Internal Link 8',
                        url: '#link-eight',
                    },
                ]}
            />
            <NavigationColumn
                title="Column 2"
                items={[
                    {
                        type: 'external',
                        text: 'External Link 1',
                        url: '#link-one',
                    },
                    {
                        type: 'external',
                        text: 'External Link 2',
                        url: '#link-two',
                    },
                    {
                        type: 'external',
                        text: 'External Link 3',
                        url: '#link-three',
                    },
                    {
                        type: 'external',
                        text: 'External Link 4',
                        url: '#link-four',
                    },
                    {
                        type: 'external',
                        text: 'External Link 5',
                        url: '#link-five',
                    },
                ]}
            />
            <NavigationColumn
                title="Column 3"
                items={[
                    {
                        type: 'internal',
                        text: 'Internal Link 1',
                        url: '#link-one',
                    },
                    {
                        type: 'internal',
                        text: 'Internal Link 2',
                        url: '#link-two',
                    },
                    {
                        type: 'internal',
                        text: 'Internal Link 3',
                        url: '#link-three',
                    },
                    {
                        type: 'internal',
                        text: 'Internal Link 4',
                        url: '#link-four',
                    },
                    {
                        type: 'internal',
                        text: 'Internal Link 5',
                        url: '#link-five',
                    },
                ]}
            />
            <NavigationColumn
                title="Column 4"
                items={[
                    {
                        type: 'external',
                        text: 'External Link 1',
                        url: '#link-one',
                    },
                    {
                        type: 'external',
                        text: 'External Link 2',
                        url: '#link-two',
                    },
                    {
                        type: 'external',
                        text: 'External Link 3',
                        url: '#link-three',
                    },
                    {
                        type: 'external',
                        text: 'External Link 4',
                        url: '#link-four',
                    },
                    {
                        type: 'external',
                        text: 'External Link 5',
                        url: '#link-five',
                    },
                ]}
            />
            <NavigationColumn
                title="Column 5"
                items={[
                    {
                        type: 'internal',
                        text: 'Internal Link 1',
                        url: '#link-one',
                    },
                    {
                        type: 'internal',
                        text: 'Internal Link 2',
                        url: '#link-two',
                    },
                    {
                        type: 'internal',
                        text: 'Internal Link 3',
                        url: '#link-three',
                    },
                    {
                        type: 'internal',
                        text: 'Internal Link 4',
                        url: '#link-four',
                    },
                    {
                        type: 'internal',
                        text: 'Internal Link 5',
                        url: '#link-five',
                    },
                ]}
            />
            <NavigationColumn
                title="Column 6"
                items={[
                    {
                        type: 'external',
                        text: 'External Link 1',
                        url: '#link-one',
                    },
                    {
                        type: 'external',
                        text: 'External Link 2',
                        url: '#link-two',
                    },
                    {
                        type: 'external',
                        text: 'External Link 3',
                        url: '#link-three',
                    },
                    {
                        type: 'external',
                        text: 'External Link 4',
                        url: '#link-four',
                    },
                    {
                        type: 'external',
                        text: 'External Link 5',
                        url: '#link-five',
                    },
                ]}
            />
        </NavigationItem>
        <NavigationItem text="Our branches" type="external" url="#our-branches" />
    </>
);

// TODO: To be updated
// export const DefaultView = () => {
//     return (
//         <Header
//             accountLinkAltText={text('My Account Link Alt Text', 'Go to login page')}
//             accountLinkText={text('My Account Link Text', 'My account')}
//             accountLinkUrl={text('My Account Link URL', '/')}
//             ctaLinkAltText={text('Primary CTA Link Alt Text', 'Go to loan quote page')}
//             ctaLinkText={text('Primary CTA Link Text', 'GET A LOAN QUOTE')}
//             ctaLinkType={select('Primary CTA Link Type', LINK_TYPES, 'internal')}
//             ctaLinkUrl={text('Primary CTA Link URL', '/')}
//             fileReference={files(
//                 'Logo File Reference',
//                 '.jpg, .png, .svg',
//                 '/etc.clientlibs/kg-bank/clientlibs/clientlib-base/resources/logos/KG Bank-logo-light.svg'
//             )}
//             logoLinkUrl={text('Logo Link URL', '/')}
//             phoneLinkText={text('Phone Number Link Text', '800-995-2274')}
//             phoneLinkUrl={text('Phone Number Link URL', 'tel:8009952274')}
//             searchResultsUrl={text('Search Results URL', '/')}
//             tertiaryNavigationLinks={object('Tertiary Navigation Links', TERTIARY_NAVIGATION_ITEMS)}
//         >
//             {primaryNavigationItems}
//         </Header>
//     );
// };
//
// export const HeaderWithSecondaryNavigation = () => {
//     return (
//         <>
//             <DefaultView />
//             <SecondaryNavigation />
//         </>
//     );
// };
//
// export const HeaderWithAlertBanner = () => {
//     return (
//         <>
//             <DefaultView />
//             <AlertBanner text={html('Alert Message', ALERT_MESSAGE)} />
//         </>
//     );
// };
//
// export const HeaderWithSecondaryNavigationAndAlertBanner = () => {
//     return (
//         <>
//             <DefaultView />
//             <SecondaryNavigation />
//             <AlertBanner text={html('Alert Message', ALERT_MESSAGE)} />
//         </>
//     );
// };
