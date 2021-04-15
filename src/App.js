import React, { useState } from "react";
import "./App.css";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import Settings from "./components/settings/Settings";

import xlsxImporter from "./functions/xlsxImporter";
import getUniqueValues from "./functions/getUniqueValues";
import incomeByCategory from "./functions/incomeByCategory";
import incomeByTag from "./functions/incomeByTag";

function App() {
  const [jsObjData, setJsObjData] = useState(false);
  const [specifiedCommissions, setSpecifiedCommissions] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState([]);

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

  const initTags = (data) => {
    let newTags = getUniqueValues(data, "tag").map((tag) => {
      return {
        tag: tag,
        selected: true,
      };
    });
    setTags(newTags);
  };

  const handleFileInput = async (e) => {
    try {
      const data = await xlsxImporter(e);
      initCategories(data["Fee-Orders"]);
      initTags(data["Fee-Orders"]);
      setSelectedCategories(getUniqueValues(data["Fee-Orders"], "category"));
      setSelectedTags(getUniqueValues(data["Fee-Orders"], "tag"));
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

  const handleTop10TagClick = (event) => {
    let tagsArray = incomeByTag(
      jsObjData,
      specifiedCommissions,
      tags.map((item) => {
        return item.tag;
      })
    );

    tagsArray.sort((a, b) => a.income > b.income);

    let top10Categories = [];
    for (let i = 0; i < 10; i++) {
      top10Categories.push(tagsArray[i].tag);
      console.log("top10click:", tagsArray[i]);
    }
    if (top10Categories.toString() !== selectedTags.toString()) {
      setSelectedTags(top10Categories);
    } else {
      setSelectedTags(tags.map((item) => item.tag));
    }
  };

  const handleSelectAll = (event) => {
    if (selectedCategories.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(categories.map((item) => item.category));
    }
  };

  const handleSelectAllTags = (event) => {
    if (selectedTags.length) {
      setSelectedTags([]);
    } else {
      setSelectedTags(tags.map((item) => item.tag));
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

  const handleTagSelect = (event) => {
    console.log("Tag Select: ");
    if (selectedTags.includes(event.target.dataset.tag)) {
      setSelectedTags(
        selectedTags.filter((tag) => {
          return tag !== event.target.dataset.tag;
        })
      );
    } else {
      setSelectedTags([...selectedTags, event.target.dataset.tag]);
    }

    let changedTag = event.target.dataset.tag;
    let tagIndex = tags.findIndex((item) => {
      return item.tag === changedTag;
    });
    if (tagIndex === -1) return;

    tags[tagIndex].selected = !tags[tagIndex].selected;
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

  const handleClearAllFilters = () => {
    setSelectedTags(tags.map((item) => item.tag));
    setSelectedCategories(categories.map((item) => item.category));
  };

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
        selectedTags={selectedTags}
        categories={categories}
        tags={tags}
      />
      <Settings
        jsObjData={jsObjData}
        specifiedCommissions={specifiedCommissions}
        handleCommissionChange={handleCommissionChange}
        handleResetCommissions={handleResetCommissions}
        handleTop10Click={handleTop10Click}
        selectedCategories={selectedCategories}
        selectedTags={selectedTags}
        handleCategorySelect={handleCategorySelect}
        categories={categories}
        tags={tags}
        onSelectAll={handleSelectAll}
        handleTagSelect={handleTagSelect}
        handleSelectAllTags={handleSelectAllTags}
        handleTop10TagClick={handleTop10TagClick}
        handleClearAllFilters={handleClearAllFilters}
      />
    </div>
  );
}

export default App;
