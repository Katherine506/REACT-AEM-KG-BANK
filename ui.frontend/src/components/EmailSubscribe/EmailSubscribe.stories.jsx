import React from 'react';
import EmailSubscribe from './EmailSubscribe';
import SectionContainer from '../SectionContainer';
import Theme from '../_shared/Theme';
import { select, text } from '@storybook/addon-knobs';
import { THEME_OPTIONS } from '../../lib/constants';

// https://storybook.js.org/docs/formats/component-story-format/

export default {
    title: 'Elements/EmailSubscribe',
    component: EmailSubscribe,
};

export const DefaultView = () => {
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
                <EmailSubscribe
                    ctaText={text('CTA Text', 'SIGN UP')}
                    ctaAltText={text('CTA Alt Text', '')}
                    emailHelperText={text('Email Helper Text', 'Email address')}
                    emailInvalidErrorMessage={text(
                        'Email Invalid Error Message',
                        'Enter a valid email address'
                    )}
                    emailRequiredErrorMessage={text(
                        'Email Required Error Message',
                        'Enter your email address'
                    )}
                    newsletterPromptLabel={text(
                        'Newsletter Prompt Label',
                        'Opt in to receive monthly newsletters and updates'
                    )}
                    newsletterPromptRequiredErrorMessage={text(
                        'Newsletter Prompt Required Error Message',
                        'Check opt-in to receive communications'
                    )}
                    path={text('Path', '')}
                    submitSuccessText={text(
                        'Submit Success Text',
                        'Thank you! You have signed up successfully.'
                    )}
                />
            </SectionContainer>
        </Theme>
    );
};
