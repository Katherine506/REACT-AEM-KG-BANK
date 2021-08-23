import React from 'react';
import { Button, Icon } from '../index';
import styles from './SearchForm.module.scss';
import { linkService } from '@konrad/reweb-aem';
import cx from 'classnames';
import URL from 'url-parse';

const SearchForm = ({ resultsPath, searchPlaceholder }) => {
    const currentUrl = new URL(window.location.href, '', true);
    const q = currentUrl.query ? currentUrl.query['q'] : '';

    return (
        <form className={cx(styles.root)} method="GET" action={linkService.get(resultsPath)}>
            <label className={cx(styles.label)} htmlFor="q">
                Search website
            </label>
            <div className={cx(styles['input-container'])}>
                <Icon
                    className={cx(styles['search-icon'])}
                    size="small"
                    url="/etc.clientlibs/kg-bank/clientlibs/clientlib-base/resources/icons/search.svg"
                />
                <input
                    className={cx(styles['input-field'])}
                    name="q"
                    id="q"
                    defaultValue={q}
                    placeholder={searchPlaceholder}
                    type="search"
                />
                <Button
                    altText="Search website"
                    buttonStyle="general"
                    className={cx(styles.button)}
                    linkText="Search"
                />
            </div>
        </form>
    );
};

SearchForm.displayName = 'SearchForm';

export default SearchForm;
