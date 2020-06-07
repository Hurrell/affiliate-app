import React, { useState } from "react";
import "./App.css";
import RenderIncomeByTag from "./renderers/renderIncomeByTag";
import incomeByTag from "./functions/incomeByTag";
import exampleJsonObj from "./resources/exampleJsonObj";
import XLSX from "xlsx";
import xlsxImporter from "./functions/xlsxImporter";

function App() {
  const [jsObjData, setJsObjData] = useState({});

  const handleFileInput = async (e) => {
    try {
      const data = await xlsxImporter(e);
      console.log(data);
      setJsObjData(data);
    } catch (err) {
      console.log(err);
    }
  };
  let chart = "";
  if (jsObjData.data) {
    chart = <RenderIncomeByTag totalsByTag={incomeByTag(jsObjData)} />;
  }
  return (
    <div className="App">
      <input
        type="file"
        id="file-selector"
        accept=".xlsx"
        onChange={handleFileInput}
      ></input>
      <div className="tag-chart">{chart}</div>
    </div>
  );
}

export default App;
