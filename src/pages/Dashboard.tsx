import { useState, useEffect } from "react";
import DataTable, { TableColumn } from 'react-data-table-component';
import api from "../api";

interface Product {
  name: string;
  description: string;
  price: number;
}

const columns: TableColumn<Product>[] = [
	{
		name: "Name",
		selector: row => row.name,
	},
	{
		name: "description",
		selector: row => row.description,
	},
	{
		name: "price",
		selector: row => row.price,
	},
]

export default function Dashboard(): JSX.Element {
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [newProduct, setNewProduct] = useState<Product>();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    api
      .get("api/product/")
      .then((res) => {
        return res.data;
      })
      .then((data) => {
		console.log(data);
        setProductsList(data);
      })
      .catch((e) => {
        alert(e);
      });
  };

  const createProduct = (e) => {
    e.preventDefault();
    api
      .post("api/product/", { name, description, price })
      .then((res) => {
        if (res.status == 201) alert("sucesss");
        else alert("failed!");
      })
      .catch((err) => alert(err));
    getProducts();
  };

  return (
    <div>
      <div>
        <h2>Products</h2>
		<DataTable columns={columns} data={productsList}></DataTable>
      </div>
		<br/>
      <h2>Create Product</h2>
      <form onSubmit={createProduct}>
        <label>Name: </label>
        <br />
        <input
          type="text"
          id="name"
          required
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
        />
		<br />
		<label>Description: </label>
        <br />
        <textarea
          id="description"
          name="description"
          required
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          value={description}
        />
		<br />
		<label>Price: </label>
        <br />
        <input
          type="text"
          id="price"
          required
          onChange={(e) => {
            setPrice(parseFloat(e.target.value));
          }}
          value={price.toString()}
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
