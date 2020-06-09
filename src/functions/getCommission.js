const getCommission = (category, specifiedCommissions) => {
  //returns commission as decimal e.g. 1% == 0.01
  const defaultCommissionList = [
    { category: "Amazon Fashion Private Brands", commission: 0.04 },
    { category: "Amazon Fresh Products", commission: 0.01 },
    { category: "Amazon Gift Cards", commission: 0.0 },
    { category: "Amazon Pantry", commission: 0.01 },
    { category: "Arts, Crafts & Sewing", commission: 0.04 },
    { category: "Amazon Pantry", commission: 0.01 },
    { category: "Audible Audiobooks", commission: 0.04 },
    { category: "Automotive", commission: 0.045 },
    { category: "Baby & Nursery", commission: 0.03 },
    { category: "Beauty & Grooming", commission: 0.03 },
    { category: "Blu-Ray & DVD", commission: 0.025 },
    { category: "Books & Textbooks", commission: 0.045 },
    { category: "Business & Industrial Supplies", commission: 0.03 },
    { category: "Camera, Photo & Video", commission: 0.04 },
    { category: "CDs & Vinyl", commission: 0.05 },
    { category: "Cell Phones & Accessories", commission: 0.04 },
    { category: "Clothing & Accessories", commission: 0.04 },
    { category: "Computers, Tablets & Components", commission: 0.025 },
    { category: "Digital Music", commission: 0.045 },
    { category: "Echo & Alexa Accessories", commission: 0.04 },
    { category: "Echo Devices", commission: 0.04 },
    { category: "Electronic Components & Home Audio", commission: 0.04 },
    { category: "Element Smart TV", commission: 0.04 },
    { category: "Fire Tablets", commission: 0.04 },
    { category: "Fire Tablets Accessories", commission: 0.04 },
    { category: "Fire TV Accessories", commission: 0.04 },
    { category: "Fire TV Devices", commission: 0.04 },
    { category: "Furniture", commission: 0.04 },
    { category: "Grocery & Gourmet Food", commission: 0.01 },
    { category: "Handmade", commission: 0.05 },
    { category: "Health & Household", commission: 0.01 },
    { category: "Health &amp; Personal Care Appliances", commission: 0.01 },
    { category: "Home", commission: 0.03 },
    { category: "Home Entertainment", commission: 0.04 },
    { category: "Home Improvement", commission: 0.03 },
    { category: "Jewelry", commission: 0.04 },
    { category: "Kindle Books", commission: 0.04 },
    { category: "Kindle E-readers", commission: 0.04 },
    { category: "Kindle E-readers Accessories", commission: 0.04 },
    { category: "Kitchen & Dining", commission: 0.045 },
    { category: "Luggage", commission: 0.04 },
    { category: "Miscellaneous", commission: 0.04 },
    { category: "Mobile Electronics", commission: 0.04 },
    { category: "Musical Instruments", commission: 0.03 },
    { category: "Office & School Supplies", commission: 0.04 },
    { category: "Other", commission: 0.04 },
    { category: "Other Gift Card Brands", commission: 0.0 },
    { category: "Outdoor Recreation", commission: 0.03 },
    { category: "Patio, Lawn & Garden", commission: 0.03 },
    { category: "Pet Food & Supplies", commission: 0.03 },
    { category: "Power & Hand Tools", commission: 0.03 },
    { category: "Premium Beauty", commission: 0.1 },
    { category: "Prime Exclusive Phones", commission: 0.04 },
    { category: "Ring Alarms and Smart Lighting", commission: 0.04 },
    { category: "Shoes, Handbags, Wallets, Sunglasses", commission: 0.03 },
    { category: "Software Download", commission: 0.04 },
    { category: "Sports & Fitness", commission: 0.03 },
    { category: "Toys & Games", commission: 0.03 },
    { category: "VHS", commission: 0.04 },
    { category: "Video Game Downloads", commission: 0.02 },
    { category: "Video Games", commission: 0.01 },
    { category: "Video On Demand: Rent or Buy", commission: 0.05 },
    { category: "Watches", commission: 0.04 },
    { category: "Wine, Spirits & Beer", commission: 0.0 },
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
