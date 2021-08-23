import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Media.module.scss';
import cx from 'classnames';
import Modal from '../Modal';
import { ICONS_PATH } from '../../../lib/constants';
import Icon from '../Icon';
import { getYoutubeVideoIdFromUrl } from '../../../lib/helpers/mediaHeplers';

const Media = (props) => {
    const videoButtonRef = useRef();
    const hasModalOpen = useRef(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {
        altText,
        videoLink,
        fileReference,
        horizontalAlignment,
        graphicalElement,
        className,
    } = props;
    const isVideo = videoLink && videoLink !== 'undefined';
    let videoId = '';
    let videoUrl = '';
    let videoBtnText = isModalOpen ? '' : 'Open';
    const videoContainerStyles = {};
    if (isVideo) {
        if (fileReference) videoContainerStyles.backgroundImage = `url('${fileReference}')`;
        if (videoLink) {
            const ytVideoId = getYoutubeVideoIdFromUrl(videoLink);
            if (ytVideoId) {
                videoId = 'kg-media-video-modal' + (altText && altText.trim().split(' ').join('-'));
                videoUrl = `https://www.youtube.com/embed/${ytVideoId}?rel=0`;
            }
        }
    }
    const openVideo = () => {
        hasModalOpen.current = true;
        setIsModalOpen(true);
    };
    const closeVideo = () => setIsModalOpen(false);

    useEffect(() => {
        if (!isModalOpen && hasModalOpen.current) {
            videoButtonRef.current.focus();
            hasModalOpen.current = false;
        }
    }, [isModalOpen]);

    return (
        <div
            className={cx(
                styles.wrapper,
                styles[`wrapper--${graphicalElement}`],
                styles[`h-alignment--${horizontalAlignment}`],
                className
            )}
        >
            {isVideo ? (
                <div
                    className={cx(
                        styles['video-wrapper'],
                        styles[`decoration--${graphicalElement}`]
                    )}
                >
                    <div
                        className={cx(styles['video-container'], className)}
                        style={videoContainerStyles}
                    >
                        <button
                            ref={videoButtonRef}
                            aria-expanded="false"
                            aria-controls={videoId}
                            aria-label={videoBtnText}
                            onClick={openVideo}
                            className={styles['play-btn']}
                        >
                            <Icon
                                className={styles['play-btn__icon']}
                                size="small"
                                url={ICONS_PATH + 'symbol-play-video.svg'}
                            />
                        </button>
                    </div>
                    <Modal id={videoId} modalState={isModalOpen} handleClose={closeVideo}>
                        <div className={styles['modal-body']}>
                            <iframe
                                allowFullScreen={true}
                                allow="accelerometer; gyroscope; picture-in-picture"
                                src={videoUrl}
                                frameBorder="0"
                                title={altText}
                                width="100%"
                                height="100%"
                            />
                        </div>
                    </Modal>
                </div>
            ) : (
                <div
                    className={cx(
                        styles['image-wrapper'],
                        styles[`decoration--${graphicalElement}`]
                    )}
                >
                    <img
                        className={cx(styles.img, className)}
                        alt={altText || ''}
                        src={fileReference}
                    />
                </div>
            )}
        </div>
    );
};

Media.displayName = 'Media';

Media.propTypes = {
    altText: PropTypes.string,
    videoLink: PropTypes.string,
    fileReference: PropTypes.string,
    graphicalElement: PropTypes.string,
    horizontalAlignment: PropTypes.string,
};

export default Media;
