import { useEffect, useState } from 'react';
import { BREAKPOINTS } from '../constants';

const useBreakpoint = () => {
    const breakpoints = BREAKPOINTS.map(({ name, query }) => ({
        name,
        query: window.matchMedia(query),
    }));

    const getBreakpoint = () => {
        const matchingBreakpoints = breakpoints.filter((breakpoint) => breakpoint.query.matches);
        const breakpoint = matchingBreakpoints.length ? matchingBreakpoints[0] : null;
        return breakpoint ? breakpoint.name : BREAKPOINTS[0].name;
    };

    const [breakpoint, setBreakpoint] = useState(getBreakpoint);

    useEffect(() => {
        const queryHandler = () => setBreakpoint(getBreakpoint);
        breakpoints.forEach((breakpoint) => breakpoint.query.addListener(queryHandler));
        return () =>
            breakpoints.forEach((breakpoint) => breakpoint.query.removeListener(queryHandler));
        // eslint-disable-next-line
    }, []);

    return breakpoint;
};

export default useBreakpoint;
