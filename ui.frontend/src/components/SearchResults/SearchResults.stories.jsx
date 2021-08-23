import React from 'react';
import SearchResults from './SearchResults';
import { select, text } from '@storybook/addon-knobs';
import { withQuery } from '@storybook/addon-queryparams';
import { THEME_OPTIONS } from '../../lib/constants';
import Theme from '../_shared/Theme';

// https://storybook.js.org/docs/formats/component-story-format/

export default {
    title: 'Elements/SearchResults',
    component: SearchResults,
    includeStories: ['DefaultView'],
    decorators: [withQuery],
    parameters: {
        query: {
            q: 'KG Bank',
        },
    },
};

export const DefaultView = () => {
    return (
        <div style={{ padding: '15px', width: '95%', height: '95%' }}>
            <Theme theme={select('Theme of Parent Component', THEME_OPTIONS, 'light')}>
                <SearchResults
                    noResultsText={text('No Result text', 'Sorry there were 0 results found')}
                />
            </Theme>
        </div>
    );
};
