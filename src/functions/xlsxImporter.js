import XLSX from "xlsx";
// import { readFile } from "react-native-fs";

// const file = "../resources/exampleUSASales.xlsx";
/* read a workbook */
const arrayToJsObj = (data) => {
  if (data[1].length !== 10) {
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
    if (feb2020Headers[i] !== data[1][i]) {
      throw Error("Data values not recognised");
    }
  }

  let jsObjData = { name: data[0][0], data: [] };

  for (let i = 2; i < data.length; i++) {
    let row = data[i];
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
  let file = e.target.files[0];
  console.log("here is what the file looks like", e.target.files[0]);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      // call 'xlsx' to read the file
      let workbook = XLSX.read(event.target.result, { type: "binary" });
      /* convert from workbook to array of arrays */
      var first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(first_worksheet, { header: 1 });

      // console.log(data);
      resolve(arrayToJsObj(data));
    };
    reader.onerror = (e) => {
      console.log(e);
    };
    reader.readAsBinaryString(file);
  });
};

export default xlsxImporter;
