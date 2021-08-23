import React from 'react';
import FeaturedMerchants from './FeaturedMerchants';
import { select } from '@storybook/addon-knobs';
import { THEME_OPTIONS } from '../../lib/constants';
import Theme from '../_shared/Theme';

export default {
    title: 'Elements/FeaturedMerchants',
    component: FeaturedMerchants,
};

const DEFAULT_THEME = 'light';
const merchants = [
    {
        logo: '/merchants/anne.png',
        altText: 'Ann Lousie',
        linkText: 'Ann Lousie',
        industry: 'jewellery',
        linkUrl: 'https://www.google.com/',
    },
    {
        logo: '/merchants/ashley.png',
        altText: 'Ashley Homestore',
        linkText: 'Ashley Homestore',
        industry: 'homestore',
        linkUrl: 'https://www.google.com/',
    },
    {
        logo: '/merchants/midas.png',
        altText: 'Midas',
        linkText: 'Midas',
        industry: 'auto',
        linkUrl: 'https://www.google.com/',
    },
    {
        logo: '/TimberMart_partner.png',
        altText: 'Timber Mart',
        linkText: 'Timber Mart',
        industry: 'homestore',
        linkUrl: 'https://www.google.com/',
    },
    {
        logo: '/merchants/anne.png',
        altText: 'Ann Lousie',
        linkText: 'Ann Lousie',
        industry: 'jewellery',
        linkUrl: 'https://www.google.com/',
    },
    {
        logo: '/merchants/ashley.png',
        altText: 'Ashley Homestore',
        linkText: 'Ashley Homestore',
        industry: 'homestore',
        linkUrl: 'https://www.google.com/',
    },
    {
        logo: '/merchants/midas.png',
        altText: 'Midas',
        linkText: 'Midas',
        industry: 'auto',
        linkUrl: 'https://www.google.com/',
    },
    {
        logo: '/magalie-st-hialire-poulin-Sik3Vh9T8J4-unsplash.jpg',
        altText: 'Timber Mart',
        linkText: 'Timber Mart',
        linkUrl: 'https://www.google.com/',
        industry: 'homestore',
    },
    {
        logo: '/merchants/midas.png',
        altText: 'Midas',
        linkText: 'Midas',
        linkUrl: 'https://www.google.com/',
        industry: 'auto',
    },
];

export const DefaultView = () => {
    return (
        <Theme theme={select('Theme of Parent Component', THEME_OPTIONS, DEFAULT_THEME)}>
            <FeaturedMerchants merchants={merchants} />
        </Theme>
    );
};
