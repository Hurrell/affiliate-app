import React from "react";
// import "./Main.css";
import "./Earnings.css";

import averageCommission from "../functions/averageCommission";

import salesByDevice from "../functions/salesByDevice";
import RenderPiechart from "../renderers/renderPiechart";
import RenderSmallSideBarChart from "../renderers/renderSmallSideBarChart";

import incomeByDevice from "../functions/incomeByDevice";
import basicStats from "../functions/basicStats";

import filter from "../functions/filter";

const Sales = ({
  chart,
  jsObjData,
  specifiedCommissions,
  selectedCategories,
  categories,
  selectedTags,
  country,
}) => {
  let filteredData = filter(jsObjData, selectedCategories, selectedTags);

  return (
    <div className="grid-charts">
      <div className="chart">
        <RenderSmallSideBarChart
          className="chart"
          data={basicStats.chartReadyStats(filteredData)}
          id="sum"
          keys={["income"]}
          country={country}
        />
      </div>
      <div className="chart">
        <RenderPiechart
          data={incomeByDevice(
            jsObjData,
            specifiedCommissions,
            selectedCategories
          )}
          id="deviceTypeGroup"
          value="income"
        />
      </div>
      <div className="figure">
        {/* <div>100%</div> */}
        <h2>{averageCommission(jsObjData, specifiedCommissions)}%</h2>
        <p>Average Affiliate Fee</p>
      </div>
      <div className="chart">
        <RenderPiechart
          data={incomeByDevice(
            jsObjData,
            specifiedCommissions,
            selectedCategories
          )}
          id="deviceTypeGroup"
          value="income"
        />
      </div>
    </div>
  );
};

export default Sales;
