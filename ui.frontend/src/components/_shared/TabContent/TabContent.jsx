import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import useAuthorMode from '../../../lib/helpers/useAuthorMode';
import styles from './TabContent.module.scss';
import cx from 'classnames';
import TabService from '../../../lib/services/tabService';
import { KEYS } from '../../../lib/constants';
import {Media} from "../../index";
import Heading from "../Heading";

const TabContent = (props) => {
    const {title, id, altText,children} =props;
    return (
        <section className={`tab-content`}>
            <div className={`tab-content__wrapper`}>
                <div className={`tab-title`}>
                    <h2 className={`tab-title__title`}>{title}</h2>
                </div>
                <div className={`content-media__info`}>
                    {children}
                </div>

            </div>
        </section>
    );
};

TabContent.displayName = 'TabContent';

TabContent.propTypes = {

    title: PropTypes.string.isRequired,
    id: PropTypes.number

};

export default TabContent;
