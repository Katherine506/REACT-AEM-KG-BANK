import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import { Icon } from '../../index';
import styles from './Button.module.scss';
import cx from 'classnames';
import { linkService } from '@konrad/reweb-aem';
import { BUTTON_STYLES, LINK_TYPES, ICONS_PATH } from '../../../lib/constants';

const Button = (props) => {
    const {linkText, linkUrl, altText, linkType, buttonStyle, className} = props;
    const [isBackgroundPurple, setIsBackgroundPurple] = useState(false);
    const [buttonClass, setButtonClass] = useState('');
    const buttomElement = useRef(null);
    const BASE_CLASS = 'buttom';
    const PURPLE_DARK = 'rgb(63, 42, 86)';

    useEffect(()=> {
        if (buttomElement.current !== null) {
            let item = buttomElement.current.parentElement.parentElement;
            let heroSectionBackgroundColor = window.getComputedStyle(item).backgroundColor;

            if (heroSectionBackgroundColor === PURPLE_DARK) {
                setIsBackgroundPurple(true);
            }
        }

        let finalClass = '';
        if (buttonStyle === 'general') {
            finalClass = -isBackgroundPurple ? `${BASE_CLASS}--genral-light` : `${BASE_CLASS}--genral-dark`;
        } else if (buttonStyle === 'heroPrimary') {
            finalClass = `${BASE_CLASS}--hero-primary`;
        } else if (buttonStyle === 'heroSecondary') {
            finalClass = `${BASE_CLASS}--hero-secondary`;
        } else if (buttonStyle === 'linkText') {
            finalClass = `${BASE_CLASS}--link-text`;
        }

        setButtonClass(finalClass);
    }, [isBackgroundPurple, buttonClass]);

        const  parentComponent = className && className.split('_')[0];

        return(
            <a className={cx(
                styles[BASE_CLASS],
                `${parentComponent === 'HeroBanner' && styles [`${BASE_CLASS}--hero`]}`,
                styles[buttonClass]
                )}
                aria-label={altText}
               role= "buttom"
               href={`${linkUrl}.html`}
               target={`${linkType === 'internal' ? '_self' : '_blank'}`}
               ref={buttomElement}
            >
                {linkText}
            </a>
    );
};

Button.displayName = 'Button';

Button.propTypes = {};

Button.defaultProps = {};

export default Button;
