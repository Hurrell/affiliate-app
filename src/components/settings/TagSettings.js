import React, { useState } from "react";
import "./TagSettings.css";
import incomeByTag from "../../functions/incomeByTag";

const TagSettings = ({
  tags,
  selectedTags,
  handleTagSelect,
  onSelectAllTags,
  data,
  specifiedCommissions,
  onTop10TagClick,
}) => {
  const [tagDisplayOrder, setTagDisplayOrder] = useState("income");
  const [orderedTags, setOrderedTags] = useState(tags);

  //Prevent form submission.
  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  const handleSelectAllTags = (event) => {
    event.preventDefault();
    onSelectAllTags(event);
  };

  const handleTagSort = (event) => {
    event.preventDefault();
    if (event.target.dataset.order !== tagDisplayOrder) {
      if (
        event.target.dataset.order === "alpha" ||
        event.target.dataset.order === "income"
      )
        setTagDisplayOrder(event.target.dataset.order);
    }
  };

  const handleTop10TagClick = (event) => {
    event.preventDefault();
    onTop10TagClick(event);
  };

  const updateTags = (jsObjData) => {
    let tagsArray = incomeByTag(
      jsObjData,
      specifiedCommissions,
      tags.map((item) => {
        return item.tag;
      })
    );

    //Sort based on user selected order.
    switch (tagDisplayOrder) {
      case "income":
        tagsArray.sort((a, b) => b.income - a.income);
        break;
      case "alpha":
        tagsArray.sort((a, b) => a.tag.localeCompare(b.tag));
        break;
      default:
        tagsArray.sort((a, b) => b.income - a.income);
    }

    if (!orderedTags.every((item, iter) => item.tag === tagsArray[iter].tag)) {
      setOrderedTags(tagsArray);
    }
  };

  //initially order tags
  if (!data) {
    return null;
  } else {
    updateTags(data);
  }

  let listTags = [];
  for (let item of orderedTags) {
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
      <button onClick={handleTagSort} data-order="income">
        Sort by Income
      </button>
      <button onClick={handleTagSort} data-order="alpha">
        Sort alphabetically
      </button>

      <button onClick={handleSelectAllTags}>Select All/None</button>
      <button onClick={handleTop10TagClick}>Select Top 10/All</button>

      {listTags}
    </form>
  );
};

export default TagSettings;
