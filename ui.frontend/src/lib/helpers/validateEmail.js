const validateEmail = (email) => {
    // eslint-disable-next-line
    const re = /^[^\s@]+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,6})$/;
    return re.test(String(email).toLowerCase());
};
export default validateEmail;
