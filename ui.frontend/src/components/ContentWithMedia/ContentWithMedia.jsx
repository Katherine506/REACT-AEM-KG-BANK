import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContentWithMedia.module.scss';
import cx from 'classnames';
import { Media } from '../index';
import useBreakpoint from '../../lib/helpers/useBreakpoint';

const ContentWithMedia = (props) => {
    const {fileReference, youtubeVideo, desktopPosition, mobilePosition, graphicalElement, altText,children, wcChildren} =props;
    return (
        <section className={`content-media`}>
            <div className={`content-media__wrapper ${desktopPosition} ${mobilePosition}`}>
                <div className={`content-media__media ${graphicalElement}`}>
                    <Media altText={altText} videoLink={youtubeVideo} fileReference={fileReference}
                           horizontalAlignment={desktopPosition} graphicalElement={graphicalElement}
                           className={`media`}/>
                </div>
                <div className={`content-media__info`}>
                    {children}
                </div>
            </div>
        </section>
    );
};

ContentWithMedia.displayName = 'ContentWithMedia';

ContentWithMedia.propTypes = {

    fileReference: PropTypes.string.isRequired,
    youtubeVideo: PropTypes.string,
    desktopPosition: PropTypes.string.isRequired,
    mobilePosition: PropTypes.string.isRequired,
    graphicalElement: PropTypes.string.isRequired,
    altText: PropTypes.string

};

export default ContentWithMedia;
