const basicStats = {};

basicStats.getOrdersVolume = (data) => {
  let items = 0;
  for (let item of data["Fee-Orders"]) {
    if (Number(item.qty)) {
      items += Number(item.qty);
    }
  }
  return items;
};

basicStats.getSalesVolume = (data) => {
  let sales = 0;
  for (let item of data["Fee-Earnings"]) {
    if (Number(item.itemsShipped)) {
      sales += Number(item.itemsShipped);
    }
  }
  return sales;
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

basicStats.getTotalOrdersTurnover = (data) => {
  let totalSales = 0;
  for (let item of data["Fee-Orders"]) {
    if (Number(item.qty)) {
      totalSales += Number(item.qty) * Number(item["price($)"]);
    }
  }
  return totalSales;
};

basicStats.getTotalSalesTurnover = (data) => {
  let totalSales = 0;
  for (let item of data["Fee-Earnings"]) {
    if (Number(item.itemsShipped)) {
      totalSales += Number(item["revenue($)"]);
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

basicStats.getTotalFees = (data) => {
  let actualIncome = 0;
  for (let item of data["Fee-Earnings"]) {
    if (Number(item.itemsShipped)) {
      actualIncome += Number(item["adFees($)"]);
    }
  }
  return actualIncome;
};

basicStats.getTotalReturnsLostFees = (data) => {
  let actualIncome = 0;
  for (let item of data["Fee-Earnings"]) {
    if (Number(item.returns)) {
      actualIncome += Math.abs(Number(item["adFees($)"]));
    }
  }
  return actualIncome;
};

basicStats.getAverageOrdersItemCost = (data) => {
  return (
    basicStats.getTotalOrdersTurnover(data) / basicStats.getOrdersVolume(data)
  );
};

basicStats.getAverageSalesItemCost = (data) => {
  return (
    basicStats.getTotalSalesTurnover(data) / basicStats.getSalesVolume(data)
  );
};

basicStats.getAverageReturnedItemCost = (data) => {
  return (
    basicStats.getTotalReturnsCost(data) / basicStats.getTotalReturns(data)
  );
};

basicStats.getTotalOrdersBaskets = (data) => {
  let baskets = 0;
  data["Fee-Orders"].map((item, index) => {
    if (Number(item.qty)) {
      if (baskets == 0) {
        baskets += 1;
      } else if (item.date != data["Fee-Orders"][index - 1].date) {
        baskets += 1;
      }
    }
  });
  return baskets;
};

basicStats.getTotalSalesBaskets = (data) => {
  let baskets = 0;
  data["Fee-Earnings"].map((item, index) => {
    if (Number(item.itemsShipped)) {
      if (baskets == 0) {
        baskets += 1;
      } else if (
        item.dateShipped != data["Fee-Earnings"][index - 1].dateShipped
      ) {
        baskets += 1;
      }
    }
  });
  return baskets;
};

basicStats.getTotalReturnsBaskets = (data) => {
  let baskets = 0;
  data["Fee-Earnings"].map((item, index) => {
    if (Number(item.returns)) {
      if (baskets == 0) {
        baskets += 1;
      } else if (
        item.dateShipped != data["Fee-Earnings"][index - 1].dateShipped
      ) {
        baskets += 1;
      }
    }
  });
  return baskets;
};

basicStats.getAverageOrdersBasketCost = (data) => {
  return (
    basicStats.getTotalOrdersTurnover(data) /
    basicStats.getTotalOrdersBaskets(data)
  );
};

basicStats.getAverageSalesBasketCost = (data) => {
  return (
    basicStats.getTotalSalesTurnover(data) /
    basicStats.getTotalSalesBaskets(data)
  );
};

basicStats.getAverageReturnsBasketCost = (data) => {
  return (
    basicStats.getTotalReturnsCost(data) /
    basicStats.getTotalReturnsBaskets(data)
  );
};

basicStats.getAverageFee = (data) => {
  return (
    basicStats.getTotalActualIncome(data) / basicStats.getSalesVolume(data)
  );
};

basicStats.getAverageFeeFraction = (data) => {
  return (
    basicStats.getTotalActualIncome(data) /
    basicStats.getTotalSalesTurnover(data)
  );
};

basicStats.chartReadyStats = (data) => {
  return [
    {
      sum: "sales",
      volume: basicStats.getSalesVolume(data),
      baskets: basicStats.getTotalSalesBaskets(data),
      salesDriven: basicStats.getTotalSalesTurnover(data),
      income: basicStats.getTotalFees(data),
    },
    {
      sum: "returns",
      volume: basicStats.getTotalReturns(data),
      baskets: basicStats.getTotalReturnsBaskets(data),
      salesDriven: basicStats.getTotalReturnsCost(data),
      income: basicStats.getTotalReturnsLostFees(data),
    },
  ];
};

export default basicStats;
