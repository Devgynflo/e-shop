export type CardProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectImg: SelectedImgType;
  quantity: number;
  price: number;
};

export type SelectedImgType = {
  color: string;
  colorCode: string;
  image: string;
};
