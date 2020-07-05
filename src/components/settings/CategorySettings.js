import React from "react";
// import CommissionTable from "../../renderers/commissionTable";

const CategorySettings = ({ expanded, CommissionTable }) => {
  if (expanded) {
    return (
      <div className="category-settings">
        <div className="category-settings-header">Category</div>
        <div className="category-settings-body">{CommissionTable}</div>
      </div>
    );
  }
  return null;
};

export default CategorySettings;
