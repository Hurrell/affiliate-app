import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import Settings from "./components/Settings";
import RenderIncomeByTag from "./renderers/renderIncomeByTag";
import incomeByTag from "./functions/incomeByTag";
import exampleJsonObj from "./resources/exampleJsonObj";
import XLSX from "xlsx";
import xlsxImporter from "./functions/xlsxImporter";
import CommissionTable from "./renderers/commissionTable";
import getCommission from "./functions/getCommission";
import incomeByCategory from "./functions/incomeByCategory";
import RenderIncomeByCategory from "./renderers/renderIncomeByCategory";
import RenderIncomeByDevice from "./renderers/renderIncomeByDevice";
import incomeByDevice from "./functions/incomeByDevice";
import RenderIncomeByTagAndDate from "./renderers/renderIncomeByTagAndDate";
import incomeByTagAndDay from "./functions/incomeByTagAndDay";

function App() {
  const [jsObjData, setJsObjData] = useState(false);
  const [specifiedCommissions, setSpecifiedCommissions] = useState([]);
  const [top10, setTop10] = useState(true);
  const handleFileInput = async (e) => {
    try {
      const data = await xlsxImporter(e);
      // console.log(data);
      setJsObjData(data);
    } catch (err) {
      // console.log(err);
    }
  };

  const handleTop10Click = (event) => {
    setTop10(!top10);
  };

  const handleResetCommissions = (event) => {
    setSpecifiedCommissions([]);
  };

  const handleCommissionChange = (category, value) => {
    // console.log("chaaaanging", value, category);
    let index = specifiedCommissions.findIndex(
      (item) => item.category === category
    );
    if (index === -1) {
      // console.log("category not found");
      setSpecifiedCommissions(
        specifiedCommissions.concat({
          category: category,
          commission: Number((value / 100).toFixed(2)),
        })
      );
    } else {
      let newCommissions = [...specifiedCommissions];
      newCommissions[index].commission = Number((value / 100).toFixed(2));
      setSpecifiedCommissions(newCommissions);
    }
  };
  // Handle selection of which chart to render.
  const [chart, setChart] = useState("devices");
  const handleChartSelect = (event) => {
    setChart(event.target.dataset.chartname);
  };

  // Show or hide Settings
  const [settingsOpen, setSettingsOpen] = useState(false);
  const handleToggleSettings = () => {
    setSettingsOpen(!settingsOpen);
  };
  let appClassString = "App settings-closed";
  if (settingsOpen) {
    appClassString = "App settings-open";
  }

  return (
    <div className={appClassString}>
      <Header
        handleFileInput={handleFileInput}
        handleToggleSettings={handleToggleSettings}
      />
      <Sidebar chart={chart} handleChartSelect={handleChartSelect} />
      <Main
        chart={chart}
        jsObjData={jsObjData}
        specifiedCommissions={specifiedCommissions}
        top10={top10}
      />
      <Settings
        jsObjData={jsObjData}
        specifiedCommissions={specifiedCommissions}
        top10={top10}
        handleCommissionChange={handleCommissionChange}
        handleResetCommissions={handleResetCommissions}
        handleTop10Click={handleTop10Click}
      />
      {/*<Settings />
      <Body /> */}
      {/* </div> */}

      {/* Below here, needs refactoring */}

      {/*

      <div className="device-chart">{incomeByDeviceChart}</div>

      <div className="category-chart">{incomeByCategoryChart}</div>
      <div className="tag-chart">{incomeByTagChart}</div>
      <div className="tag-day-chart">{incomeByTagAndDateChart}</div> */}
    </div>
  );
}

export default App;
