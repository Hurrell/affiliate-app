const salesByDevice = (data, specifiedCommissions, top10, categories) => {
  //Take in json data
  //Spit out nivo formatted data

  let deviceTotals = [];

  if (!data["Fee-Orders"]) {
    throw Error("No Data");
  }
  //iterate through each data point
  for (let item of data["Fee-Orders"]) {
    let itemIndex = deviceTotals.findIndex(
      (e) => e.deviceTypeGroup === item.deviceTypeGroup
    );
    let lineCost = Number(item.qty) * Number(item["price($)"]);
    //add device if unique
    if (itemIndex === -1) {
      deviceTotals.push({
        deviceTypeGroup: item.deviceTypeGroup,
        sales: lineCost,
      });
    } else {
      // update device total
      deviceTotals[itemIndex].sales += lineCost;
    }
  }
  //round all numbers to nearest cent
  for (let device of deviceTotals) {
    if (device.sales) {
      device.sales = Number(device.sales.toFixed(2));
    }
  }
  //sort it all!
  deviceTotals = deviceTotals.sort((a, b) => {
    if (a.sales > b.sales) {
      return -1;
    } else if (a.income < b.income) {
      return 1;
    }
    return 0;
  });

  return deviceTotals;
};

export default salesByDevice;
