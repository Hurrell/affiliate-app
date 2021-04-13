const basicStats = {};

basicStats.getSalesVolume = (data) => {
  return data["Fee-Orders"].length;
};

basicStats.getTotalReturns = (data) => {
  let returns = 0;
  for (let item of data["Fee-Earnings"]) {
    if (Number(item.returns)) {
      returns += Number(item.returns);
    }
  }
  return returns;
};

basicStats.getTotalReturnsCost = (data) => {
  let returnsCost = 0;
  for (let item of data["Fee-Earnings"]) {
    if (Number(item.returns)) {
      returnsCost += Number(item["revenue($)"]);
    }
  }
  return returnsCost;
};

basicStats.getTotalSalesTurnover = (data) => {
  let totalSales = 0;
  for (let item of data["Fee-Orders"]) {
    if (Number(item.qty)) {
      totalSales += Number(item.qty) * Number(item["price($)"]);
    }
  }
  return totalSales;
};

basicStats.getTotalActualIncome = (data) => {
  let actualIncome = 0;
  for (let item of data["Fee-Earnings"]) {
    if (Number(item["adFees($)"])) {
      actualIncome += Number(item["adFees($)"]);
    }
  }
  return actualIncome;
};

basicStats.getAverageItemCost = (data) => {
  return (
    basicStats.getTotalSalesTurnover(data) / basicStats.getSalesVolume(data)
  );
};

export default basicStats;
