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
import collateDataBy from "../functions/collateDataBy";
import salesByDevice from "../functions/salesByDevice";
import RenderSalesByDevice from "../renderers/renderPiechart";
import RenderPiechart from "../renderers/renderPiechart";
import Sales from "./Sales";
import Home from "./Home";
import filter from "../functions/filter";

const Main = ({
  chart,
  jsObjData,
  specifiedCommissions,
  selectedCategories,
  categories,
}) => {
  // Guard against lack of data
  if (!jsObjData["Fee-Orders"]) {
    return (
      <div className="main">
        <div className="chart-container"></div>
      </div>
    );
  }

  let filteredData = filter(jsObjData, selectedCategories);
  let renderChart;
  switch (chart) {
    case "devices":
      renderChart = (
        <div className="chart-container">
          <RenderIncomeByDevice
            totalsByDevice={incomeByDevice(
              jsObjData,
              specifiedCommissions,
              categories
            )}
          />
        </div>
      );
      break;
    case "tag":
      renderChart = (
        <div className="chart-container">
          <RenderIncomeByTag
            totalsByTag={incomeByTag(filteredData, specifiedCommissions)}
          />
        </div>
      );
      break;
    case "category":
      renderChart = (
        <div className="chart-container">
          <RenderIncomeByCategory
            totalsByCategory={incomeByCategory(
              jsObjData,
              specifiedCommissions,
              selectedCategories
            )}
          />
        </div>
      );
      break;
    case "time":
      renderChart = (
        <div className="chart-container">
          <RenderIncomeByTagAndDate
            totalsByTagAndDate={incomeByTagAndDay(
              jsObjData,
              specifiedCommissions,
              selectedCategories
            )}
          />
        </div>
      );
      break;
    case "sales":
      renderChart = (
        <Sales
          jsObjData={jsObjData}
          specifiedCommissions={specifiedCommissions}
          selectedCategories={selectedCategories}
        />
      );
      break;
    case "home":
      renderChart = (
        <Home
          jsObjData={jsObjData}
          specifiedCommissions={specifiedCommissions}
          selectedCategories={selectedCategories}
        />
      );
      break;
    default:
      renderChart = (
        <Home
          jsObjData={jsObjData}
          specifiedCommissions={specifiedCommissions}
          selectedCategories={selectedCategories}
        />
      );
  }

  let dateBanner = <div></div>;

  if (jsObjData["Fee-Orders"]) {
    let lastDate = String(jsObjData["Fee-Orders"][0].date.split(" ")[0]);
    let firstDate = String(
      jsObjData["Fee-Orders"][jsObjData["Fee-Orders"].length - 1].date.split(
        " "
      )[0]
    );
    dateBanner = (
      <div>
        <p>
          Date ranges from: {firstDate} to {lastDate}
        </p>
      </div>
    );
  }

  //Return Chart if data is present

  return (
    <div className="main">
      {dateBanner}
      {renderChart}
    </div>
  );
};

export default Main;
