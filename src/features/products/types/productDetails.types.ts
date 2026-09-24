import { Product } from "./products.types";

export interface User {
  _id: string;
  name: string;
}

export interface Review {
  _id: string;
  review: string;
  rating: number;
  product: string;
  user: User;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ProductDetails extends Product {
  reviews: Review[];
}

export interface ProductDetailsApiResponse {
  data: ProductDetails;
}
