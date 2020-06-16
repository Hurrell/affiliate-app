import React from "react";
import "./Settings.css";
import CommissionTable from "../renderers/commissionTable";

const Settings = ({
  jsObjData,
  specifiedCommissions,
  handleCommissionChange,
  top10,
  handleResetCommissions,
  handleTop10Click,
}) => {
  return (
    <div className="settings">
      <div className="top10">
        Display top 10 only
        <input
          type="checkbox"
          checked={top10}
          onClick={handleTop10Click}
        />{" "}
      </div>
      <div className="tag-settings">
        <div className="tag-settings-header">Tag</div>
        <div className="tag-settings-body"></div>
      </div>
      <div className="category-settings">
        <div className="category-settings-header">Category</div>
        <div className="category-settings-body">
          <CommissionTable
            data={jsObjData}
            specifiedCommissions={specifiedCommissions}
            onCommissionChange={handleCommissionChange}
            top10={top10}
            onResetCommissions={handleResetCommissions}
          />
        </div>
      </div>
    </div>
  );
};
export default Settings;
