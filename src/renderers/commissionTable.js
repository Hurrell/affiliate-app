import React, { useState } from "react";
import getCommission from "../functions/getCommission";
import incomeByCategory from "../functions/incomeByCategory";

function CommissionTable(props) {
  // console.log("updateCommissions1", props.specifiedCommissions);

  const [commissions, setCommissions] = useState([]);

  const updateCommissions = (jsObjData) => {
    let categoriesArray = incomeByCategory(
      jsObjData,
      props.specifiedCommissions,
      props.top10
    );

    let commissionTable = [];
    // if (data[1][0] !== "Category") {
    //   throw Error("document not formatted as expected (update Commissions)");
    // }
    // console.log("updateCommissions2", jsObjData, props.specifiedCommissions);
    for (let obj of categoriesArray) {
      commissionTable.push({
        category: obj.category,
        commission: getCommission(obj.category, props.specifiedCommissions),
      });
    }
    // console.log(commissionTable);
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

  if (!props.data) {
    return null;
  } else {
    updateCommissions(props.data);
  }

  const handleResetCommissions = (event) => {
    event.preventDefault();
    props.onResetCommissions(event);
  };

  const handleCommissionChange = (event) => {
    let category = event.target.dataset.category;
    let value = event.target.value;
    props.onCommissionChange(category, value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // props.onCommissionChange(event);
  };

  let listCategories = [];
  //console.log("commissionTable", categories);
  for (let item of commissions) {
    listCategories.push(
      <div className="category">
        <input type="checkbox" />
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
  return (
    <form onSubmit={handleFormSubmit} className="category-table">
      {listCategories}
      {/* <button>Apply changes</button> */}
      <button onClick={handleResetCommissions}>Reset Commissions</button>
    </form>
  );
}
export default CommissionTable;
