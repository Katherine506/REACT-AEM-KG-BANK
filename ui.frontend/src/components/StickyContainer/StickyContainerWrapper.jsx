import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { PORTAL_STICKY_CONTAINER_ROOT } from '../../lib/constants';
import { createPortal } from 'react-dom';
import StickyContainerService from '../../lib/services/stickyContainerService';
import useAuthorMode from '../../lib/helpers/useAuthorMode';

const StickyContainerWrapper = (props) => {
    const [isContainerMounted, setContainerMounted] = useState(false);
    const currentAuthorMode = useAuthorMode();
    const isEditMode = currentAuthorMode === 'edit';

    const containerContent = <div>{props.children}</div>;

    const bannerRoot = document.getElementById(PORTAL_STICKY_CONTAINER_ROOT);

    useEffect(() => {
        StickyContainerService.containerMounted.subscribe((isMounted) =>
            setContainerMounted(isMounted)
        );
    }, []);

    if (isEditMode) {
        return containerContent;
    } else {
        if (isContainerMounted) {
            return createPortal(containerContent, bannerRoot);
        }
        return containerContent;
    }
};

StickyContainerWrapper.displayName = 'StickyContainerWrapper';

StickyContainerWrapper.defaultProps = {
    flush: 'neither',
    width: 'full',
    alignment: 'left',
    backgroundColor: 'white',
};

StickyContainerWrapper.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default StickyContainerWrapper;
