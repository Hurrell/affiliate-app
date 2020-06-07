import getCommission from "./getCommission";

const incomeByTag = (data) => {
  let tagTotals = [];

  if (!data.data) {
    throw Error("No Data");
  }
  //iterate through each data point
  for (let item of data.data) {
    let itemIndex = tagTotals.findIndex((e) => e.tag === item.tag);
    let lineCost = Number(item.qty) * Number(item["price($)"]);
    //add tag if unique
    if (itemIndex === -1) {
      tagTotals.push({
        tag: item.tag,
        sales: lineCost,
        income: Number(getCommission(item.category) * lineCost),
        tabletIncome:
          item.deviceTypeGroup === "TABLET"
            ? getCommission(item.category) * lineCost
            : 0,
        desktopIncome:
          item.deviceTypeGroup === "DESKTOP"
            ? getCommission(item.category) * lineCost
            : 0,
        phoneIncome:
          item.deviceTypeGroup === "PHONE"
            ? getCommission(item.category) * lineCost
            : 0,
      });
    } else {
      // update tag total
      tagTotals[itemIndex].sales += lineCost;
      tagTotals[itemIndex].income += Number(
        getCommission(item.category) * lineCost
      );
      tagTotals[itemIndex].tabletIncome +=
        item.deviceTypeGroup === "TABLET"
          ? getCommission(item.category) * lineCost
          : 0;
      tagTotals[itemIndex].desktopIncome +=
        item.deviceTypeGroup === "DESKTOP"
          ? getCommission(item.category) * lineCost
          : 0;
      tagTotals[itemIndex].phoneIncome +=
        item.deviceTypeGroup === "PHONE"
          ? getCommission(item.category) * lineCost
          : 0;
    }
  }
  //round all numbers to nearest cent
  for (let tag of tagTotals) {
    if (tag.sales) {
      // console.log(typeof tag.sales);
      tag.sales = Number(tag.sales.toFixed(2));
      // console.log(typeof tag.sales);
    }
    if (tag.income) {
      // console.log(tag.income);

      tag.income = Number(tag.income.toFixed(2));
      // console.log(tag.income);
    }
    if (tag.tabletIncome) {
      tag.tabletIncome = Number(tag.tabletIncome.toFixed(2));
    }
    if (tag.desktopIncome) {
      tag.desktopIncome = Number(tag.desktopIncome.toFixed(2));
    }
    if (tag.phoneIncome) {
      tag.phoneIncome = Number(tag.phoneIncome.toFixed(2));
    }
  }
  //sort it all!
  tagTotals = tagTotals.sort((a, b) => {
    if (a.income > b.income) {
      return -1;
    } else if (a.income < b.income) {
      return 1;
    }
    return 0;
  });

  return tagTotals;
};

export default incomeByTag;
