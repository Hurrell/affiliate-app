const getUniqueValues = (listOfObjects, objectKey) => {
  // Returns a list of the unique values contained in a list of objects, igven a specific object key.

  let uniqueCategories = [];

  for (let item of listOfObjects) {
    if (uniqueCategories.includes(item[objectKey])) continue;
    uniqueCategories.push(item[objectKey]);
  }

  return uniqueCategories;
};

export default getUniqueValues;
