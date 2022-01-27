import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Chart from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

const Doughnut2d = ({ chartData }) => {
  ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

  const chartConfigs = {
    type: "doughnut2d",
    width: "400",
    height: "400",
    dataFormat: "json",

    dataSource: {
      chart: {
        caption: "Languages",
        pieRadius: 100,

        theme: "fusion",
      },

      data: chartData,
    },
  };
  return <ReactFC {...chartConfigs} />;
};

export default Doughnut2d;
