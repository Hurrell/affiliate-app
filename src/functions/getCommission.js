const getCommission = (tagName) => {
  //returns commission as decimal e.g. 1% == 0.01
  const defaultCommissionList = [
    { tag: "Computers, Tablets & Components", commission: 0.025 },
    { tag: "Cell Phones & Accessories", commission: 0.04 },
    { tag: "Books & Textbooks", commission: 0.045 },
  ];

  const commissionIndex = defaultCommissionList.findIndex(
    (e) => tagName === e.tag
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
