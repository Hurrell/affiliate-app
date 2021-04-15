import React from "react";
import "./TagSettings.css";

const TagSettings = ({ tags, selectedTags, handleTagSelect }) => {
  //Prevent form submission.
  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  let listTags = [];
  for (let item of tags) {
    listTags.push(
      <div key={item.tag} className="tag">
        <input
          className="checkbox"
          type="checkbox"
          checked={selectedTags.includes(item.tag)}
          onClick={handleTagSelect}
          data-tag={item.tag}
        />
        <div className="tag-name">{item.tag}</div>
        {/* <div>
          <input
            type="number"
            min="0"
            max="100"
            data-category={item.category}
            onChange={handleCommissionChange}
            className="commission-input"
            value={100 * Number(item.commission)}
            name={item.category}
          />
        </div> */}
      </div>
    );
  }
  return (
    <form onSubmit={handleFormSubmit} className="tag-table">
      {/* <button onClick={handleResetCommissions}>Reset Commissions</button> */}
      {/* <button onClick={handleCategorySort} data-order="income">
      Sort by Income
    </button>
    <button onClick={handleCategorySort} data-order="alpha">
      Sort alphabetically
    </button>

    <button onClick={handleSelectAll}>Select All/None</button>
    <button onClick={handleTop10Click}>Select Top 10/All</button> */}

      {listTags}
    </form>
  );
};

export default TagSettings;
