import React, { useState } from "react";
import getCommission from "../functions/getCommission";
import incomeByCategory from "../functions/incomeByCategory";

function CommissionTable(props) {
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
    //console.log("updateCommissions", jsObjData);
    for (let obj of categoriesArray) {
      commissionTable.push({
        category: obj.category,
        commission: getCommission(obj.category, props.specifiedCommissions),
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
        if (commissionTable[i].category !== commissions[i].category) {
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

  const handleCommissionChange = (event) => {
    let category = event.target.dataset.category;
    let value = event.target.value;
    props.onCommissionChange(category, value);
  };

  let listCategories = [];
  //console.log("commissionTable", categories);
  for (let item of commissions) {
    listCategories.push(
      <div className="category">
        <div className="category-name">{item.category}</div>
        <div>
          <input
            type="number"
            data-category={item.category}
            onChange={handleCommissionChange}
            className="commission-input"
            defaultValue={100 * Number(item.commission)}
          />
        </div>
      </div>
    );
  }
  return <form className="category-table">{listCategories}</form>;
}
export default CommissionTable;
