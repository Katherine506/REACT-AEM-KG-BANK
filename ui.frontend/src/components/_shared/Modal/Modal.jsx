import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';
import cx from 'classnames';
import ScrollLock from '../../../lib/helpers/scrollLock';
import FocusLock from 'react-focus-lock';
import { Button } from '../../index';
import { t } from '@konrad/reweb-aem';
import Icon from '../Icon';
import { PORTAL_MODAL_ROOT, ICONS_PATH, KEYS } from '../../../lib/constants';

const Portal = ({ children }) => {
    const modalRoot = document.getElementById(PORTAL_MODAL_ROOT);

    return createPortal(children, modalRoot);
};

const Modal = (props) => {
    const contentRef = useRef();
    const { id, children, modalState, handleClose } = props;

    useEffect(() => {
        if (modalState) {
            ScrollLock.lockBody();
        } else {
            ScrollLock.unlockBody();
        }
    }, [modalState]);

    const handleClickOutside = ({ target }) => {
        const modalContent = contentRef.current;
        const isClickInside = modalContent && modalContent.contains(target);
        if (!isClickInside) {
            handleClose();
        }
    };

    const handleKeyDown = ({ key }) => {
        if (key === KEYS.ESC || key === KEYS.ESCAPE) {
            handleClose();
        }
    };

    return (
        <Portal>
            {modalState && (
                <FocusLock>
                    <div
                        aria-modal
                        role="dialog"
                        onClick={handleClickOutside}
                        onKeyDown={handleKeyDown}
                        className={cx(styles.root, { [`${styles.overlay}`]: modalState })}
                    >
                        <div className={styles.container}>
                            <div className={styles.content} ref={contentRef}>
                                <div className={styles.header}>
                                    <Button
                                        buttonStyle="link-text"
                                        aria-expanded="true"
                                        aria-controls={id}
                                        onClick={handleClose}
                                        className={styles['close-btn']}
                                    >
                                        {t('Close')}
                                        <Icon
                                            url={ICONS_PATH + 'cross-white.svg'}
                                            size="small"
                                            className={styles['cross-icon']}
                                        />
                                    </Button>
                                </div>
                                {children}
                            </div>
                        </div>
                    </div>
                </FocusLock>
            )}
        </Portal>
    );
};

Modal.displayName = 'Modal';

Modal.propTypes = {
    id: PropTypes.string,
    modalState: PropTypes.bool,
    handleClose: PropTypes.func,
    children: PropTypes.any,
};

export default Modal;
