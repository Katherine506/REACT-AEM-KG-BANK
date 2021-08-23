const CLASSES = {
    MODAL_OPEN: 'modal-open',
};
const ScrollLock = {
    lockBody: () => {
        document.body.style.top = `-${window.scrollY}px`;
        document.body.style.position = 'fixed';
        document.body.classList.add(CLASSES.MODAL_OPEN);
    },
    unlockBody: () => {
        const scrollY = document.body.style.top;
        document.body.classList.remove(CLASSES.MODAL_OPEN);
        document.body.style.position = '';
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
    },
};

export default ScrollLock;
