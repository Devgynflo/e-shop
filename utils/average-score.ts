export const getAverageScore = (reviews: []) => {
  return (
    reviews.reduce((acc: number, item: any) => {
      return acc + item.rating;
    }, 0) / reviews.length
  );
};
