// --- Product & Nested Object Types ---

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface ProductDetails {
  subcategory: Subcategory[];
  _id: string;
  title: string;
  slug: string;
  quantity: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  id: string;
}

export interface CartItem {
  count: number;
  _id: string;
  product: ProductDetails;
  price: number;
}

export interface CartData {
  _id?: string;
  cartOwner?: string;
  products: CartItem[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  totalCartPrice: number;
}

// --- Main API Responses ---
export interface CartSuccessResponse {
  status: "success";
  message: string;
  numOfCartItems: number;
  cartId: string;
  data: CartData;
}

export interface ApiErrorResponse {
  status: "fail" | "error";
  message: string;
}

export type CartApiResponse = CartSuccessResponse | ApiErrorResponse;
