import React from 'react';
import Media from './Media';
import { select, text } from '@storybook/addon-knobs';
import { HORIZONTAL_ALIGNMENT, GRAPHICAL_ELEMENT, PORTAL_MODAL_ROOT } from '../../../lib/constants';
import { SectionContainer } from '../../index';

// https://storybook.js.org/docs/formats/component-story-format/

export default {
    title: 'Elements/Media',
    component: Media,
    includeStories: ['DefaultView', 'VideoView'],
};

export const ImageOnlyView = (props) => {
    const { groupID } = props;
    return (
        <SectionContainer>
            <Media
                altText={text('Alt Text', '', groupID)}
                fileReference="/magalie-st-hialire-poulin-Sik3Vh9T8J4-unsplash.jpg"
                graphicalElement={select(
                    'Graphical Element',
                    GRAPHICAL_ELEMENT,
                    GRAPHICAL_ELEMENT[1],
                    groupID
                )}
                horizontalAlignment={select(
                    'Horizontal Alignment',
                    HORIZONTAL_ALIGNMENT,
                    HORIZONTAL_ALIGNMENT[0],
                    groupID
                )}
            />
        </SectionContainer>
    );
};

export const VideoOnlyView = (props) => {
    const { groupID } = props;
    let modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', PORTAL_MODAL_ROOT);
    document.querySelector('body').appendChild(modalRoot);
    return (
        <>
            <Media
                altText={text('Alt Text', '', groupID)}
                videoLink={'https://www.youtube.com/embed/YE7VzlLtp-4'}
                fileReference="/magalie-st-hialire-poulin-Sik3Vh9T8J4-unsplash.jpg"
                graphicalElement={select(
                    'Graphical Element',
                    GRAPHICAL_ELEMENT,
                    GRAPHICAL_ELEMENT[0],
                    groupID
                )}
                horizontalAlignment={select(
                    'Horizontal Alignment',
                    HORIZONTAL_ALIGNMENT,
                    HORIZONTAL_ALIGNMENT[0],
                    groupID
                )}
            />
        </>
    );
};

export const DefaultView = () => {
    return <ImageOnlyView />;
};

export const VideoView = () => {
    return <VideoOnlyView />;
};
