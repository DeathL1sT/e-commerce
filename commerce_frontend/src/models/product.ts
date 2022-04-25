export default interface Product {
  id: number;
  title: string;
  discreption: string;
  imgUrl: string;
  price: number;
  categorie_id: string;
  inventory_id: string;
  discount_id?: string;
}
