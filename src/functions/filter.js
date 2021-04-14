export default function (data, categories, tags, startDate, endDate) {
  let filteredData = {};
  console.log("categories", categories);
  console.log("dataintofilter", data);
  filteredData["Fee-Orders"] = data["Fee-Orders"].filter((item) => {
    // if (!(item.tag in tags)) {
    //   return false;
    // }
    if (!categories.includes(item.category)) {
      return false;
    }
    return true;
  });

  filteredData["Fee-Earnings"] = data["Fee-Earnings"].filter((item) => {
    // if (!(item.trackingId in tags)) {
    //   return false;
    // }
    if (!categories.includes(item.category)) {
      return false;
    }
    return true;
  });
  console.log("datafiltered", filteredData);

  return filteredData;
}
