import getUniqueValues from "./getUniqueValues";

describe("Get Unique Values", () => {
  test("Correct results", () => {
    const testData = [
      { category: "asdf" },
      { category: "qwert" },
      { category: "qwert" },
      { category: "333" },
    ];
    const expected = ["asdf", "qwert", "333"];

    expect(getUniqueValues(testData, "category")).toEqual(expected);
  });
});
