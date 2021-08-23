import React from 'react';
import NavigationItemDesktop from './NavigationItemDesktop';
import NavigationItemMobile from './NavigationItemMobile';
import useBreakpoint from '../../../lib/helpers/useBreakpoint';

const NavigationItem = (props) => {
    const currentBreakpoint = useBreakpoint();

    return currentBreakpoint === 'desktop-l' ? (
        <NavigationItemDesktop {...props} />
    ) : (
        <NavigationItemMobile {...props} />
    );
};

NavigationItem.displayName = 'NavigationItem';

export default NavigationItem;
