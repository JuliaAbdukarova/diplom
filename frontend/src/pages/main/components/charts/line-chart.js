
import Chart from 'chart.js/auto';
import React, { useEffect, useRef } from 'react';

const LineChart = ( {labels, data, title, onLoad}) => {
    const chartRef = useRef();
    const config = {
        type: "bar",
        data: {
            labels: Array.from(labels),
            datasets: [
                {
                    data: Array.from(data),
                    label: title
                },
            ],},
        }

    useEffect(() => {
        const ctx = chartRef.current.getContext("2d");
        new Chart( ctx, config );
        onLoad()
    }, []);

  return (
    <div>
        <canvas id="myChart" ref={chartRef} height="250" />
    </div>
  );
};

export default LineChart;


//style={{display: "inline-block", position: "relative", width: "100%" }}

/*
    {
        data: [86, 114, 106, 106,],
        label: "Total",
        borderColor: "#3e95cd",
        backgroundColor: "#7bb6dd",
        fill: true,},
    {
        data: [70, 90, 44, 60,],
        label: "Accepted",
        borderColor: "#3cba9f",
        backgroundColor: "#71d1bd",
        fill: false,
    },

 */
