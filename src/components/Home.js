import React from "react";
import basicStats from "../functions/basicStats";
import filter from "../functions/filter";

import "./Home.css";

const Home = ({
  chart,
  jsObjData,
  specifiedCommissions,
  selectedCategories,
  categories,
}) => {
  let currencyFormat = {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  };
  let percentFormat = {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  };

  let filteredData = filter(jsObjData, selectedCategories);
  return (
    <div className="home-column">
      <div>
        <h2>Orders</h2>
        <div className="home-row">
          <div>
            <h3>Items:</h3>
            <div className="stat">
              {basicStats.getOrdersVolume(filteredData)}
            </div>
          </div>
          <div>
            <h3>Baskets:</h3>
            <div className="stat">
              {basicStats.getTotalOrdersBaskets(filteredData)}
            </div>
          </div>
          <div>
            <h3>Average Item Cost:</h3>
            <div className="stat">
              {new Intl.NumberFormat("en-US", currencyFormat).format(
                basicStats.getAverageOrdersItemCost(filteredData)
              )}
            </div>
          </div>
          <div>
            <h3>Average Basket Cost:</h3>
            <div className="stat">
              {new Intl.NumberFormat("en-US", currencyFormat).format(
                basicStats.getAverageOrdersBasketCost(filteredData)
              )}
            </div>
          </div>
          <div>
            <h3>Turnover:</h3>
            <div className="stat">
              {new Intl.NumberFormat("en-US", currencyFormat).format(
                basicStats.getTotalOrdersTurnover(filteredData)
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2>Sales</h2>
        <div className="home-row">
          <div>
            <h3>Items:</h3>
            <div className="stat">
              {basicStats.getSalesVolume(filteredData)}
            </div>
          </div>
          <div>
            <h3>Baskets:</h3>
            <div className="stat">
              {basicStats.getTotalSalesBaskets(filteredData)}
            </div>
          </div>
          <div>
            <h3>Average Item Cost:</h3>
            <div className="stat">
              {new Intl.NumberFormat("en-US", currencyFormat).format(
                basicStats.getAverageSalesItemCost(filteredData)
              )}
            </div>
          </div>
          <div>
            <h3>Average Basket Cost:</h3>
            <div className="stat">
              {new Intl.NumberFormat("en-US", currencyFormat).format(
                basicStats.getAverageSalesBasketCost(filteredData)
              )}
            </div>
          </div>
          <div>
            <h3>Turnover:</h3>
            <div className="stat">
              {new Intl.NumberFormat("en-US", currencyFormat).format(
                basicStats.getTotalSalesTurnover(filteredData)
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2>Returns</h2>
        <div className="home-row">
          <div>
            <h3>Items:</h3>
            <div className="stat">
              {basicStats.getTotalReturns(filteredData)}
            </div>
          </div>
          <div>
            <h3>Baskets:</h3>
            <div className="stat">
              {basicStats.getTotalReturnsBaskets(filteredData)}
            </div>
          </div>
          <div>
            <h3>Average Item Cost:</h3>
            <div className="stat">
              {new Intl.NumberFormat("en-US", currencyFormat).format(
                Math.round(basicStats.getAverageReturnedItemCost(filteredData))
              )}
            </div>
          </div>
          <div>
            <h3>Average Basket Cost:</h3>
            <div className="stat">
              {new Intl.NumberFormat("en-US", currencyFormat).format(
                basicStats.getAverageReturnsBasketCost(filteredData)
              )}
            </div>
          </div>
          <div>
            <h3>Returns Turnover:</h3>
            <div className="stat">
              {new Intl.NumberFormat("en-US", currencyFormat).format(
                Math.round(basicStats.getTotalReturnsCost(filteredData))
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2>Fees</h2>
        <div className="home-row">
          <div>
            <h3>Average Fee Fraction:</h3>
            <div className="stat">
              {new Intl.NumberFormat("en-US", percentFormat).format(
                basicStats.getAverageFeeFraction(filteredData)
              )}
            </div>
          </div>
          <div>
            <h3>Average Fee Per Item:</h3>
            <div className="stat">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(basicStats.getAverageFee(filteredData))}
            </div>
          </div>
          <div>
            <h3>Actual Income:</h3>
            <div className="stat">
              {new Intl.NumberFormat("en-US", currencyFormat).format(
                Math.round(basicStats.getTotalActualIncome(filteredData))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
