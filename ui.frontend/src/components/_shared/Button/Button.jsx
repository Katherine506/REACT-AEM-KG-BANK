import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '../../index';
import styles from './Button.module.scss';
import cx from 'classnames';
import { linkService } from '@konrad/reweb-aem';
import { BUTTON_STYLES, LINK_TYPES, ICONS_PATH } from '../../../lib/constants';
const block = 'btn';

const Button = (props) => {
    const {url, text } = props;

    const block = 'btn';

    return(
        <div className={`${block}`}>
            <div className={`${block}__container`}>
            <a className={`${block}__container-ref`} href={url}>
                <button className={`${block}__container-btn`}>Kat</button>
            </a>
            </div>
        </div>
    )
};

Button.displayName = 'Button';

Button.propTypes = {};

Button.defaultProps = {};

export default Button;
