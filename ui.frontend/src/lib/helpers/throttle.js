export const throttle = (callback, interval) => {
    var waiting = false;
    return function () {
        if (!waiting) {
            callback();
            waiting = true;
            setTimeout(function () {
                waiting = false;
            }, interval);
        }
    };
};
