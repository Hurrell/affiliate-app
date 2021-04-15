export default function (
  data,
  selectedCategories,
  selectedTags,
  startDate,
  endDate
) {
  let filteredData = {};
  console.log("categories", selectedCategories);
  console.log("tags", selectedTags);
  console.log("dataintofilter", data);
  filteredData["Fee-Orders"] = data["Fee-Orders"].filter((item) => {
    if (!selectedTags.includes(item.tag)) {
      return false;
    }
    if (!selectedCategories.includes(item.category)) {
      return false;
    }
    return true;
  });

  filteredData["Fee-Earnings"] = data["Fee-Earnings"].filter((item) => {
    if (!selectedTags.includes(item.tag)) {
      return false;
    }
    if (!selectedCategories.includes(item.category)) {
      return false;
    }
    return true;
  });
  console.log("datafiltered", filteredData);

  return filteredData;
}
