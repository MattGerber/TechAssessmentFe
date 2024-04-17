import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { createProduct, deleteProducts, getProducts } from "../api/ProductsApi";
import { orderColumns, productColumns } from "../constants";
import { createOrder, getOrders } from "../api/OrdersApi";
import { Order, Product } from "../Helpers/interfaces";
interface SelectedRows {
  allSelected: boolean;
  selectedCount: number;
  selectedRows: Product[];
}

export default function Dashboard(): JSX.Element {
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [OrdersList, setOrdersList] = useState<Order[]>([]);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [selectedProducts, setSelectedProducts] = useState<number[]>();

  useEffect(() => {
    getProducts().then((data) => {
      setProductsList(data);
    });
    getOrders().then((data) => {
      setOrdersList(data);
    });
  }, []);

  const handleSelect = (selected: SelectedRows) => {
    if (selected.selectedRows) {
      const productIds = selected.selectedRows.map((product) => {
        return product.id;
      });
      setSelectedProducts(productIds);
    }
  };

  const onCreate = (e: React.SyntheticEvent) => {
    e.preventDefault();
    createProduct(name, description, price).then();
    getProducts();
  };

  const onDelete = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (selectedProducts?.length) deleteProducts(selectedProducts);
    else alert("No products Selected");
  };

  const onCreateOrder = (e: React.SyntheticEvent) => {
    e.preventDefault();
    let total: number = 0;
    if (selectedProducts) {
      selectedProducts.map((x) => {
        console.log(productsList.find((product) => product.id === x)?.price);
        const product =
          (productsList.find((product) => product.id == x)?.price as number) ??
          0;
        total = +total + +product;
        //WTF Typescript
      });
    }
    if (selectedProducts?.length) createOrder(false, selectedProducts, total);
    else alert("No products Selected");
  };

  return (
    <div>
      <div>
        <h2>Products</h2>
        <DataTable
          columns={productColumns}
          data={productsList}
          pagination
          selectableRows
          onSelectedRowsChange={handleSelect}
        />
        <button onClick={onDelete}>DELETE SELECTED</button>
        <button onClick={onCreateOrder}>ORDER SELECTED</button>
      </div>
      <br />
      <div>
        <h2>Orders</h2>
        <DataTable columns={orderColumns} data={OrdersList} pagination />
      </div>
      <br />
      <h2>Create Product</h2>
      <form onSubmit={onCreate}>
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
