import { TableColumn } from 'react-data-table-component';

export const ACCESS_TOKEN = "access";
export const REFRESH_TOKEN = "refresh";

interface Product {
	id: number
	name: string;
	description: string;
	price: number;
  }
interface Order {
	id: string,
	paid: boolean,
	customerId: string,
	products: string[] 
	total: number
  }

export const orderColumns: TableColumn<Order>[] = [
  {
    name: "id",
    selector: (row) => row.id,
  },
  {
    name: "Paid",
    selector: (row) => row.paid ? "true" : "false",
  },
  {
    name: "Customer",
    selector: (row) => row.customerId,
  },
  {
    name: "Products",
    selector: (row) => row.products.toString(),
  },
  {
    name: "Total",
    selector: (row) => row.total,
  },
];
export const productColumns: TableColumn<Product>[] = [
  {
    name: "id",
    selector: (row) => row.id,
  },
  {
    name: "Name",
    selector: (row) => row.name,
  },
  {
    name: "description",
    selector: (row) => row.description,
  },
  {
    name: "price",
    selector: (row) => row.price,
  },
];
