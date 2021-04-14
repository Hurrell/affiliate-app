import React, { useState } from "react";
import "./App.css";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import Settings from "./components/settings/Settings";

import xlsxImporter from "./functions/xlsxImporter";
import getUniqueValues from "./functions/getUniqueValues";
import incomeByCategory from "./functions/incomeByCategory";

function App() {
  const [jsObjData, setJsObjData] = useState(false);
  const [specifiedCommissions, setSpecifiedCommissions] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);

  const initCategories = (data) => {
    let newCategories = getUniqueValues(data, "category").map((category) => {
      return {
        category: category,
        selected: true,
        specifiedCommission: null,
      };
    });
    setCategories(newCategories);
  };

  const handleFileInput = async (e) => {
    try {
      const data = await xlsxImporter(e);
      initCategories(data["Fee-Orders"]);
      setSelectedCategories(getUniqueValues(data["Fee-Orders"], "category"));
      setJsObjData(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleTop10Click = (event) => {
    let categoriesArray = incomeByCategory(
      jsObjData,
      specifiedCommissions,
      categories.map((item) => {
        return item.category;
      })
    );

    categoriesArray.sort((a, b) => a.income > b.income);

    let top10Categories = [];
    for (let i = 0; i < 10; i++) {
      top10Categories.push(categoriesArray[i].category);
      console.log("top10click:", categoriesArray[i]);
    }
    if (top10Categories.toString() !== selectedCategories.toString()) {
      setSelectedCategories(top10Categories);
    } else {
      setSelectedCategories(categories.map((item) => item.category));
    }
  };

  const handleSelectAll = (event) => {
    if (selectedCategories.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(categories.map((item) => item.category));
    }
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

    let changedCategory = event.target.dataset.category;
    let categoryIndex = categories.findIndex((item) => {
      return item.category === changedCategory;
    });
    if (categoryIndex === -1) return;

    categories[categoryIndex].selected = !categories[categoryIndex].selected;
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
  const [chart, setChart] = useState("home");
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
        selectedCategories={selectedCategories}
        categories={categories}
      />
      <Settings
        jsObjData={jsObjData}
        specifiedCommissions={specifiedCommissions}
        handleCommissionChange={handleCommissionChange}
        handleResetCommissions={handleResetCommissions}
        handleTop10Click={handleTop10Click}
        selectedCategories={selectedCategories}
        handleCategorySelect={handleCategorySelect}
        categories={categories}
        onSelectAll={handleSelectAll}
      />
    </div>
  );
}

export default App;
