import React, { useState } from "react";
import getCommission from "../../functions/getCommission";
import incomeByCategory from "../../functions/incomeByCategory";
import "./CommissionTable.css";

function CommissionTable({
  data,
  specifiedCommissions,
  onCommissionChange,
  top10,
  onResetCommissions,
  handleTop10Click,
  selectedCategories,
  handleCategorySelect,
  categories,
  onSelectAll,
}) {
  // console.log("updateCommissions1", props.specifiedCommissions);

  const [commissions, setCommissions] = useState([]);

  const updateCommissions = (jsObjData) => {
    let categoriesArray = incomeByCategory(
      jsObjData,
      specifiedCommissions,
      top10,
      categories.map((item) => {
        return item.category;
      })
    );

    let commissionTable = [];

    for (let obj of categoriesArray) {
      commissionTable.push({
        category: obj.category,
        commission: getCommission(obj.category, specifiedCommissions),
      });
    }
    commissionTable.sort((a, b) => a.category.localeCompare(b.category));
    // for row in data,
    // if category not already logged
    // add category and getCommission
    if (commissionTable.length !== commissions.length) {
      setCommissions(commissionTable);
    } else {
      for (let i in commissionTable) {
        if (
          commissionTable[i].category !== commissions[i].category ||
          commissionTable[i].commission !== commissions[i].commission
        ) {
          setCommissions(commissionTable);
        }
      }
    }
  };

  //initially set commissions
  if (!data) {
    return null;
  } else {
    updateCommissions(data);
  }

  const handleResetCommissions = (event) => {
    event.preventDefault();
    onResetCommissions(event);
  };

  const handleCommissionChange = (event) => {
    let category = event.target.dataset.category;
    let value = event.target.value;
    onCommissionChange(category, value);
  };

  //Prevent form submission.
  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  const handleSelectAll = (event) => {
    event.preventDefault();
    onSelectAll(event);
  };

  let listCategories = [];
  //console.log("commissionTable", categories);
  for (let item of commissions) {
    listCategories.push(
      <div key={item.category} className="category">
        <input
          className="checkbox"
          type="checkbox"
          checked={selectedCategories.includes(item.category)}
          onClick={handleCategorySelect}
          data-category={item.category}
        />
        <div className="category-name">{item.category}</div>
        <div>
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
        </div>
      </div>
    );
  }

  console.log("props.categories", categories, selectedCategories);
  return (
    <form onSubmit={handleFormSubmit} className="category-table">
      <button onClick={handleSelectAll}>Select All</button>
      {listCategories}
      {/* <button>Apply changes</button> */}
      <button onClick={handleResetCommissions}>Reset Commissions</button>
    </form>
  );
}
export default CommissionTable;
