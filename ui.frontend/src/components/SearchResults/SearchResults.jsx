import React, { useEffect, useState } from 'react';
import styles from './SearchResults.module.scss';
import PropTypes from 'prop-types';
import cx from 'classnames';
import axios from 'axios';
import Text from '../_shared/Text';
import { t } from '@konrad/reweb-aem';
import Heading from '../_shared/Heading';
import Button from '../_shared/Button';
import LinkBase from '../_shared/Link/LinkBase';
import URL from 'url-parse';

const SearchResults = (props) => {
    const { noResultsText } = props;

    const SEARCH_PATH_DEFAULT = '/bin/search.json';
    const DEFAULT_LANG_PATH = '/content/kg-bank/us/en';

    const [totalResults, setTotalResults] = useState(0);
    const [searchResults, setSearchResults] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [queryString, setQueryString] = useState('');

    const resetResultInfo = () => {
        setTotalResults(0);
        setSearchResults([]);
        setTotalPages(0);
        setCurrentPage(1);
    };

    useEffect(() => {
        resetResultInfo();
        let url = new URL(window.location.href, '', true);
        let queryParameters = url.query;
        let q = queryParameters ? queryParameters['q'] : '';
        setQueryString(q);
    }, []);

    useEffect(() => {
        (async function () {
            if (queryString && currentPage) {
                setIsLoading(true);
                await callSearchApi(queryString, currentPage);
                setIsLoading(false);
            } else if (currentPage) {
                //When no query parameter is present, but currentPage is set. (Shouldn't come to this page; validation should stop SearchForm from submitting)
                setIsLoading(false);
            }
        })();
    }, [queryString, currentPage]);

    const callSearchApi = async (queryString, currentPage) => {
        let from = document.body.getAttribute('data-page-path') || DEFAULT_LANG_PATH;
        let urlWithQuery = `${SEARCH_PATH_DEFAULT}?q=${queryString}&page=${currentPage}&from=${from}`;
        try {
            let response = await axios.get(urlWithQuery);
            let data = response.data;
            let newSearchResults = [];
            if (data) {
                const { totalResultCount, pageCount, results } = data;
                results.forEach((result) => {
                    newSearchResults.push({
                        title: result.fields.title,
                        description: result.fields.description,
                        url: result.fields.url,
                    });
                });
                setSearchResults((searchResults) => searchResults.concat(newSearchResults));
                setTotalResults(totalResultCount);
                setTotalPages(pageCount);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const isButtonVisible = () => {
        return currentPage < totalPages;
    };

    const isSearchResultLoaded = () => {
        return !(totalResults === 0 && isLoading);
    };

    const fetchNextResultPage = () => {
        if (!isLoading) {
            setCurrentPage(currentPage + 1);
        }
    };

    const buttonText = t('VIEW MORE');

    const results = searchResults.map((searchResult, index) => (
        <div
            className={cx(
                styles.result,
                index === searchResults.length - 1 ? styles['last-result'] : ''
            )}
            key={index}
        >
            <LinkBase url={searchResult.url} className={cx(styles.anchor)}>
                <Heading
                    headingLevel="h2"
                    text={searchResult.title}
                    className={cx(styles.title)}
                    overrideStyle="large"
                />
                {searchResult.description && (
                    <Text content={searchResult.description} className={cx(styles.description)} />
                )}
            </LinkBase>
        </div>
    ));

    const spinner = (
        <>
            <div className={cx(styles['dbl-spinner-1'])} />
            <div className={cx(styles['dbl-spinner-2'])} />
        </>
    );

    return (
        <>
            {isSearchResultLoaded() ? (
                <div className={cx(styles.container)}>
                    <Text
                        content={totalResults ? t(`${totalResults} results found`) : noResultsText}
                        className={cx(styles.text)}
                    />
                    {results}
                    {isButtonVisible() && (
                        <div className={cx(styles['button-spinner-container'])}>
                            <Button
                                linkText={buttonText}
                                altText={buttonText}
                                onClick={fetchNextResultPage}
                                disabled={isLoading}
                                className={cx(styles.button)}
                            />
                            <div className={cx(styles['spinner-secondary'])}>
                                {isLoading && spinner}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className={cx(styles.container)}>
                    <div className={cx(styles['spinner-main'])}>{spinner}</div>
                </div>
            )}
        </>
    );
};

SearchResults.displayName = 'SearchResults';

SearchResults.propTypes = {
    noResultsText: PropTypes.string.isRequired,
};

SearchResults.defaultProps = {
    noResultsText: '',
};

export default SearchResults;
