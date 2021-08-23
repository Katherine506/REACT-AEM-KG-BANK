import React from 'react';
import Heading from '../_shared/Heading';
import SectionContainer from './SectionContainer';
import { select } from '@storybook/addon-knobs';
import { BACKGROUND_COLORS } from '../../lib/constants';

// https://storybook.js.org/docs/formats/component-story-format/

export default {
    title: 'Elements/SectionContainer',
    component: SectionContainer,
};

export const DefaultView = () => {
    return (
        <SectionContainer
            backgroundColor={select(
                'Section Container Background Color',
                BACKGROUND_COLORS,
                BACKGROUND_COLORS[0]
            )}
        >
            <Heading
                text="Sample heading inside SectionContainer"
                alignment="left"
                headingLevel="h1"
            />
        </SectionContainer>
    );
};
