import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js';
import * as ChartAnnotation from 'chartjs-plugin-annotation';
import { t } from '@konrad/reweb-aem';
import PropTypes from 'prop-types';
import styles from './LineGraph.module.scss';

const LineGraph = (props) => {
    const { altText, lineData, horizontalLineValue } = props;
    const lineRef = useRef();
    const [lineGraph, setLineGraph] = useState();

    const fontFamily = "'SourceSansPro', sans-serif";
    const colors = {
        transparent: 'rgba(255, 255, 255, 0)',
        whiteTransparent20: 'rgba(255, 255, 255, 0.2)',
        black10: '#e8e8e8',
    };

    useEffect(() => {
        const ctx = lineRef.current.getContext('2d');
        const data = generateData(lineData);

        setLineGraph(new Chart(ctx, generateConfig(data)));
    }, []);

    useEffect(() => {
        if (lineGraph) {
            lineGraph.data = generateData(lineData);
            lineGraph.update();
        }
    }, [lineData]);

    useEffect(() => {
        if (lineGraph) {
            lineGraph.annotation.elements['total-debt-line'].options.value = horizontalLineValue;
            lineGraph.annotation.elements[
                'total-debt-line'
            ].options.label.content = t('${0} Total debt', [horizontalLineValue.toLocaleString()]);
            // Extend the y-axis a little so the horizontal reference line is not cutoff
            lineGraph.options.scales.yAxes[0].ticks.max = Math.ceil(horizontalLineValue * 1.1);

            lineGraph.update();
        }
    }, [horizontalLineValue]);

    const generateData = (lineData) => {
        const data = {
            datasets: lineData.map((dataset) => {
                return {
                    ...dataset,
                    showLine: true,
                    borderWidth: 2,
                    fill: true,
                    pointRadius: 0,
                    pointStyle: 'line',
                };
            }),
        };

        data.datasets.forEach((dataset) => {
            if (dataset.backgroundColor) {
                const ctx = lineRef.current.getContext('2d');
                const gradient = ctx.createLinearGradient(
                    0,
                    lineRef.current.offsetHeight,
                    lineRef.current.offsetWidth,
                    0
                );
                gradient.addColorStop(0, colors.transparent);
                gradient.addColorStop(0.5, dataset.backgroundColor);
                gradient.addColorStop(1, dataset.backgroundColor);

                dataset.backgroundColor = gradient;
            }
        });

        return data;
    };

    const generateConfig = (data) => {
        return {
            type: 'scatter',
            data: data,
            plugins: [
                {
                    beforeInit: function (chart) {
                        // Add vertical spacing between the legend and the chart
                        chart.legend.afterFit = function () {
                            this.height += 16;
                        };
                    },
                },
            ],
            options: {
                responsive: true,
                aspectRatio: 22.5 / 15.5,
                annotation: {
                    annotations: [
                        {
                            id: 'total-debt-line',
                            drawTime: 'afterDatasetsDraw',
                            type: 'line',
                            mode: 'horizontal',
                            scaleID: 'y-axis-1',
                            value: horizontalLineValue,
                            borderColor: colors.black10,
                            borderWidth: 1,
                            label: {
                                enabled: true,
                                content: t('${0} Total debt', [
                                    horizontalLineValue.toLocaleString(),
                                ]),
                                backgroundColor: '#3f2a56',
                                cornerRadius: 0,
                                fontColor: colors.black10,
                                fontFamily: fontFamily,
                                fontSize: 12,
                                fontStyle: 'bold',
                                position: 'left',
                                xAdjust: 48,
                                xPadding: 4,
                                yPadding: 4,
                            },
                        },
                    ],
                },
                legend: {
                    labels: {
                        usePointStyle: true,
                        boxWidth: 21,
                        lineHeight: 1.5,
                        fontColor: colors.black10,
                        fontFamily: fontFamily,
                        fontSize: 12,
                        padding: 32,
                    },
                },
                scales: {
                    xAxes: [
                        {
                            gridLines: {
                                display: false,
                                drawTicks: false,
                            },
                            scaleLabel: {
                                display: true,
                                labelString: t('Months'),
                                lineHeight: 1.5,
                                fontColor: colors.black10,
                                fontFamily: fontFamily,
                                fontSize: 14,
                                padding: 0,
                            },
                            ticks: {
                                maxTicksLimit: 6,
                                beginAtZero: true,
                                stepSize: 12,
                                lineHeight: 1.5,
                                fontColor: colors.black10,
                                fontFamily: fontFamily,
                                fontSize: 14,
                                padding: 8,
                            },
                        },
                    ],
                    yAxes: [
                        {
                            afterTickToLabelConversion: function (scaleInstance) {
                                // Hide max y-axis tick value
                                scaleInstance.ticks[0] = null;
                                scaleInstance.ticksAsNumbers[0] = null;
                            },
                            gridLines: {
                                color: colors.whiteTransparent20,
                                lineWidth: 0.5,
                                zeroLineColor: colors.whiteTransparent20,
                                zeroLineWidth: 0.5,
                                drawTicks: false,
                            },
                            ticks: {
                                autoSkip: true,
                                beginAtZero: true,
                                max: Math.ceil(horizontalLineValue * 1.1),
                                callback: (value) => t('${0}', [value]),
                                lineHeight: 1.5,
                                fontColor: colors.black10,
                                fontFamily: fontFamily,
                                fontSize: 14,
                                padding: 16,
                            },
                        },
                    ],
                },
            },
        };
    };

    return <canvas aria-label={altText} className={styles.canvas} ref={lineRef} role="img" />;
};

LineGraph.displayName = 'LineGraph';

LineGraph.propTypes = {
    altText: PropTypes.string.isRequired,
    lineData: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            data: PropTypes.arrayOf(
                PropTypes.shape({
                    x: PropTypes.number,
                    y: PropTypes.number,
                })
            ),
            borderColor: PropTypes.string.isRequired,
            backgroundColor: PropTypes.string.isRequired,
        })
    ),
    horizontalLineValue: PropTypes.number.isRequired,
};

export default LineGraph;
