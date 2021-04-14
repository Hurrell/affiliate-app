import getCommission from "./getCommission";
import incomeByTag from "./incomeByTag";
const incomeByTagAndDay = (data, specifiedCommissions) => {
  let tagTotals = [];

  if (!data["Fee-Orders"]) {
    throw Error("No Data");
  }
  //iterate through each data point
  for (let item of data["Fee-Orders"]) {
    let itemIndex = tagTotals.findIndex((e) => e.id === item.tag);
    let lineCost = Number(item.qty) * Number(item["price($)"]);
    let lineIncome = Number(
      getCommission(item.category, specifiedCommissions) * lineCost
    );
    let date = item.date.split(" ")[0];
    //add tag if unique
    if (itemIndex === -1) {
      tagTotals.push({
        id: item.tag,
        data: [{ x: date, y: lineIncome }],
      });
      itemIndex = tagTotals.findIndex((e) => e.tag === item.tag);
    } else {
      //find if date in tag
      //   console.log("date: ", date);
      let dateIndex = tagTotals[itemIndex].data.findIndex((e) => e.x === date);
      if (dateIndex === -1) {
        //if not add data
        tagTotals[itemIndex].data.push({ x: date, y: lineIncome });
      } else {
        // if date exists, update data
        // console.log(tagTotals[itemIndex].data[dateIndex].y, lineIncome);
        tagTotals[itemIndex].data[dateIndex].y += lineIncome;
      }
    }
  }
  //round all numbers to nearest cent and reverse order
  for (let tag of tagTotals) {
    for (let date of tag.data) {
      date.y = Number(date.y.toFixed(2));
    }
    tag.data.reverse();
  }

  return tagTotals;
};

export default incomeByTagAndDay;
