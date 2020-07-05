// import jsonToObj from "./jsonToObj";
import incomeByTag from "./incomeByTag";
import incomeByTagAndDay from "./incomeByTagAndDay";
import incomeByCategory from "./incomeByCategory";
import incomeByDevice from "./incomeByDevice";
import getCommission from "./getCommission";
import exampleJsonObj from "../resources/exampleJsonObj";
import xlsxImporter from "./xlsxImporter";

describe("getCommission", () => {
  test("Returns correct default value", () => {
    expect(getCommission("Computers, Tablets & Components", [])).toBe(0.025);
  });
  test("returns default if no value found", () => {
    expect(getCommission("asdfasdf", [])).toBe(0.04);
  });
  test("Returns specified Commission if present", () => {
    expect(
      getCommission("asdfasdf", [{ category: "asdfasdf", commission: 0.07 }])
    ).toBe(0.07);
    expect(
      getCommission("Computers, Tablets & Components", [
        { category: "Computers, Tablets & Components", commission: 0.07 },
      ])
    ).toBe(0.07);
  });
  test.skip("Returns Error if specified commission unrecognised", () => {
    expect(
      getCommission("Computers, Tablets & Components", [
        { category: "Computers, Tablets & Component", commission: 0.07 },
      ])
    ).toEqual(
      Error("Specified Commission unknown: Computers, Tablets & Component")
    );
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
        income: 1.1247,
        phoneIncome: 0.13,
        desktopIncome: 0.999,
        tabletIncome: 0,
      },
    ];
    const testIncome = incomeByTag(exampleJsonObj, [], false);
    for (let i in exampleResponse) {
      let j = testIncome.findIndex((e) => e.tag === exampleResponse[i].tag);
      // console.log(j);
      //console.log(testIncome[i]);
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
    const testIncome = incomeByCategory(exampleJsonObj, [], false, [
      "Computers, Tablets & Components",
      "Cell Phones & Accessories",
      "Books & Textbooks",
    ]);
    for (let i in exampleResponse) {
      let j = testIncome.findIndex(
        (e) => e.category === exampleResponse[i].category
      );
      // console.log(j);
      //console.log(testIncome[i]);
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

describe("incomeByDevice", () => {
  test("returns sales totals and income for each Category", () => {
    const exampleResponse = [
      {
        deviceTypeGroup: "DESKTOP",
        sales: 39.99,
        income: 1,
      },
      {
        deviceTypeGroup: "PHONE",
        sales: 21.99,
        income: 0.85,
      },
    ];
    const testIncome = incomeByDevice(exampleJsonObj, [], false);
    for (let i in exampleResponse) {
      let j = testIncome.findIndex(
        (e) => e.deviceTypeGroup === exampleResponse[i].deviceTypeGroup
      );
      expect(testIncome[j].income).toBeCloseTo(exampleResponse[i].income);
    }
  });
});

describe("xlsxImporter", () => {
  test.skip("imports xlsx", () => {
    const event = jest.fn();
    event.target = jest.fn();
    event.target.files = [];
    event.target.files[0] = {
      name: "exampleUSASales.xlsx",
      size: 337086,
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      webkitRelativePath: "",
    };
    expect(xlsxImporter(event)).toBe(Promise);
  });
});

describe("incomeByTagAndDay", () => {
  test("returns income for each tag by day", () => {
    const exampleResponse = [
      {
        id: "choice-fitbit-20",
        data: [
          {
            x: "2020-02-29",
            y: 0.45,
          },
        ],
      },
      {
        id: "forerunner2cents-20",
        data: [
          {
            x: "2020-02-29",
            y: 0.28,
          },
        ],
      },
      {
        id: "tablet2cents-20",
        data: [
          {
            x: "2020-02-29",
            y: 1.1247,
          },
        ],
      },
    ];
    const testIncome = incomeByTagAndDay(exampleJsonObj, [], false);
    for (let i in exampleResponse) {
      let j = testIncome.findIndex((e) => e.id === exampleResponse[i].id);
      // console.log(j);
      //console.log(testIncome[i]);
      for (let k in exampleResponse[i].data) {
        let l = testIncome[j].data.findIndex(
          (e) => e.x === exampleResponse[i].data[k].x
        );
        // console.log(exampleResponse[i].data[k].y, testIncome[j].data[l].y);
        expect(testIncome[j].data[l].y).toBeCloseTo(
          exampleResponse[i].data[k].y
        );
      }
    }
  });
});
