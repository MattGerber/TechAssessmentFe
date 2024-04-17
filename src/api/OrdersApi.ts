import api from "../api";

export const getOrders = () => {
  const response = api
    .get("api/order/")
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

export const createOrder = (
	paid: boolean,
	products: number[] | undefined,
	total: number
) => {
  return api
    .post("api/order/", { paid, products, total })
    .then((res) => {
      if (res.status == 201) alert("sucesss");
      else alert("failed!");
    })
    .catch((err) => alert(err));
};
