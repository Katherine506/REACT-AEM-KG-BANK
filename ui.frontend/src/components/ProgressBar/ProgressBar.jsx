import React, { useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import styles from './ProgressBar.module.scss';

const ProgressBar = () => {
    const progressBarRef = useRef();
    const [width, setWidth] = useState(0);

    useEffect(() => {
        let progressBar = progressBarRef.current;
        if (progressBar) {
            let body = document.body,
                html = document.documentElement;
            const setProgress = () => {
                let totalHeight = Math.max(
                    body.scrollHeight,
                    body.offsetHeight,
                    body.clientHeight,
                    html.clientHeight,
                    html.scrollHeight,
                    html.offsetHeight
                );

                let viewHeight = html.clientHeight || body.clientHeight;
                let scrollTop = window.pageYOffset || html.scrollTop || body.scrollTop || 0;
                let remainingHeight = totalHeight - viewHeight;
                let width = (scrollTop / remainingHeight) * 100;

                // When there is no scrollbar, then the progress bar width is set to 100%
                if (totalHeight === viewHeight && scrollTop !== 0) {
                    width = 100;
                }
                setWidth(width);
            };

            const events = ['scroll', 'resize'];
            events.forEach((evt) => window.addEventListener(evt, setProgress));
            setProgress();

            return () => {
                events.forEach((evt) => window.removeEventListener(evt, setProgress));
            };
        }
    }, []);

    const root = document.querySelector('body > .root');

    const getStickyHeight = () => {
        if (root) {
            return parseInt(root.getAttribute('data-sticky-height'), 10) || 0;
        }
    };

    const [stickyHeight, setStickyHeight] = useState(getStickyHeight);

    useEffect(() => {
        if (root) {
            const observer = new MutationObserver(function () {
                setStickyHeight(getStickyHeight);
            });

            observer.observe(root, {
                attributes: true,
                attributeFilter: ['data-sticky-height'],
                childList: false,
                characterData: false,
            });

            return () => observer.disconnect();
        }
    }, []);

    return (
        <div
            className={cx(styles.container)}
            style={{
                top: `${stickyHeight}px`,
            }}
        >
            <div
                className={cx(styles.progress)}
                ref={progressBarRef}
                style={{
                    width: `${width}%`,
                }}
            />
        </div>
    );
};

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;
