export const getRecaptchaToken = () => {
    return new Promise((resolve, reject) => {
        const script = document.getElementById('recaptcha');
        const siteKey = script ? script.getAttribute('data-site-key') : null;
        if (siteKey && window.grecaptcha) {
            window.grecaptcha.ready(
                function () {
                    window.grecaptcha
                        .execute(siteKey, { action: 'submit' })
                        .then(function (token) {
                            resolve(token);
                        })
                        .catch(reject);
                },
                function (err) {
                    reject(err);
                }
            );
        } else {
            console.warn('Recaptcha not configured.');
            resolve(null);
        }
    });
};
