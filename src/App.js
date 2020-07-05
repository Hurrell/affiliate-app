import React, { useState } from "react";
import "./App.css";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import Settings from "./components/settings/Settings";

import xlsxImporter from "./functions/xlsxImporter";
import getUniqueValues from "./functions/getUniqueValues";

function App() {
  const [jsObjData, setJsObjData] = useState(false);
  const [specifiedCommissions, setSpecifiedCommissions] = useState([]);
  const [top10, setTop10] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);

  // const initCategories = (data) => {
  //   let newCategories = getUniqueCategories(data)
  // }

  const handleFileInput = async (e) => {
    try {
      const data = await xlsxImporter(e);
      setSelectedCategories(getUniqueValues(data.data, "category"));
      setJsObjData(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleTop10Click = (event) => {
    setTop10(!top10);
  };

  const handleCategorySelect = (event) => {
    console.log("Category Select: ");
    if (selectedCategories.includes(event.target.dataset.category)) {
      setSelectedCategories(
        selectedCategories.filter((category) => {
          return category !== event.target.dataset.category;
        })
      );
    } else {
      setSelectedCategories([
        ...selectedCategories,
        event.target.dataset.category,
      ]);
    }
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
        selectedCategories={selectedCategories}
      />
      <Settings
        jsObjData={jsObjData}
        specifiedCommissions={specifiedCommissions}
        top10={top10}
        handleCommissionChange={handleCommissionChange}
        handleResetCommissions={handleResetCommissions}
        handleTop10Click={handleTop10Click}
        selectedCategories={selectedCategories}
        handleCategorySelect={handleCategorySelect}
      />
    </div>
  );
}

export default App;
