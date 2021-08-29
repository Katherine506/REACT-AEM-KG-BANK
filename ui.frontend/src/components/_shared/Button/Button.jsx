import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {Icon} from '../../index';
import styles from './Button.module.scss';
import cx from 'classnames';
import {linkService} from '@konrad/reweb-aem';
import {BUTTON_STYLES, LINK_TYPES, ICONS_PATH} from '../../../lib/constants';

const Button = (props) => {
    const {buttonStyle, linkText, linkUrl, linkType, altText, className} = props;
    const [isBackgroundDark, setIsBackgroundDark] = useState(false);
    const [buttonClass, setButtonClass] = useState('');
    const [external, setExternal] = useState(false);
    const buttonElement = useRef(null);
    const BASE_CLASS = 'button';
    const PURPLE_DARK = 'rgb(63, 42, 86)';

    useEffect(() => {
        if (buttonElement.current !== null) {
            let item = buttonElement.current.parentElement.parentElement;
            let heroSectionBackgroundColor = window.getComputedStyle(item).backgroundColor;

            if (heroSectionBackgroundColor === PURPLE_DARK) {
                setIsBackgroundDark(true);
            }
        }

        let finalClass = '';
        if (buttonStyle === 'general') {
            finalClass = isBackgroundDark
                ? `${BASE_CLASS}--general-light`
                : `${BASE_CLASS}--general-dark`;
        } else if (buttonStyle === 'heroPrimary') {
            finalClass = `${BASE_CLASS}--hero-primary`;
        } else if (buttonStyle === 'heroSecondary') {
            finalClass = `${BASE_CLASS}--hero-secondary`;
        }

        setButtonClass(finalClass);
    }, [isBackgroundDark, buttonClass]);

    const parentComponent = className && className.split('_')[0];

    return (
        linkUrl ?
         <a className={cx(styles[BASE_CLASS], `${parentComponent === 'HeroBanner' ? styles [`${BASE_CLASS}--hero`] : ''}`,
             styles[buttonClass], `${linkType === '_blank' ? styles[`${BASE_CLASS}__external`] : ''}`)}
            aria-label={altText}
            role="button"
           href={`${linkUrl}`}
            target={`${linkType === 'internal' ? '_self' : '_blank'}`}
            ref={buttonElement}
         >
             <span className={styles [`${BASE_CLASS}__text`]}> {linkText}  </span>
         </a>
        :
        <button type={"submit"}>{linkText} </button>
    );
};

Button.displayName = 'Button';

Button.propTypes = {
    linkText: PropTypes.string,

};

Button.defaultProps = {};

export default Button;
