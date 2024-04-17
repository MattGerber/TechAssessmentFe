import api from "../api";

export const getProducts = () => {
  const response = api
    .get("api/product/")
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      return data;
    })
    .catch((e) => {
      alert(e);
    });
	return response;
};

export const getProduct = (id: string) => {
  const response = api
    .get(`api/product/${id}`)
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      return data;
    })
    .catch((e) => {
      alert(e);
    });
	return response;
};

export const createProduct = (name: string, description: string, price: number) => {
  return api
    .post("api/product/", { name, description, price })
    .then((res) => {
      if (res.status == 201) alert("sucesss");
      else alert("failed!");
    })
    .catch((err) => alert(err));
};

export const deleteProducts = (selectedProducts: number[] | undefined) => {
  api
    .delete("api/remove-products/", { data: selectedProducts })
    .then((res) => {
      if (res.status == 204) alert("Deleted!");
      else alert("ERROR");
    })
    .catch((error) => alert(error));
};
