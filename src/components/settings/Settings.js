import React, { useState } from "react";
import "./Settings.css";
import TagSettings from "./TagSettings";
import CommissionTable from "./CommissionTable";
import AccordianItem from "./AccordianItem";

const Settings = ({
  jsObjData,
  specifiedCommissions,
  handleCommissionChange,
  top10,
  handleResetCommissions,
  handleTop10Click,
  selectedCategories,
  handleCategorySelect,
  categories,
  onSelectAll,
}) => {
  const [expandedSection, setExpandedSection] = useState(null);

  // Expand and minimize accordian.
  const handleButtonClick = (event) => {
    console.log("clicked");
    let section = event.target.dataset.section;
    console.log(section);
    if (section !== expandedSection) {
      setExpandedSection(section);
    } else {
      setExpandedSection(null);
    }
  };

  return (
    <div className="settings">
      {/* <div className="top10">
        Display top 10 only
        <input type="checkbox" checked={top10} onClick={handleTop10Click} />
      </div> */}
      <button
        data-section="tags"
        onClick={handleButtonClick}
        className="accordian"
      >
        Tags
      </button>
      <TagSettings expanded={expandedSection === "tags"} />
      <button
        data-section="categories"
        onClick={handleButtonClick}
        className="accordian"
      >
        Categories
      </button>
      <AccordianItem
        expanded={expandedSection === "categories"}
        contents={
          <CommissionTable
            data={jsObjData}
            specifiedCommissions={specifiedCommissions}
            onCommissionChange={handleCommissionChange}
            top10={top10}
            onResetCommissions={handleResetCommissions}
            selectedCategories={selectedCategories}
            handleCategorySelect={handleCategorySelect}
            categories={categories}
            onSelectAll={onSelectAll}
            onTop10Click={handleTop10Click}
          />
        }
      />

      {/* <div className="tag-settings">
        <div className="tag-settings-header">Tag</div>
        <div className="tag-settings-body"></div>
      </div> */}
    </div>
  );
};
export default Settings;
