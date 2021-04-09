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

basicStats.getTotalSalesIncome = (data) => {
  //   let totalSales = data;
};

export default basicStats;
