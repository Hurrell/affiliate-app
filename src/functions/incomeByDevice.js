import getCommission from "./getCommission";

const incomeByDevice = (data, specifiedCommissions, top10) => {
  let deviceTotals = [];

  if (!data.data) {
    throw Error("No Data");
  }
  //iterate through each data point
  for (let item of data.data) {
    let itemIndex = deviceTotals.findIndex(
      (e) => e.deviceTypeGroup === item.deviceTypeGroup
    );
    let lineCost = Number(item.qty) * Number(item["price($)"]);
    //add device if unique
    if (itemIndex === -1) {
      deviceTotals.push({
        deviceTypeGroup: item.deviceTypeGroup,
        sales: lineCost,
        income: Number(
          getCommission(item.category, specifiedCommissions) * lineCost
        ),
      });
    } else {
      // update device total
      deviceTotals[itemIndex].sales += lineCost;
      deviceTotals[itemIndex].income += Number(
        getCommission(item.category, specifiedCommissions) * lineCost
      );
    }
  }
  //round all numbers to nearest cent
  for (let device of deviceTotals) {
    if (device.sales) {
      // console.log(typeof tag.sales);
      device.sales = Number(device.sales.toFixed(2));
      // console.log(typeof tag.sales);
    }
    if (device.income) {
      // console.log(tag.income);

      device.income = Number(device.income.toFixed(2));
      // console.log(tag.income);
    }
  }
  //sort it all!
  deviceTotals = deviceTotals.sort((a, b) => {
    if (a.income > b.income) {
      return -1;
    } else if (a.income < b.income) {
      return 1;
    }
    return 0;
  });

  //   //reduce to top 10
  //   if (top10 && categoryTotals.length > 10) {
  //     // console.log("before slice ", tagTotals);
  //     categoryTotals = categoryTotals.slice(0, 9);
  //     // console.log("after slice ", tagTotals);
  //   }

  return deviceTotals;
};

export default incomeByDevice;
