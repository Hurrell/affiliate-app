import React, { useState } from "react";
import "./Sidebar.css";

const SidebarItem = ({ item, handleChartSelect }) => {
  // Give additional CSS to selected item.
  let classString = "sidebar-chart-item";
  if (item.selected) {
    classString += " selected-item";
  }
  return (
    <div
      data-chartname={item.chartname}
      onClick={handleChartSelect}
      className={classString}
    >
      {item.name}
    </div>
  );
};

const Sidebar = ({ chart, handleChartSelect }) => {
  //   const [chart, setChart] = useState("devices");
  //   const handleChartSelect = (event) => {
  //     setChart(event.target.dataset.chartname);
  //   };
  const itemList = [
    { name: "Devices", chartname: "devices" },
    { name: "Tag", chartname: "tag" },
    { name: "Category", chartname: "category" },
    { name: "Time", chartname: "time" },
  ];
  // Add which item selected.
  for (let item of itemList) {
    item.selected = chart === item.chartname;
  }
  return (
    <div className="sidebar">
      <div className="title">Affiliate App</div>
      <div className="sidebar-chart-list">
        {/* Create sidebar items */}
        {itemList.map((item) => (
          <SidebarItem item={item} handleChartSelect={handleChartSelect} />
        ))}
      </div>
    </div>
  );
};
export default Sidebar;
