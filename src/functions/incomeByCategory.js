import getCommission from "./getCommission";

const incomeByCategory = (
  data,
  specifiedCommissions,
  top10,
  selectedCategories
) => {
  let categoryTotals = [];

  if (!data["Fee-Orders"]) {
    throw Error("No Data");
  }
  //iterate through each data point
  for (let item of data["Fee-Orders"]) {
    // Ignore if not in selected Categories.
    if (!selectedCategories.includes(item.category)) continue;

    let itemIndex = categoryTotals.findIndex(
      (e) => e.category === item.category
    );
    let lineCost = Number(item.qty) * Number(item["price($)"]);
    //add tag if unique
    if (itemIndex === -1) {
      categoryTotals.push({
        category: item.category,
        sales: lineCost,
        income: Number(
          getCommission(item.category, specifiedCommissions) * lineCost
        ),
        tabletIncome:
          item.deviceTypeGroup === "TABLET"
            ? getCommission(item.category, specifiedCommissions) * lineCost
            : 0,
        desktopIncome:
          item.deviceTypeGroup === "DESKTOP"
            ? getCommission(item.category, specifiedCommissions) * lineCost
            : 0,
        phoneIncome:
          item.deviceTypeGroup === "PHONE"
            ? getCommission(item.category, specifiedCommissions) * lineCost
            : 0,
      });
    } else {
      // update tag total
      categoryTotals[itemIndex].sales += lineCost;
      categoryTotals[itemIndex].income += Number(
        getCommission(item.category, specifiedCommissions) * lineCost
      );
      categoryTotals[itemIndex].tabletIncome +=
        item.deviceTypeGroup === "TABLET"
          ? getCommission(item.category, specifiedCommissions) * lineCost
          : 0;
      categoryTotals[itemIndex].desktopIncome +=
        item.deviceTypeGroup === "DESKTOP"
          ? getCommission(item.category, specifiedCommissions) * lineCost
          : 0;
      categoryTotals[itemIndex].phoneIncome +=
        item.deviceTypeGroup === "PHONE"
          ? getCommission(item.category, specifiedCommissions) * lineCost
          : 0;
    }
  }
  //round all numbers to nearest cent
  for (let category of categoryTotals) {
    if (category.sales) {
      // console.log(typeof tag.sales);
      category.sales = Number(category.sales.toFixed(2));
      // console.log(typeof tag.sales);
    }
    if (category.income) {
      // console.log(tag.income);

      category.income = Number(category.income.toFixed(2));
      // console.log(tag.income);
    }
    if (category.tabletIncome) {
      category.tabletIncome = Number(category.tabletIncome.toFixed(2));
    }
    if (category.desktopIncome) {
      category.desktopIncome = Number(category.desktopIncome.toFixed(2));
    }
    if (category.phoneIncome) {
      category.phoneIncome = Number(category.phoneIncome.toFixed(2));
    }
  }
  //sort it all!
  categoryTotals = categoryTotals.sort((a, b) => {
    if (a.income > b.income) {
      return -1;
    } else if (a.income < b.income) {
      return 1;
    }
    return 0;
  });

  //reduce to top 10
  if (top10 && categoryTotals.length > 10) {
    // console.log("before slice ", tagTotals);
    categoryTotals = categoryTotals.slice(0, 9);
    // console.log("after slice ", tagTotals);
  }

  return categoryTotals;
};

export default incomeByCategory;
