import React from 'react';
import Partners from './Partners';
import { object } from '@storybook/addon-knobs';

// https://storybook.js.org/docs/formats/component-story-format/

export default {
    title: 'Elements/Partners',
    component: Partners,
    includeStories: ['DefaultView'],
};

const images = [
    { fileReference: '/AnnLousie_partner.png', altText: 'Ann Lousie' },
    { fileReference: '/AshleyHomestore_partner.png', altText: 'Ashley Homestore' },
    { fileReference: '/Midas_partner.png', altText: 'Midas' },
    { fileReference: '/TimberMart_partner.png', altText: 'Timber Mart' },
    { fileReference: '/magalie-st-hialire-poulin-Sik3Vh9T8J4-unsplash.jpg', altText: 'Owl' },
];

export const DefaultView = () => {
    return <PartnersOnlyView />;
};

export const PartnersOnlyView = (props) => {
    const { groupID } = props;
    return <Partners items={object('Logos', images, groupID)} />;
};
