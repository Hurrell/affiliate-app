import React, { useState } from "react";
import "./App.css";
import RenderIncomeByTag from "./renderers/renderIncomeByTag";
import incomeByTag from "./functions/incomeByTag";
import exampleJsonObj from "./resources/exampleJsonObj";
import XLSX from "xlsx";
import xlsxImporter from "./functions/xlsxImporter";
import CommissionTable from "./renderers/commissionTable";
import getCommission from "./functions/getCommission";
import incomeByCategory from "./functions/incomeByCategory";
import RenderIncomeByCategory from "./renderers/renderIncomeByCategory";
import RenderIncomeByDevice from "./renderers/renderIncomeByDevice";
import incomeByDevice from "./functions/incomeByDevice";

function App() {
  const [jsObjData, setJsObjData] = useState(false);
  const [specifiedCommissions, setSpecifiedCommissions] = useState([]);
  const [top10, setTop10] = useState(true);
  const handleFileInput = async (e) => {
    try {
      const data = await xlsxImporter(e);
      // console.log(data);
      setJsObjData(data);
    } catch (err) {
      // console.log(err);
    }
  };
  let incomeByTagChart = "";
  let incomeByCategoryChart = "";
  let incomeByDeviceChart = "";
  if (jsObjData.data) {
    incomeByTagChart = (
      <RenderIncomeByTag
        totalsByTag={incomeByTag(jsObjData, specifiedCommissions, top10)}
      />
    );
    incomeByCategoryChart = (
      <RenderIncomeByCategory
        totalsByCategory={incomeByCategory(
          jsObjData,
          specifiedCommissions,
          top10
        )}
        top10={top10}
      />
    );
    incomeByDeviceChart = (
      <RenderIncomeByDevice
        totalsByDevice={incomeByDevice(jsObjData, specifiedCommissions, top10)}
      />
    );
  }

  const handleTop10Click = (event) => {
    setTop10(!top10);
  };

  const handleResetCommissions = (event) => {
    setSpecifiedCommissions([]);
  };

  const handleCommissionChange = (category, value) => {
    // console.log("chaaaanging", value, category);
    let index = specifiedCommissions.findIndex(
      (item) => item.category === category
    );
    if (index === -1) {
      // console.log("category not found");
      setSpecifiedCommissions(
        specifiedCommissions.concat({
          category: category,
          commission: Number((value / 100).toFixed(2)),
        })
      );
    } else {
      let newCommissions = [...specifiedCommissions];
      newCommissions[index].commission = Number((value / 100).toFixed(2));
      setSpecifiedCommissions(newCommissions);
    }
  };
  // const handleCommissionChange = (event) => {
  //   console.log("doing stuff");
  //   let inputs = event.target.elements;
  //   let newCommissions = [...specifiedCommissions];
  //   for (let commission of newCommissions) {
  //     console.log(commission.value, inputs[commission.category].value);

  //     if (inputs[commission.category].value !== commission.value) {
  //       commission.value = inputs[commission.category].value;
  //       console.log(commission.value, inputs[commission.category].value);
  //     }
  //   }
  //   setSpecifiedCommissions(newCommissions);
  // };
  // if (!specifiedCommissions.length) {
  //   handleCommissionChange();
  // }
  // console.log("The Specified Commissions are: ", specifiedCommissions);
  return (
    <div className="App">
      <input
        type="file"
        id="file-selector"
        accept=".xlsx"
        onChange={handleFileInput}
      ></input>
      <div>
        Display top 10 only{" "}
        <input type="checkbox" checked={top10} onClick={handleTop10Click} />{" "}
      </div>
      <CommissionTable
        data={jsObjData}
        specifiedCommissions={specifiedCommissions}
        onCommissionChange={handleCommissionChange}
        top10={top10}
        onResetCommissions={handleResetCommissions}
      />
      <div className="device-chart">{incomeByDeviceChart}</div>

      <div className="category-chart">{incomeByCategoryChart}</div>
      <div className="tag-chart">{incomeByTagChart}</div>
    </div>
  );
}

export default App;
