import React from 'react';
import PropTypes from 'prop-types';
import styles from './Testimonial.module.scss';
import cx from 'classnames';
import { MEDIA_TYPES, ICONS_PATH, MEDIA_TYPE } from '../../lib/constants';
import Icon from '../_shared/Icon';
import Text from '../_shared/Text';
import Media from '../_shared/Media';

const Testimonial = (props) => {
    const {
        mediaType,
        name,
        testimonial,
        profileImage,
        youtubeVideoLink,
        youtubeThumbnail,
    } = props;

    let finalMediaType = mediaType;
    const isProfile = mediaType === MEDIA_TYPES.PROFILE_IMAGE;
    const hasProfileImage = profileImage && profileImage.trim().length !== 0;
    const isVideo = mediaType === MEDIA_TYPES.VIDEO;
    const hasVideoLink = youtubeVideoLink && youtubeVideoLink.trim().length !== 0;

    if ((isProfile && !hasProfileImage) || (isVideo && !hasVideoLink)) {
        finalMediaType = MEDIA_TYPES.QUOTE;
    }
    const quoteUrl = ICONS_PATH + 'open-quote.svg';
    const testimonialText = (
        <div className={cx(styles['text'], 'light-theme')}>{<Text content={testimonial} />}</div>
    );
    const nameText = <div className={cx(styles.name)}>{name}</div>;
    const quoteOnly = (
        <div className={cx(styles['quote-container'])}>
            <div className={cx(styles['quote-icon'])}>
                <Icon url={quoteUrl} size={'medium'} />
            </div>
            <div className={cx(styles['text-container'])}>
                {testimonialText}
                {nameText}
            </div>
        </div>
    );

    const profileImageOnly = (
        <>
            <div className={cx(styles['profile-container'])}>
                <div className={cx(styles['photo-wrapper'])}>
                    <Media
                        fileReference={profileImage}
                        altText={'profile photo'}
                        className={cx(styles['photo'])}
                    />
                </div>
                {nameText}
            </div>
            {testimonialText}
        </>
    );

    const videoOnly = (
        <Media
            videoLink={youtubeVideoLink}
            fileReference={youtubeThumbnail}
            className={cx(styles['video-thumbnail'])}
        />
    );

    const isVideoType = finalMediaType === MEDIA_TYPES.VIDEO;
    return !isVideoType ? (
        {
            'quote-only': (
                <div className={cx(styles['testimonial-card'], styles['less-right-padding'])}>
                    {quoteOnly}
                </div>
            ),
            'profile-image': (
                <div className={cx(styles['testimonial-card'])}> {profileImageOnly}</div>
            ),
        }[finalMediaType]
    ) : (
        <div className={cx(styles['video-testimonial-wrapper'])}>
            {videoOnly}
            <div className={cx(styles['video-testimonial-card-wrapper'])}>
                <div className={cx(styles['testimonial-card'])}>{quoteOnly}</div>
            </div>
        </div>
    );
};

Testimonial.displayName = 'Testimonial';

Testimonial.propTypes = {
    mediaType: PropTypes.oneOf(MEDIA_TYPE).isRequired,
    name: PropTypes.string.isRequired,
    testimonial: PropTypes.string.isRequired,
    profileImage: PropTypes.string,
    youtubeVideoLink: PropTypes.string,
    youtubeThumbnail: PropTypes.string,
};

Testimonial.defaultProps = {};

export default Testimonial;
