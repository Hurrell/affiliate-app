import React, { useState } from "react";
import "./Settings.css";
import TagSettings from "./TagSettings";
import CommissionTable from "./CommissionTable";
import AccordianItem from "./AccordianItem";

const Settings = ({
  jsObjData,
  specifiedCommissions,
  handleCommissionChange,
  handleResetCommissions,
  handleTop10Click,
  selectedCategories,
  handleCategorySelect,
  categories,
  onSelectAll,
  handleTagSelect,
  tags,
  selectedTags,
  handleSelectAllTags,
  handleTop10TagClick,
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
      <button
        data-section="tags"
        onClick={handleButtonClick}
        className="accordian"
      >
        Tags
      </button>
      <AccordianItem
        expanded={expandedSection === "tags"}
        contents={
          <TagSettings
            data={jsObjData}
            specifiedCommissions={specifiedCommissions}
            tags={tags}
            selectedTags={selectedTags}
            handleTagSelect={handleTagSelect}
            onSelectAllTags={handleSelectAllTags}
            onTop10TagClick={handleTop10TagClick}
          />
        }
      />
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
