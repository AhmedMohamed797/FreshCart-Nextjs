export type ShippingAddress = {
  details: string;
  phone: string;
  city: string;
  postalCode?: string;
};

export type PaymentMethodType = "cash" | "card";

export type CheckoutFormValues = {
  details: string;
  phone: string;
  city: string;
  postalCode?: string;
  paymentMethod: PaymentMethodType;
};

export type OrderItemProduct = {
  _id: string;
  id: string;
  title: string;
  imageCover: string;
  ratingsAverage?: number;
  ratingsQuantity?: number;
  category?: {
    _id: string;
    name: string;
    slug?: string;
    image?: string;
  };
  brand?: {
    _id: string;
    name: string;
    slug?: string;
    image?: string;
  };
  subcategory?: Array<{
    _id: string;
    name: string;
    slug?: string;
    category?: string;
  }>;
};

export type OrderCartItem = {
  count: number;
  _id: string;
  price: number;
  product: OrderItemProduct;
};

export type OrderUser = {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  phone?: string;
};

export type OrderPricing = {
  cartPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
};

export type UserOrder = {
  _id: string;
  id: number;
  shippingAddress: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: "cash" | "card" | string;
  isPaid: boolean;
  isDelivered: boolean;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
  user: OrderUser;
  cartItems: OrderCartItem[];
  __v?: number;
};

export type CashOrderResponse = {
  status: "success" | "fail" | "error";
  message?: string;
  user?: OrderUser;
  pricing?: OrderPricing;
  data?: UserOrder;
};

export type OnlinePaymentResponse = {
  status: "success" | "fail" | "error";
  message?: string;
  session?: {
    url: string;
    success_url: string;
    cancel_url: string;
  };
};

export type GetOrdersResponse = {
  status: "success" | "fail" | "error";
  message?: string;
  data?: UserOrder[];
};
