import React, { useEffect, useRef } from 'react';
import { t } from '@konrad/reweb-aem';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, A11y } from 'swiper';
import styles from './Carousel.module.scss';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import cx from 'classnames';
import useBreakpoint from '../../../lib/helpers/useBreakpoint';
import useAuthorMode from '../../../lib/helpers/useAuthorMode';
import {
    BREAKPOINT_MOBILE,
    BREAKPOINT_TABLET,
    BREAKPOINT_DESKTOP,
    BREAKPOINT_DESKTOP_L,
    BREAKPOINTS,
    KEYS,
} from '../../../lib/constants';

SwiperCore.use([Navigation, Pagination, A11y]);

const mapChildrenToSlides = (props, currentAuthorMode) => {
    const { children, wcChildren } = props;

    if (!children) {
        return [];
    } else if (Array.isArray(children)) {
        // This is Storybook or some other native react
        return children.map((child, index) => (
            <SwiperSlide key={index} tag="li">
                {child}
            </SwiperSlide>
        ));
    } else {
        // This is reweb
        return wcChildren.nodes
            .filter((n) => {
                // Exclude HTML comments and CQ markup if not in edit mode
                return (
                    ![Node.TEXT_NODE, Node.COMMENT_NODE, 'cq'].includes(n.nodeType) &&
                    (currentAuthorMode === 'edit' || n.tagName !== 'CQ')
                );
            })
            .map((child, index) => (
                <SwiperSlide key={index} tag="li">
                    <div ref={(ref) => ref && ref.appendChild(child)} />
                </SwiperSlide>
            ));
    }
};

