// import jsonToObj from "./jsonToObj";
import incomeByTag from "./incomeByTag";
import getCommission from "./getCommission";
import exampleJsonObj from "../resources/exampleJsonObj";
import xlsxImporter from "./xlsxImporter";

describe("getCommission", () => {
  test("Returns correct default value", () => {
    expect(getCommission("Computers, Tablets & Components")).toBe(0.025);
  });
  test("returns false if no value found", () => {
    expect(getCommission("asdfasdf")).toBe(0.04);
  });
});

describe("incomeByTag", () => {
  test("returns sales totals and income for each tag", () => {
    const exampleResponse = [
      {
        tag: "choice-fitbit-20",
        sales: 10,
        income: 0.45,
        phoneIncome: 0.45,
        desktopIncome: 0,
        tabletIncome: 0,
      },
      {
        tag: "forerunner2cents-20",
        sales: 6.99,
        income: 0.28,
        phoneIncome: 0.28,
        desktopIncome: 0,
        tabletIncome: 0,
      },
      {
        tag: "tablet2cents-20",
        sales: 44.99,
        income: 1.12,
        phoneIncome: 0.13,
        desktopIncome: 1,
        tabletIncome: 0,
      },
    ];
    const testIncome = incomeByTag(exampleJsonObj);
    for (let i in exampleResponse) {
      //console.log(testIncome[i]);
      expect(testIncome[i].income).toBeCloseTo(exampleResponse[i].income);
      expect(testIncome[i].phoneIncome).toBeCloseTo(
        exampleResponse[i].phoneIncome
      );
      expect(testIncome[i].desktopIncome).toBeCloseTo(
        exampleResponse[i].desktopIncome
      );
      expect(testIncome[i].tabletIncome).toBeCloseTo(
        exampleResponse[i].tabletIncome
      );
    }
  });
});

describe("xlsxImporter", () => {
  test("imports xlsx", () => {
    expect(xlsxImporter("../resources/exampleUSASales.xlsx")).toBe(true);
  });
});
