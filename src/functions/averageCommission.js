import getCommission from "./getCommission";

const averageCommission = (data, specifiedCommissions) => {
  let totalSales = 0;
  let totalIncome = 0;
  if (!data["Fee-Orders"]) {
    throw Error("No Data");
  }

  for (let item of data["Fee-Orders"]) {
    // let itemIndex = deviceTotals.findIndex(
    //   (e) => e.deviceTypeGroup === item.deviceTypeGroup
    // );
    let lineCost = Number(item.qty) * Number(item["price($)"]);
    // //add device if unique
    // if (itemIndex === -1) {
    //   deviceTotals.push({
    //     deviceTypeGroup: item.deviceTypeGroup,
    //     sales: lineCost,
    //   });
    // } else {
    //   // update device total
    //   deviceTotals[itemIndex].sales += lineCost;
    // }
    totalSales += lineCost;
    totalIncome += Number(
      getCommission(item.category, specifiedCommissions) * lineCost
    );
  }
  let proportion = totalIncome / totalSales;
  let percent = Math.round(proportion * 10000) / 100;
  return percent;
};

export default averageCommission;