const Carousel = (props) => {
    const carouselBreakpoint = BREAKPOINTS.find(
        (breakpoint) => breakpoint.name === BREAKPOINT_DESKTOP
    ).minWidth;
    const currentBreakpoint = useBreakpoint();
    const currentAuthorMode = useAuthorMode();
    const swiperRef = useRef();

    const swiperSlides = mapChildrenToSlides(props, currentAuthorMode);
    const validSlides = swiperSlides.length > 0;

    // This effect is used to attach keyboard event listeners to the previous and next buttons
    useEffect(() => {
        if (validSlides) {
            const swiperContainer = swiperRef.current;
            const previousButton = swiperContainer.querySelector('.swiper-button-prev');
            const nextButton = swiperContainer.querySelector('.swiper-button-next');

            previousButton.addEventListener('keydown', (event) => {
                if (
                    event.key === KEYS.ARROW_LEFT ||
                    event.key === KEYS.LEFT ||
                    event.key === KEYS.SPACE ||
                    event.key === KEYS.SPACEBAR
                ) {
                    swiperContainer.swiper.slidePrev();
                }
            });

            nextButton.addEventListener('keydown', (event) => {
                if (
                    event.key === KEYS.ARROW_RIGHT ||
                    event.key === KEYS.RIGHT ||
                    event.key === KEYS.SPACE ||
                    event.key === KEYS.SPACEBAR
                ) {
                    swiperContainer.swiper.slideNext();
                }
            });
        }
    }, []);

    // This effect is used to style the previous and next buttons in mobile and tablet views so that
    // they are positioned around the pagination bullets rather than around the slides
    useEffect(() => {
        if (validSlides) {
            const swiperContainer = swiperRef.current;
            const previousButton = swiperContainer.querySelector('.swiper-button-prev');
            const nextButton = swiperContainer.querySelector('.swiper-button-next');

            if (
                !previousButton.style.transform &&
                (currentBreakpoint === BREAKPOINT_MOBILE || currentBreakpoint === BREAKPOINT_TABLET)
            ) {
                const paginationContainer = swiperContainer.querySelector('.swiper-pagination');
                const paginationContainerWidth = paginationContainer.offsetWidth;

                // (Space between arrow and bullet) + (Width of arrow) = 22px
                // Amount to translate each button = (22px) + (Half the width of the pagination container)
                previousButton.style.transform = `translateX(${
                    -22 - paginationContainerWidth / 2
                }px)`;
                nextButton.style.transform = `translateX(${22 + paginationContainerWidth / 2}px)`;
            } else if (
                previousButton.style.transform &&
                (currentBreakpoint === BREAKPOINT_DESKTOP ||
                    currentBreakpoint === BREAKPOINT_DESKTOP_L)
            ) {
                previousButton.style.transform = '';
                nextButton.style.transform = '';
            }
        }
    }, [currentBreakpoint]);

    // This effect is used to give all slides a tabindex of -1 so they can be manually focused
    useEffect(() => {
        if (validSlides) {
            const swiperContainer = swiperRef.current;
            const slides = swiperContainer.getElementsByClassName('swiper-slide');
            for (let i = 0; i < slides.length; i++) {
                slides[i].setAttribute('tabindex', '-1');
            }
        }
    }, []);

    // This effect to focus the active slide after the user uses the keyboard to activate a
    // pagination bullet
    useEffect(() => {
        if (validSlides) {
            const swiperContainer = swiperRef.current;
            const bullets = swiperContainer.getElementsByClassName('swiper-pagination-bullet');
            const slides = swiperContainer.getElementsByClassName('swiper-slide');

            const bulletKeydownHandler = (event) => {
                if (
                    event.key === KEYS.ENTER ||
                    event.key === KEYS.SPACE ||
                    event.key === KEYS.SPACEBAR
                ) {
                    swiperContainer.swiper.once('slideChangeTransitionEnd', () => {
                        slides[swiperContainer.swiper.activeIndex].focus();
                    });
                }
            };

            for (let i = 0; i < bullets.length; i++) {
                bullets[i].addEventListener('keydown', bulletKeydownHandler);
            }

            return () => {
                for (let i = 0; i < bullets.length; i++) {
                    bullets[i].removeEventListener('keydown', bulletKeydownHandler);
                }
            };
        }
    }, [currentBreakpoint]);

    // This function is used to toggle the value of the 'aria-hidden' attribute on the slides when
    // the active slide or breakpoint changes
    const toggleAriaHidden = () => {
        if (validSlides) {
            const swiperContainer = swiperRef.current;
            const slides = swiperContainer.getElementsByClassName('swiper-slide');
            const activeIndex = swiperContainer.swiper.activeIndex;

            for (let i = 0; i < slides.length; i++) {
                if (window.innerWidth < carouselBreakpoint) {
                    if (i === activeIndex) {
                        slides[i].setAttribute('aria-hidden', 'false');
                    } else {
                        slides[i].setAttribute('aria-hidden', 'true');
                    }
                } else {
                    if (i === activeIndex || i === activeIndex + 1) {
                        slides[i].setAttribute('aria-hidden', 'false');
                    } else {
                        slides[i].setAttribute('aria-hidden', 'true');
                    }
                }
            }
        }
    };

    // This function is used to ensure that only visible slides can have focusable elements.
    // If the user wants to focus on elements in a slide that is off-screen, they'd have to
    // navigate to that slide first to make sure it is visible on-screen.
    const disableFocusOnInactiveSlides = () => {
        if (validSlides) {
            const swiperContainer = swiperRef.current;
            const slides = swiperContainer.getElementsByClassName('swiper-slide');

            const getFocusableElements = (node) => {
                return [
                    ...node.querySelectorAll(
                        'a[href], area[href], button, input, textarea, select, details, [contentEditable=true]'
                    ),
                ].filter((element) => !element.hasAttribute('disabled'));
            };

            for (let j = 0; j < slides.length; j++) {
                const slideFocusableChildNodes = getFocusableElements(slides[j]);

                for (let k = 0; k < slideFocusableChildNodes.length; k++) {
                    slideFocusableChildNodes[k].removeAttribute('tabindex');
                }

                const activeIndex = swiperContainer.swiper.activeIndex;
                const conditionForDisablingFocusInMobile =
                    window.innerWidth < carouselBreakpoint && j !== activeIndex;
                const conditionForDisablingFocusInDesktop =
                    window.innerWidth >= carouselBreakpoint &&
                    j !== activeIndex &&
                    j !== activeIndex + 1;

                if (conditionForDisablingFocusInMobile || conditionForDisablingFocusInDesktop) {
                    const slideFocusableChildNodes = getFocusableElements(slides[j]);

                    for (let l = 0; l < slideFocusableChildNodes.length; l++) {
                        slideFocusableChildNodes[l].setAttribute('tabindex', '-1');
                    }
                }
            }
        }
    };

    return validSlides ? (
        <div className={cx(styles.root)}>
            <div className={cx(styles['swiper-wrapper'])}>
                <Swiper
                    a11y={{
                        prevSlideMessage: t('Go to the previous slide'),
                        nextSlideMessage: t('Go to the next slide'),
                        firstSlideMessage: t('This is the first slide'),
                        lastSlideMessage: t('This is the last slide'),
                        paginationBulletMessage: t('Go to slide {{index}}'),
                    }}
                    breakpoints={{
                        0: {
                            slidesPerGroup: 1,
                            slidesPerView: 1,
                            spaceBetween: 8,
                        },
                        [carouselBreakpoint]: {
                            slidesPerGroup: 1,
                            slidesPerView: 2,
                            spaceBetween: 24,
                        },
                    }}
                    navigation
                    pagination={{
                        bulletElement: 'button',
                        clickable: true,
                    }}
                    ref={swiperRef}
                    wrapperTag="ul"
                    onBreakpoint={() => {
                        toggleAriaHidden();
                        disableFocusOnInactiveSlides();
                    }}
                    onInit={() => {
                        // After all CSS is loaded (swiper container dimensions are finalized),
                        // update the Swiper to ensure that the width of each child is correct
                        setTimeout(() => {
                            swiperRef.current.swiper.update();
                        }, 0);
                    }}
                    onSlideChangeTransitionEnd={() => {
                        toggleAriaHidden();
                        disableFocusOnInactiveSlides();
                    }}
                >
                    {swiperSlides}
                </Swiper>
            </div>
        </div>
    ) : null;
};

Carousel.displayName = 'Carousel';

export default Carousel;
