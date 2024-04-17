export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

export interface Order {
  id: string;
  paid: boolean;
  customerId: string;
  products: string[];
  total: number;
}
