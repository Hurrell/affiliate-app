import XLSX from "xlsx";
// import { readFile } from "react-native-fs";

// const file = "../resources/exampleUSASales.xlsx";
/* read a workbook */

// // Guess country origin
// const getCountry = (data) => {
//   console.log("CHECKINGCOUNTRY", data["Fee-Orders"][1]);
// };

const headers = {
  uk: {
    orders: [
      "Category",
      "Name",
      "ASIN",
      "Date",
      "Qty",
      "Price",
      "Link Type",
      "Tag",
      "Orders through product links",
      "Device Type Group",
    ],
    earnings: [
      "Category",
      "Name",
      "ASIN",
      "Seller",
      "Tracking ID",
      "Date Shipped",
      "Price",
      "Items Shipped",
      "Returns",
      "Revenue",
      "Ad Fees",
      "Device Type Group",
      "Direct",
    ],
  },
  usCan: {
    orders: [
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
    ],
    earnings: [
      "Category",
      "Name",
      "ASIN",
      "Seller",
      "Tracking ID",
      "Date Shipped",
      "Price($)",
      "Items Shipped",
      "Returns",
      "Revenue($)",
      "Ad Fees($)",
      "Device Type Group",
    ],
  },
};

const orderPageToJson = (pageData, country) => {
  if (!pageData) {
    throw Error("Sheet is not compatible: (No Fee-Orders Sheet)");
  }

  if (pageData[1].length !== 10) {
    throw Error("Sheet is not compatible");
  }

  let orderPageHeaders;

  switch (country) {
    case "us":
      orderPageHeaders = headers.usCan.orders;
      break;
    case "canada":
      orderPageHeaders = headers.usCan.orders;
      break;
    case "uk":
      orderPageHeaders = headers.uk.orders;
      break;
    default:
      throw Error("Country not defined" + country);
  }

  //[
  //   "Category",
  //   "Name",
  //   "ASIN",
  //   "Date",
  //   "Qty",
  //   "Price($)",
  //   "Link Type",
  //   "Tag",
  //   "Indirect Sales",
  //   "Device Type Group",
  // ];

  for (let i in orderPageHeaders) {
    if (orderPageHeaders[i] !== pageData[1][i]) {
      throw Error("Data values not recognised");
    }
  }

  let orderPageJson = [];

  for (let i = 2; i < pageData.length; i++) {
    let row = pageData[i];
    orderPageJson.push({
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
  console.log("orderPageJson", orderPageJson);
  return orderPageJson;
};

const earningsPageToJson = (pageData, country) => {
  if (!pageData) {
    throw Error("Sheet is not compatible: (No Fee-Earnings Sheet)");
  }

  let earningsPageHeaders;
  let dataWidth;

  switch (country) {
    case "us":
      earningsPageHeaders = headers.usCan.earnings;
      dataWidth = 12;
      break;
    case "canada":
      earningsPageHeaders = headers.usCan.earnings;
      dataWidth = 12;
      break;
    case "uk":
      earningsPageHeaders = headers.uk.earnings;
      dataWidth = 13;
      break;
    default:
      throw Error("Country not defined");
  }

  if (pageData[1].length !== dataWidth) {
    throw Error("Sheet is not compatible");
  }
  // const earningsPageHeaders = [
  //   "Category",
  //   "Name",
  //   "ASIN",
  //   "Seller",
  //   "Tracking ID",
  //   "Date Shipped",
  //   "Price($)",
  //   "Items Shipped",
  //   "Returns",
  //   "Revenue($)",
  //   "Ad Fees($)",
  //   "Device Type Group",
  // ];

  for (let i in earningsPageHeaders) {
    if (earningsPageHeaders[i] !== pageData[1][i]) {
      throw Error("Data values not recognised");
    }
  }

  let earningsPageJson = [];

  for (let i = 2; i < pageData.length; i++) {
    let row = pageData[i];
    earningsPageJson.push({
      category: row[0],
      name: row[1],
      asin: row[2],
      seller: row[3],
      tag: row[4],
      dateShipped: row[5],
      price: row[6],
      itemsShipped: row[7],
      returns: row[8],
      "revenue($)": row[9],
      "adFees($)": row[10],
      deviceTypeGroup: row[11],
    });
  }
  console.log("earningsPageJson", earningsPageJson);
  return earningsPageJson;
};

const arrayToJsObj = (data, country) => {
  let jsObjData = {};

  if (!data["Fee-Orders"]) {
    throw Error("Sheet is not compatible: (No Fee-Orders Sheet)");
  } else {
    jsObjData["Fee-Orders"] = orderPageToJson(data["Fee-Orders"], country);
  }

  if (!data["Fee-Earnings"]) {
    throw Error("Sheet is not compatible: (No Fee-Orders Sheet)");
  } else {
    jsObjData["Fee-Earnings"] = earningsPageToJson(
      data["Fee-Earnings"],
      country
    );
  }

  console.log("JsObjectData", jsObjData);
  return jsObjData;
};

const xlsxImporter = (e, country) => {
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
      // getCountry(data);
      resolve(arrayToJsObj(data, country));
    };
    reader.onerror = (e) => {
      console.log(e);
    };
    reader.readAsBinaryString(file);
  });
};

export default xlsxImporter;
