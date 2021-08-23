import React from 'react';
import List from './List';
import { select, object } from '@storybook/addon-knobs';
import { ALIGNMENT_OPTIONS, THEME_OPTIONS } from '../../lib/constants';
import Theme from '../_shared/Theme';

// https://storybook.js.org/docs/formats/component-story-format/

export default {
    title: 'Elements/List',
    component: List,
    includeStories: ['DefaultView'],
};

const listItems = [
    {
        linkURL: '/',
        linkType: 'internal',
        linkText: 'Instant loan quote-internal',
    },
    {
        linkURL: 'https://www.google.com',
        linkType: 'external',
        linkText: 'Instant loan quote-external',
    },
    {
        linkText: 'Instant loan quote-plain text',
        linkType: 'external',
    },
];

export const ListOnlyView = (props) => {
    const { groupID } = props;
    return <List items={object('List Items', listItems, groupID)} />;
};

export const DefaultView = () => {
    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                'text-align': select('Alignment', ALIGNMENT_OPTIONS, 'left'),
            }}
        >
            <Theme theme={select('Theme of Parent Component', THEME_OPTIONS, 'light')}>
                <ListOnlyView />
            </Theme>
        </div>
    );
};
