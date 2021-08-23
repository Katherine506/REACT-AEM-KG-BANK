import React from 'react';
import SearchForm from './SearchForm';

// https://storybook.js.org/docs/formats/component-story-format/

export default {
    title: 'Elements/SearchForm',
    component: SearchForm,
};

export const DefaultView = () => {
    return <SearchForm />;
};
