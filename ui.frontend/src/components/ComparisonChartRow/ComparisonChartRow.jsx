import React from 'react';
import PropTypes from 'prop-types';
import useBreakpoint from '../../lib/helpers/useBreakpoint';
import { BREAKPOINT_DESKTOP, BREAKPOINT_DESKTOP_L } from '../../lib/constants';
import ComparisonChartRowDesktop from './ComparisonChartRowDesktop';
import ComparisonChartRowMobile from './ComparisonChartRowMobile';
import useAuthorMode from '../../lib/helpers/useAuthorMode';

const ComparisonChartRow = (props) => {
    const currentBreakpoint = useBreakpoint();
    const currentAuthorMode = useAuthorMode();
    const isEditMode = currentAuthorMode === 'edit';

    const isDesktop =
        currentBreakpoint === BREAKPOINT_DESKTOP || currentBreakpoint === BREAKPOINT_DESKTOP_L;

    return isDesktop || isEditMode ? (
        <ComparisonChartRowDesktop {...props} />
    ) : (
        <ComparisonChartRowMobile {...props} />
    );
};

ComparisonChartRow.displayName = 'ComparisonChartRow';

ComparisonChartRow.propTypes = {};

export default ComparisonChartRow;
