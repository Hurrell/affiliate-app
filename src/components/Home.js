import React from "react";
import basicStats from "../functions/basicStats";
const Home = ({
  chart,
  jsObjData,
  specifiedCommissions,
  top10,
  selectedCategories,
  categories,
}) => {
  return (
    <div>
      Sales: {basicStats.getSalesVolume(jsObjData)}
      Returns: {basicStats.getTotalReturns(jsObjData)}
    </div>
  );
};

export default Home;
