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
  onTop10Click,
  selectedCategories,
  handleCategorySelect,
  categories,
  onSelectAll,
}) {
  // console.log("updateCommissions1", props.specifiedCommissions);

  const [categoryDisplayOrder, setCategoryDisplayOrder] = useState("income");

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

    //Sort based on user selected order.
    switch (categoryDisplayOrder) {
      case "income":
        categoriesArray.sort((a, b) => a.income > b.income);
        break;
      case "alpha":
        categoriesArray.sort((a, b) => a.category.localeCompare(b.category));
        break;
      default:
        categoriesArray.sort((a, b) => a.income > b.income);
    }

    let commissionTable = [];

    for (let obj of categoriesArray) {
      commissionTable.push({
        category: obj.category,
        commission: getCommission(obj.category, specifiedCommissions),
      });
    }

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

  const handleCategorySort = (event) => {
    event.preventDefault();
    if (event.target.dataset.order !== categoryDisplayOrder) {
      if (
        event.target.dataset.order === "alpha" ||
        event.target.dataset.order === "income"
      )
        setCategoryDisplayOrder(event.target.dataset.order);
    }
  };

  const handleTop10Click = (event) => {
    event.preventDefault();
    onTop10Click(event);
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
      <button onClick={handleResetCommissions}>Reset Commissions</button>
      <button onClick={handleCategorySort} data-order="income">
        Sort by Income
      </button>
      <button onClick={handleCategorySort} data-order="alpha">
        Sort alphabetically
      </button>

      <button onClick={handleSelectAll}>Select All/None</button>
      <button onClick={handleTop10Click}>Select Top 10/All</button>
      {/* <input type="checkbox" checked={top10} onClick={handleTop10Click} /> */}

      {listCategories}
      {/* <button>Apply changes</button> */}
    </form>
  );
}
export default CommissionTable;
