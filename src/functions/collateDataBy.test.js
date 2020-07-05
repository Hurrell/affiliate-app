import collateDataBy from "./collateDataBy";
import exampleJsonObj from "../resources/exampleJsonObj";

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
        income: 1.1247,
        phoneIncome: 0.13,
        desktopIncome: 0.999,
        tabletIncome: 0,
      },
    ];
    const testIncome = collateDataBy(exampleJsonObj.data, "tag", []);
    for (let i in exampleResponse) {
      let j = testIncome.findIndex((e) => e.tag === exampleResponse[i].tag);
      // console.log(j);
      //   console.log(testIncome[i]);
      expect(testIncome[j].income).toBeCloseTo(exampleResponse[i].income);
      expect(testIncome[j].phoneIncome).toBeCloseTo(
        exampleResponse[i].phoneIncome
      );
      expect(testIncome[j].desktopIncome).toBeCloseTo(
        exampleResponse[i].desktopIncome
      );
      expect(testIncome[j].tabletIncome).toBeCloseTo(
        exampleResponse[i].tabletIncome
      );
    }
  });
});

describe("incomeByCategory", () => {
  test("returns sales totals and income for each Category", () => {
    const exampleResponse = [
      {
        category: "Books & Textbooks",
        sales: 10,
        income: 0.45,
        phoneIncome: 0.45,
        desktopIncome: 0,
        tabletIncome: 0,
      },
      {
        category: "Cell Phones & Accessories",
        sales: 6.99,
        income: 0.28,
        phoneIncome: 0.28,
        desktopIncome: 0,
        tabletIncome: 0,
      },
      {
        category: "Computers, Tablets & Components",
        sales: 44.99,
        income: 1.1247,
        phoneIncome: 0.13,
        desktopIncome: 0.999,
        tabletIncome: 0,
      },
    ];
    const testIncome = collateDataBy(exampleJsonObj.data, "category", []);
    for (let i in exampleResponse) {
      let j = testIncome.findIndex(
        (e) => e.category === exampleResponse[i].category
      );
      expect(testIncome[j].income).toBeCloseTo(exampleResponse[i].income);
      expect(testIncome[j].phoneIncome).toBeCloseTo(
        exampleResponse[i].phoneIncome
      );
      expect(testIncome[j].desktopIncome).toBeCloseTo(
        exampleResponse[i].desktopIncome
      );
      expect(testIncome[j].tabletIncome).toBeCloseTo(
        exampleResponse[i].tabletIncome
      );
    }
  });
});
