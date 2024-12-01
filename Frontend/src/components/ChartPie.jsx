import React from 'react';
import ReactApexChart from 'react-apexcharts';
const ChartPie = () => {
  const options = {
    series: [44, 55, 67, 83],
    chart: {
      height: 350,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: '22px',
          },
          value: {
            fontSize: '16px',
          },
          total: {
            show: true,
            label: 'Total',
            formatter: () => 249,
          },
        },
      },
    },
    labels: ['Apples', 'Oranges', 'Bananas', 'Berries'],
  };

  return (
    <div id="chartpie">
      <ReactApexChart options={options} series={options.series} type="radialBar" height={350} />
    </div>
  );
};

export default ChartPie;
