export const enrichDiscounts = (discounts, packagesData, athletesData) => {
  if (!discounts || !packagesData || !athletesData) return [];
  return discounts.map((discount) => {
    const membershipData = packagesData.find(
      (membership) => membership._id === discount.product_id,
    );
    const athletesNewData = athletesData.filter((athleteObject) =>
      discount.athletes.some((athlete) => athlete === athleteObject._id),
    );
    return {
      ...discount,
      membership: membershipData,
      athletes: athletesNewData,
    };
  });
};
