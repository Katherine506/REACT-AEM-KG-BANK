import React from 'react';
import PhoneNumber from './PhoneNumber';
import { text } from '@storybook/addon-knobs';
import { DARK_THEME } from '../../lib/constants';
import Theme from '../_shared/Theme';

// https://storybook.js.org/docs/formats/component-story-format/

export default {
    title: 'Elements/Phone Number',
    component: PhoneNumber,
};

const defaultText = 'Call KG Bank';
const defaultNumber = '+1 234 567 890';

export const DefaultView = (props) => {
    const { groupID } = props;
    return (
        <Theme theme={DARK_THEME}>
            <PhoneNumber
                phoneNumber={text('Phone Number', defaultNumber, groupID)}
                altText={text('Answer Text', defaultText, groupID)}
            />
        </Theme>
    );
};
