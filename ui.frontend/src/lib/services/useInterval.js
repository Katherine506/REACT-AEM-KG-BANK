import { useEffect, useRef } from 'react';

function useInterval(callback, delay, property) {
    const savedCallback = useRef();
    const savedProperty = useRef();

    useEffect(() => {
        savedCallback.current = callback;
        savedProperty.current = property;
    }, [callback, property]);

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            if (!savedProperty.current) {
                clearInterval(id);
            } else {
                return () => {
                    clearInterval(id);
                };
            }
        }
    }, [delay, property]);
}

export default useInterval;
