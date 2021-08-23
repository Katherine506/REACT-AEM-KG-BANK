import React from 'react';
import FeaturedPost from './FeaturedPost';
import { select, text } from '@storybook/addon-knobs';
import { lorem } from '../../lib/helpers/lorem';
import { GRAPHICAL_ELEMENT, BACKGROUND_COLORS } from '../../lib/constants';
import SectionContainer from '../SectionContainer';

// https://storybook.js.org/docs/formats/component-story-format/

export default {
    title: 'Elements/Featured Post',
    component: FeaturedPost,
};

const defaultText = lorem.generateHeading(4);

const date = 'Aug. 12, 2020';
const category = 'Finance 101';
const linkText = 'Read More';

export const DefaultView = (props) => {
    const { groupID } = props;
    return (
        <SectionContainer
            backgroundColor={select(
                'Container Background Color',
                BACKGROUND_COLORS,
                BACKGROUND_COLORS[0]
            )}
        >
            <FeaturedPost
                altText={defaultText}
                date={date}
                category={category}
                categoryHeadingLevel="h3"
                description={lorem.generateParagraphs(1)}
                graphicalElement={select(
                    'Graphical Element',
                    GRAPHICAL_ELEMENT,
                    GRAPHICAL_ELEMENT[0],
                    groupID
                )}
                image="/magalie-st-hialire-poulin-Sik3Vh9T8J4-unsplash.jpg"
                linkAltText={text('Link Alt Text', '')}
                linkText={linkText}
                post="#"
                readTime={10}
                title={defaultText}
                titleHeadingLevel="h2"
            />
        </SectionContainer>
    );
};
