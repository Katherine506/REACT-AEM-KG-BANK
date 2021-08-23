import React from 'react';
import TabContainer from './TabContainer';
import TabContent from '../_shared/TabContent';
import Button from '../_shared/Button';
import ContentWithMedia from '../ContentWithMedia';
import Heading from '../_shared/Heading';
import List from '../List';
import SectionContainer from '../SectionContainer';
import Text from '../_shared/Text';
import Theme from '../_shared/Theme';
import { select, text } from '@storybook/addon-knobs';
import { lorem } from '../../lib/helpers/lorem';
import {
    DESKTOP_POSITION,
    GRAPHICAL_ELEMENT,
    MOBILE_POSITION,
    THEME_OPTIONS,
} from '../../lib/constants';

// https://storybook.js.org/docs/formats/component-story-format/

export default {
    title: 'Elements/TabContainer',
    component: TabContainer,
};

const TabContentExample = (props) => {
    return <TabContent></TabContent>;
};

export const DefaultView = () => {
    return <Theme theme={select('Theme of Parent Component', THEME_OPTIONS, 'light')}></Theme>;
};
