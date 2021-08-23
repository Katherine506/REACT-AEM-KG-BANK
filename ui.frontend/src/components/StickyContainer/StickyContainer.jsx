import React, { useRef, useEffect } from 'react';
import styles from './StickyContainer.module.scss';
import cx from 'classnames';
import { PORTAL_STICKY_CONTAINER_ROOT } from '../../lib/constants';
import useBreakpoint from '../../lib/helpers/useBreakpoint';
import StickyContainerService from '../../lib/services/stickyContainerService';
import useAuthorMode from '../../lib/helpers/useAuthorMode';
import useInterval from '../../lib/services/useInterval';
import SecondaryNavigation from '../SecondaryNavigation/SecondaryNavigation';

const StickyContainer = (props) => {
    const { children } = props;

    const containerRef = useRef();
    const previousScroll = useRef(0);
    const currentAuthorMode = useAuthorMode();

    const isEditMode = currentAuthorMode === 'edit';
    const CLASS_STICKY = 'sticky';
    const CLASS_TRANSITIONING = 'transitioning';
    const REFRESH_INTERVAL = 300;

    const handleScroll = () => {
        const containerElement = containerRef.current;
        if (containerElement) {
            const docBody = document.documentElement || document.body.parentNode || document.body;
            const hasOffset = window.pageYOffset !== undefined;
            const scrollTop = hasOffset ? window.pageYOffset : docBody.scrollTop;
            const headerSize = containerElement.clientHeight;

            const isScrollingDown = scrollTop > previousScroll.current;
            const isAlreadySticky = containerElement.classList.contains(CLASS_STICKY);

            if (isScrollingDown) {
                if (isAlreadySticky && scrollTop >= headerSize) {
                    containerElement.classList.remove(CLASS_STICKY);
                }

                if (!isAlreadySticky && scrollTop >= headerSize) {
                    containerElement.classList.add(CLASS_TRANSITIONING);
                }
            } else {
                if (!isAlreadySticky) {
                    containerElement.classList.add(CLASS_TRANSITIONING);
                    setTimeout(() => {
                        containerElement.classList.add(CLASS_STICKY);
                    }, 1);
                }
            }

            if (!scrollTop) {
                containerElement.classList.remove(CLASS_STICKY);
                containerElement.classList.remove(CLASS_TRANSITIONING);
            }

            previousScroll.current = scrollTop;
        }
    };

    const adjustMarginTop = () => {
        const containerElement = containerRef.current;
        if (containerElement) {
            const mainSection = document.querySelector('body > .root');
            if (mainSection) {
                const headerSize = containerElement.clientHeight;
                mainSection.style.paddingTop = isEditMode ? '0px' : `${headerSize}px`;
                mainSection.setAttribute('data-sticky-height', headerSize);
            }
        }
    };

    useInterval(
        () => {
            adjustMarginTop();
        },
        REFRESH_INTERVAL,
        true
    );

    useEffect(() => {
        if (!isEditMode) {
            window.addEventListener('scroll', handleScroll);
            adjustMarginTop();
            StickyContainerService.mountedContainer();
            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }
    }, []);

    return (
        <div ref={containerRef} className={cx(styles.root, 'sticky-container')}>
            {children}
            <div id={PORTAL_STICKY_CONTAINER_ROOT}></div>
            <SecondaryNavigation />
        </div>
    );
};

StickyContainer.displayName = 'StickyContainer';

StickyContainer.propTypes = {};

export default StickyContainer;
