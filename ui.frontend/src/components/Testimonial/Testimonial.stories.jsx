import React from 'react';
import SectionContainer from '../SectionContainer';
import Testimonial from './Testimonial';
import Theme from '../_shared/Theme';
import { MEDIA_TYPE, PORTAL_MODAL_ROOT, ICONS_PATH, THEME_OPTIONS } from '../../lib/constants';
import { lorem } from '../../lib/helpers/lorem';
import html from '../../lib/helpers/htmlKnob';
import { select, text } from '@storybook/addon-knobs';

// https://storybook.js.org/docs/formats/component-story-format/

export default {
    title: 'Elements/Testimonial',
    component: Testimonial,
    includeStories: ['DefaultView'],
};

const defaultText = `<p><b>Lorem!</b> ${lorem.generateParagraphs(
    1
)}</p><p>${lorem.generateParagraphs(1)}</p>`;

const profilePhoto = ICONS_PATH + 'profile-photo-png.png';
const youtubeVideoURL = 'https://www.youtube.com/embed/YE7VzlLtp-4';

export const TestimonialOnlyView = (props) => {
    const { groupID } = props;
    let modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', PORTAL_MODAL_ROOT);
    document.querySelector('body').appendChild(modalRoot);
    return (
        <Theme theme={select('Theme of Parent Component', THEME_OPTIONS, 'light')}>
            <SectionContainer
                backgroundColor={
                    select('Theme of Parent Component', THEME_OPTIONS, 'light') === 'light'
                        ? 'white'
                        : 'darkPurple'
                }
                width="full"
            >
                <Testimonial
                    mediaType={select('Media Type', MEDIA_TYPE, 'profile-image', groupID)}
                    name={text('Name', 'John Doe', groupID)}
                    testimonial={html('Testimonial', defaultText, groupID)}
                    profileImage={text('Profile Image', profilePhoto, groupID)}
                    youtubeVideoLink={text('Youtube Link', youtubeVideoURL, groupID)}
                    youtubeThumbnail={text(
                        'Youtube video thumbnail',
                        '/magalie-st-hialire-poulin-Sik3Vh9T8J4-unsplash.jpg',
                        groupID
                    )}
                />
            </SectionContainer>
        </Theme>
    );
};

export const DefaultView = () => {
    return <TestimonialOnlyView />;
};
