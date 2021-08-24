import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import { Icon } from '../../index';
import styles from './Button.module.scss';
import cx from 'classnames';
import { linkService } from '@konrad/reweb-aem';
import { BUTTON_STYLES, LINK_TYPES, ICONS_PATH } from '../../../lib/constants';

const Button = (props) => {
    const {buttonStyle, linkText, linkUrl, linkType, altText, className} = props;
    const [isBackgroundPurple, setIsBackgroundPurple] = useState(false);
    const [buttonClass, setButtonClass] = useState('');
    const buttonElement = useRef(null);
    const BASE_CLASS = 'button';
    const PURPLE_DARK = 'rgb(63, 42, 86)';

    useEffect(()=> {
        if (buttonElement.current !== null) {
            let item = buttonElement.current.parentElement.parentElement;
            let heroSectionBackgroundColor = window.getComputedStyle(item).backgroundColor;

            if (heroSectionBackgroundColor === PURPLE_DARK) {
                setIsBackgroundPurple(true);
            }
        }

        let finalClass = '';
        if (buttonStyle === 'general') {
            finalClass = -isBackgroundPurple ? `${BASE_CLASS}--general-light` : `${BASE_CLASS}--general-dark`;
        } else if (buttonStyle === 'heroPrimary') {
            finalClass = `${BASE_CLASS}--hero-primary`;
        } else if (buttonStyle === 'heroSecondary') {
            finalClass = `${BASE_CLASS}--hero-secondary`;
        } else if (buttonStyle === 'linkText') {
            finalClass = `${BASE_CLASS}--link-text`;
        }

        console.log(finalClass);
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
               role= "button"
               href={`${linkUrl}.html`}
               target={`${linkType === 'internal' ? '_self' : '_blank'}`}
               ref={buttonElement}
            >
                {linkText}
            </a>
    );
};

Button.displayName = 'Button';

Button.propTypes = {
    linkText: PropTypes.string,

};

Button.defaultProps = {};

export default Button;
