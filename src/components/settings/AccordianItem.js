import React from "react";
// import CommissionTable from "../../renderers/commissionTable";

const AccordianItem = ({ expanded, contents }) => {
  if (expanded) {
    return (
      <div className="category-settings">
        <div className="category-settings-header">Category</div>
        <div className="category-settings-body">{contents}</div>
      </div>
    );
  }
  return null;
};

export default AccordianItem;
