import React from "react";
// import "./Main.css";
import "./Sales.css";

import averageCommission from "../functions/averageCommission";

import salesByDevice from "../functions/salesByDevice";
import RenderPiechart from "../renderers/renderPiechart";

import incomeByDevice from "../functions/incomeByDevice";

const Sales = ({
  chart,
  jsObjData,
  specifiedCommissions,
  selectedCategories,
  categories,
}) => {
  return (
    <div className="grid-charts">
      <div className="chart">
        <RenderPiechart
          className="chart"
          data={salesByDevice(
            jsObjData,
            specifiedCommissions,
            selectedCategories
          )}
          id="deviceTypeGroup"
          value="sales"
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
