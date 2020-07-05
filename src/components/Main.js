import React from "react";
import RenderIncomeByDevice from "../renderers/renderIncomeByDevice";
import "./Main.css";

import RenderIncomeByTag from "../renderers/renderIncomeByTag";
import incomeByTag from "../functions/incomeByTag";
import incomeByCategory from "../functions/incomeByCategory";
import RenderIncomeByCategory from "../renderers/renderIncomeByCategory";
import incomeByDevice from "../functions/incomeByDevice";
import RenderIncomeByTagAndDate from "../renderers/renderIncomeByTagAndDate";
import incomeByTagAndDay from "../functions/incomeByTagAndDay";

const Main = ({
  chart,
  jsObjData,
  specifiedCommissions,
  top10,
  selectedCategories,
}) => {
  // Guard against lack of data
  if (!jsObjData.data) {
    return (
      <div className="main">
        <div className="chart-container"></div>
      </div>
    );
  }
  let renderChart;
  switch (chart) {
    case "devices":
      renderChart = (
        <RenderIncomeByDevice
          totalsByDevice={incomeByDevice(
            jsObjData,
            specifiedCommissions,
            top10
          )}
        />
      );
      break;
    case "tag":
      renderChart = (
        <RenderIncomeByTag
          totalsByTag={incomeByTag(jsObjData, specifiedCommissions, top10)}
        />
      );
      break;
    case "category":
      renderChart = (
        <RenderIncomeByCategory
          totalsByCategory={incomeByCategory(
            jsObjData,
            specifiedCommissions,
            top10,
            selectedCategories
          )}
          top10={top10}
        />
      );
      break;
    case "time":
      renderChart = (
        <RenderIncomeByTagAndDate
          totalsByTagAndDate={incomeByTagAndDay(
            jsObjData,
            specifiedCommissions,
            top10,
            selectedCategories
          )}
        />
      );
      break;
    default:
      renderChart = (
        <RenderIncomeByDevice
          totalsByDevice={incomeByDevice(
            jsObjData,
            specifiedCommissions,
            top10
          )}
        />
      );
  }

  //Return Chart if data is present

  return (
    <div className="main">
      <div className="chart-container">{renderChart}</div>
    </div>
  );
};

export default Main;
