import React from 'react';
import PropTypes from 'prop-types';
import useBreakpoint from '../../lib/helpers/useBreakpoint';
import ComparisonChartDesktop from './ComparisonChartDesktop';
import ComparisonChartMobile from './ComparisonChartMobile';
import { BREAKPOINT_DESKTOP, BREAKPOINT_DESKTOP_L } from '../../lib/constants';
import useAuthorMode from '../../lib/helpers/useAuthorMode';

const SELECTORS = {
    TITLES: 'kg-comparison-chart__title',
};

const ComparisonChart = (props) => {
    const currentBreakpoint = useBreakpoint();
    const currentAuthorMode = useAuthorMode();
    const isEditMode = currentAuthorMode === 'edit';
    const isDesktop =
        currentBreakpoint === BREAKPOINT_DESKTOP || currentBreakpoint === BREAKPOINT_DESKTOP_L;

    return isDesktop || isEditMode ? (
        <ComparisonChartDesktop {...props} />
    ) : (
        <ComparisonChartMobile {...props} />
    );
};

ComparisonChart.displayName = 'ComparisonChart';

ComparisonChart.propTypes = {};

export default ComparisonChart;
