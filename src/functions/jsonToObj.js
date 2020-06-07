const jsonToObj = async (jsonFileName) => {
  const jsonFile = await fetch(jsonFileName);

  const jsonFileText = await jsonFile.text();

  const data = await JSON.parse(jsonFileText);

  return data;
};

export default jsonToObj;
