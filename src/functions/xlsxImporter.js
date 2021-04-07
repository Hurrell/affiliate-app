import XLSX from "xlsx";
// import { readFile } from "react-native-fs";

// const file = "../resources/exampleUSASales.xlsx";
/* read a workbook */
const arrayToJsObj = (data) => {
  if (!data["Fee-Orders"]) {
    throw Error("Sheet is not compatible: (No Fee-Orders Sheet)");
  }

  if (data["Fee-Orders"][1].length !== 10) {
    throw Error("Sheet is not compatible");
  }

  const feb2020Headers = [
    "Category",
    "Name",
    "ASIN",
    "Date",
    "Qty",
    "Price($)",
    "Link Type",
    "Tag",
    "Indirect Sales",
    "Device Type Group",
  ];

  for (let i in feb2020Headers) {
    if (feb2020Headers[i] !== data["Fee-Orders"][1][i]) {
      throw Error("Data values not recognised");
    }
  }

  let jsObjData = { name: data["Fee-Orders"][0][0], data: [] };

  for (let i = 2; i < data["Fee-Orders"].length; i++) {
    let row = data["Fee-Orders"][i];
    jsObjData.data.push({
      category: row[0],
      name: row[1],
      asin: row[2],
      date: row[3],
      qty: row[4],
      "price($)": row[5],
      linkType: row[6],
      tag: row[7],
      indirectSales: row[8],
      deviceTypeGroup: row[9],
    });
  }

  return jsObjData;
};

const xlsxImporter = (e) => {
  //Convert an XLSX into jsonData
  let file = e.target.files[0];
  let data = {};
  console.log("here is what the file looks like", e.target.files[0]);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      // call 'xlsx' to read the file
      let workbook = XLSX.read(event.target.result, { type: "binary" });
      /* convert from workbook to array of arrays */
      workbook.SheetNames.forEach((sheetName) => {
        let workSheet = workbook.Sheets[sheetName];
        data[sheetName] = XLSX.utils.sheet_to_json(workSheet, { header: 1 });
      });
      // var first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
      // const data = XLSX.utils.sheet_to_json(first_worksheet, { header: 1 });

      console.log("data", data);
      resolve(arrayToJsObj(data));
    };
    reader.onerror = (e) => {
      console.log(e);
    };
    reader.readAsBinaryString(file);
  });
};

export default xlsxImporter;
