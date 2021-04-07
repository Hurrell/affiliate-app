import getCommission from "./getCommission";

const collateDataBy = (data, value, settings) => {
  let categories = settings.categories;
  //initialise list
  let collated = [];
  //iterate through data
  for (let line of data) {
    // Filter by category
    let categoryIndex = categories.findIndex((item) => {
      return item.category === line.category;
    });
    if (!categories[categoryIndex].selected) continue;

    // Get line cost.
    let lineCost = Number(line.qty) * Number(line["price($)"]);

    // Is this a new value?
    let collatedIndex = collated.findIndex((collatedItem) => {
      return line[value] === collatedItem[value];
    });
    // If new value, add to list

    if (collatedIndex === -1) {
      collated.push({
        [value]: line[value],
        sales: lineCost,
        income: categories[categoryIndex].specifiedCommission
          ? Number(categories[categoryIndex].specifiedCommission * lineCost)
          : Number(getCommission(line.category, []) * lineCost),
        tabletIncome:
          line.deviceTypeGroup === "TABLET"
            ? categories[categoryIndex].specifiedCommission
              ? Number(categories[categoryIndex].specifiedCommission * lineCost)
              : Number(getCommission(line.category, []) * lineCost)
            : 0,
        desktopIncome:
          line.deviceTypeGroup === "DESKTOP"
            ? categories[categoryIndex].specifiedCommission
              ? Number(categories[categoryIndex].specifiedCommission * lineCost)
              : Number(getCommission(line.category, []) * lineCost)
            : 0,
        phoneIncome:
          line.deviceTypeGroup === "PHONE"
            ? categories[categoryIndex].specifiedCommission
              ? Number(categories[categoryIndex].specifiedCommission * lineCost)
              : Number(getCommission(line.category, []) * lineCost)
            : 0,
      });
    } else {
      // Else add to existing value.
      collated[collatedIndex].sales += lineCost;
      collated[collatedIndex].income += Number(
        getCommission(
          line.category,
          categories[categoryIndex].specifiedCommission
        ) * lineCost
      );
      for (let device of [
        { dataName: "TABLET", incomeName: "tabletIncome" },
        { dataName: "DESKTOP", incomeName: "desktopIncome" },
        { dataName: "PHONE", incomeName: "phoneIncome" },
      ]) {
        collated[collatedIndex][device.incomeName] +=
          line.deviceTypeGroup === device.dataName
            ? getCommission(
                line.category,
                categories[categoryIndex].specifiedCommission
              ) * lineCost
            : 0;
      }
    }
  }

  // Round all numbers to nearest cent
  collated = collated.map((item) => {
    for (let key of [
      "sales",
      "income",
      "tabletIncome",
      "desktopIncome",
      "phoneIncome",
    ]) {
      item[key] = Number(item[key].toFixed(2));
    }
    return item;
  });

  // Sort by Income
  collated = collated.sort((a, b) => {
    if (a.income > b.income) return -1;
    if (a.income < b.income) return 1;
    return 0;
  });

  return collated;
};

export default collateDataBy;
