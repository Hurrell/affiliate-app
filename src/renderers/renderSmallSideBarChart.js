import { ResponsiveBar } from "@nivo/bar";

import React from "react";

const RenderSmallSideBarChart = (props) => {
  //Data: props.data
  //id: props.id
  //value: props.value
  //   const tooltipMod = (tooltip) => {
  //     let roundedTooltip = tooltip;
  //     roundedTooltip.value = Math.round(tooltip.value);
  //     return (<div>

  //     </div>)roundedTooltip;
  //   };

  let currencyFormat = {
    style: "currency",
    currency: props.country === "uk" ? "GBP" : "USD",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  };
  let currencyFormatDecimals = {
    style: "currency",
    currency: props.country === "uk" ? "GBP" : "USD",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  };
  let percentFormat = {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  };
  return (
    <ResponsiveBar
      data={props.data}
      keys={[props.keys]}
      indexBy={props.id}
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      layout="horizontal"
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "category10" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "fries",
          },
          id: "dots",
        },
        {
          match: {
            id: "sandwich",
          },
          id: "lines",
        },
      ]}
      borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        // legend: "country",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        // legend: "food",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor="black"
      theme={{
        fontSize: 25,
      }}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
      labelFormat={(value) => {
        return new Intl.NumberFormat("en-US", currencyFormat).format(value);
      }}
      //   tooltip={tooltipMod}
      isInteractive={false}
      enableGridY={false}
    />
  );
};

export default RenderSmallSideBarChart;

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
