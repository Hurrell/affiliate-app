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

function App() {
  const [jsObjData, setJsObjData] = useState(false);
  const [specifiedCommissions, setSpecifiedCommissions] = useState([]);
  const [top10, setTop10] = useState(true);
  const handleFileInput = async (e) => {
    try {
      const data = await xlsxImporter(e);
      console.log(data);
      setJsObjData(data);
    } catch (err) {
      console.log(err);
    }
  };
  let incomeByTagChart = "";
  let incomeByCategoryChart = "";
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
  }

  const handleTop10Click = (event) => {
    setTop10(!top10);
  };

  const handleCommissionChange = (category, value) => {
    console.log("chaaaanging", value);
    let index = specifiedCommissions.findIndex(
      (item) => item.category === category
    );
    if (index === -1) {
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
  // if (!specifiedCommissions.length) {
  //   handleCommissionChange();
  // }
  console.log("The Specified Commissions are: ", specifiedCommissions);
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
      />
      <div className="category-chart">{incomeByCategoryChart}</div>
      <div className="tag-chart">{incomeByTagChart}</div>
    </div>
  );
}

export default App;
