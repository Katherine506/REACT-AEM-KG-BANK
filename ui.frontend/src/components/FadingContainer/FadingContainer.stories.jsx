import React from 'react';
import FadingContainer from './FadingContainer';
import { lorem } from '../../lib/helpers/lorem';
import { Heading, Text } from '../index';

export default {
    title: 'Elements/FadingContainer',
    component: FadingContainer,
};

const defaultHeading = lorem.generateHeading(3);
const defaultSentence = lorem.generateParagraphs(1);

export const DefaultView = (props) => {
    return (
        <>
            <div style={{ height: '100vh' }}></div>
            <FadingContainer>
                <Heading headingLevel={'h3'} text={defaultHeading} />
                <Text content={defaultSentence} />
            </FadingContainer>
        </>
    );
};
