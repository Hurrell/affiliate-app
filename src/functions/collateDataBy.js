import getUniqueValues from "./getUniqueValues";
import getCommission from "./getCommission";

const collateDataBy = (data, value, specifiedCommissions) => {
  //initialise list
  let collated = [];
  //iterate through data
  for (let line of data) {
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
        income: Number(
          getCommission(line.category, specifiedCommissions) * lineCost
        ),
        tabletIncome:
          line.deviceTypeGroup === "TABLET"
            ? getCommission(line.category, specifiedCommissions) * lineCost
            : 0,
        desktopIncome:
          line.deviceTypeGroup === "DESKTOP"
            ? getCommission(line.category, specifiedCommissions) * lineCost
            : 0,
        phoneIncome:
          line.deviceTypeGroup === "PHONE"
            ? getCommission(line.category, specifiedCommissions) * lineCost
            : 0,
      });
    } else {
      // Else add to existing value.
      collated[collatedIndex].sales += lineCost;
      collated[collatedIndex].income += Number(
        getCommission(line.category, specifiedCommissions) * lineCost
      );
      collated[collatedIndex].tabletIncome +=
        line.deviceTypeGroup === "TABLET"
          ? getCommission(line.category, specifiedCommissions) * lineCost
          : 0;
      collated[collatedIndex].desktopIncome +=
        line.deviceTypeGroup === "DESKTOP"
          ? getCommission(line.category, specifiedCommissions) * lineCost
          : 0;
      collated[collatedIndex].phoneIncome +=
        line.deviceTypeGroup === "PHONE"
          ? getCommission(line.category, specifiedCommissions) * lineCost
          : 0;
    }
  }
  //round all numbers to nearest cent
  for (let item of collated) {
    if (item.sales) {
      item.sales = Number(item.sales.toFixed(2));
    }
    if (item.income) {
      item.income = Number(item.income.toFixed(2));
    }
    if (item.tabletIncome) {
      item.tabletIncome = Number(item.tabletIncome.toFixed(2));
    }
    if (item.desktopIncome) {
      item.desktopIncome = Number(item.desktopIncome.toFixed(2));
    }
    if (item.phoneIncome) {
      item.phoneIncome = Number(item.phoneIncome.toFixed(2));
    }
  }
  //sort it all!
  collated = collated.sort((a, b) => {
    if (a.income > b.income) {
      return -1;
    } else if (a.income < b.income) {
      return 1;
    }
    return 0;
  });

  return collated;
};

export default collateDataBy;
