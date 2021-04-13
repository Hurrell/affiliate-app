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
  return (
    <div className="home-column">
      <div>
        <h2>Orders</h2>
        <div className="home-row">
          <div>
            <h3>Items:</h3>
            <div className="stat">{basicStats.getSalesVolume(jsObjData)}</div>
          </div>
          <div>
            <h3>Baskets:</h3>
            <div className="stat">{basicStats.getSalesVolume(jsObjData)}</div>
          </div>
          <div>
            <h3>Average Item Cost:</h3>
            <div className="stat">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(Math.round(basicStats.getAverageItemCost(jsObjData)))}
            </div>
          </div>
          <div>
            <h3>Sales Turnover:</h3>
            <div className="stat">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(
                Math.round(basicStats.getTotalSalesTurnover(jsObjData))
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
            <div className="stat">{basicStats.getSalesVolume(jsObjData)}</div>
          </div>
          <div>
            <h3>Average Item Cost:</h3>
            <div className="stat">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(Math.round(basicStats.getAverageItemCost(jsObjData)))}
            </div>
          </div>
          <div>
            <h3>Returns Turnover:</h3>
            <div className="stat">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(Math.round(basicStats.getTotalReturnsCost(jsObjData)))}
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2>Fees</h2>
        <div className="home-row">
          <div>
            <h3>Actual Income:</h3>
            <div className="stat">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(Math.round(basicStats.getTotalActualIncome(jsObjData)))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
