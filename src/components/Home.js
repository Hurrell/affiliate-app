import React from "react";
import basicStats from "../functions/basicStats";

import "./Home.css";

const Home = ({
  chart,
  jsObjData,
  specifiedCommissions,
  top10,
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
  return (
    <div className="home-column">
      <div>
        <h2>Orders</h2>
        <div className="home-row">
          <div>
            <h3>Items:</h3>
            <div className="stat">{basicStats.getOrdersVolume(jsObjData)}</div>
          </div>
          <div>
            <h3>Baskets:</h3>
            <div className="stat">
              {basicStats.getTotalOrdersBaskets(jsObjData)}
            </div>
          </div>
          <div>
            <h3>Average Item Cost:</h3>
            <div className="stat">
              {new Intl.NumberFormat("en-US", currencyFormat).format(
                basicStats.getAverageOrdersItemCost(jsObjData)
              )}
            </div>
          </div>
          <div>
            <h3>Average Basket Cost:</h3>
            <div className="stat">
              {new Intl.NumberFormat("en-US", currencyFormat).format(
                basicStats.getAverageOrdersBasketCost(jsObjData)
              )}
            </div>
          </div>
          <div>
            <h3>Turnover:</h3>
            <div className="stat">
              {new Intl.NumberFormat("en-US", currencyFormat).format(
                basicStats.getTotalOrdersTurnover(jsObjData)
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
            <div className="stat">{basicStats.getSalesVolume(jsObjData)}</div>
          </div>
          <div>
            <h3>Baskets:</h3>
            <div className="stat">
              {basicStats.getTotalSalesBaskets(jsObjData)}
            </div>
          </div>
          <div>
            <h3>Average Item Cost:</h3>
            <div className="stat">
              {new Intl.NumberFormat("en-US", currencyFormat).format(
                basicStats.getAverageSalesItemCost(jsObjData)
              )}
            </div>
          </div>
          <div>
            <h3>Average Basket Cost:</h3>
            <div className="stat">
              {new Intl.NumberFormat("en-US", currencyFormat).format(
                basicStats.getAverageSalesBasketCost(jsObjData)
              )}
            </div>
          </div>
          <div>
            <h3>Turnover:</h3>
            <div className="stat">
              {new Intl.NumberFormat("en-US", currencyFormat).format(
                basicStats.getTotalSalesTurnover(jsObjData)
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
            <div className="stat">{basicStats.getTotalReturns(jsObjData)}</div>
          </div>
          <div>
            <h3>Baskets:</h3>
            <div className="stat">
              {basicStats.getTotalReturnsBaskets(jsObjData)}
            </div>
          </div>
          <div>
            <h3>Average Item Cost:</h3>
            <div className="stat">
              {new Intl.NumberFormat("en-US", currencyFormat).format(
                Math.round(basicStats.getAverageReturnedItemCost(jsObjData))
              )}
            </div>
          </div>
          <div>
            <h3>Average Basket Cost:</h3>
            <div className="stat">
              {new Intl.NumberFormat("en-US", currencyFormat).format(
                basicStats.getAverageReturnsBasketCost(jsObjData)
              )}
            </div>
          </div>
          <div>
            <h3>Returns Turnover:</h3>
            <div className="stat">
              {new Intl.NumberFormat("en-US", currencyFormat).format(
                Math.round(basicStats.getTotalReturnsCost(jsObjData))
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
                basicStats.getAverageFeeFraction(jsObjData)
              )}
            </div>
          </div>
          <div>
            <h3>Average Fee Per Item:</h3>
            <div className="stat">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(basicStats.getAverageFee(jsObjData))}
            </div>
          </div>
          <div>
            <h3>Actual Income:</h3>
            <div className="stat">
              {new Intl.NumberFormat("en-US", currencyFormat).format(
                Math.round(basicStats.getTotalActualIncome(jsObjData))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
