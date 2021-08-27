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
    const {children} =props;
    return (
        <section className={`tab-content`}>
            <div className={`tab-content__wrapper`}>
                {children}
            </div>
        </section>
    );
};

TabContent.displayName = 'TabContent';

TabContent.propTypes = {};

export default TabContent;
