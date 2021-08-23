import React, { useEffect, useState, useRef } from 'react';
import styles from './FadingContainer.module.scss';
import cx from 'classnames';
import { VISIBILITY_DELAYS, VISIBILITY_HEIGHT } from '../../lib/constants';

const FadingContainer = (props) => {
    const { children, className } = props;
    const [isVisible, setVisible] = useState(false);
    const containerRef = useRef();

    const classes = cx(className, styles[`container${isVisible ? '--visible' : ''}`]);

    useEffect(() => {
        const threshold =
            containerRef.current &&
            containerRef.current.getBoundingClientRect().height > VISIBILITY_HEIGHT
                ? VISIBILITY_DELAYS[0]
                : VISIBILITY_DELAYS[1];
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisible(entry.isIntersecting);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold }
        );
        observer.observe(containerRef.current);
        return () => observer.unobserve(containerRef.current);
    }, [containerRef]);

    return (
        <div className={classes} ref={containerRef}>
            {children}
        </div>
    );
};

FadingContainer.displayName = 'FadingContainer';

export default FadingContainer;
