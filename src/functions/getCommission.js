const getCommission = (category, specifiedCommissions) => {
  //returns commission as decimal e.g. 1% == 0.01
  const defaultCommissionList = [
    { category: "Amazon Fashion Private Brands", commission: 0.04 },
    { category: "Amazon Pantry", commission: 0.03 },
    { category: "Beauty & Grooming", commission: 0.03 },
    { category: "Business & Industrial Supplies", commission: 0.03 },
    //{ category: "Cell Phones & Accessories", commission: 0.4 },
    { category: "Echo & Alexa Accessories", commission: 0.04 },
    { category: "Fire Tablets", commission: 0.04 },
    { category: "Fire TV Devices", commission: 0.04 },
    { category: "Health & Household", commission: 0.01 },
    { category: "Home Entertainment", commission: 0.03 },
    // { category: "Kindle Books", commission: 0.04 },
    { category: "Luggage", commission: 0.04 },
    { category: "Musical Instruments", commission: 0.03 },
    { category: "Other Gift Card Brands", commission: 0.0 },
    { category: "Pet Food & Supplies", commission: 0.03 },
    { category: "Ring Alarms and Smart Lighting", commission: 0.04 },
    // { category: "Software Download", commission: 0.04 },
    { category: "Video Games", commission: 0.01 },
    { category: "Amazon Fresh Products", commission: 0.01 },
    { category: "Automotive", commission: 0.045 },
    { category: "Blu-Ray & DVD", commission: 0.025 },
    // { category: "Camera, Photo & Video", commission: 0.04 },

    { category: "Electronic Components & Home Audio", commission: 0.025 },
    { category: "Home", commission: 0.03 },
    { category: "Furniture", commission: 0.03 },
    { category: "Computers, Tablets & Components", commission: 0.025 },
    { category: "Sports & Fitness", commission: 0.03 },
    { category: "Books & Textbooks", commission: 0.045 },
  ];
  //return specifiedCommission if it exists
  if (specifiedCommissions.length) {
    // console.log(
    //   "specifiedCommissions at getCommission: ",
    //   specifiedCommissions
    // );

    const specCommissionIndex = specifiedCommissions.findIndex(
      (e) => category === e.category
    );
    if (specCommissionIndex !== -1) {
      // console.log("helloo");
      return Number(specifiedCommissions[specCommissionIndex].commission);
    }
  }
  //otherwise take from defaults
  const commissionIndex = defaultCommissionList.findIndex(
    (e) => category === e.category
  );
  //return false if no value avail
  if (commissionIndex === -1) {
    return 0.04;
  } else {
    // return computed value
    const commission = defaultCommissionList[commissionIndex].commission;
    return Number(commission);
  }
};

export default getCommission;
