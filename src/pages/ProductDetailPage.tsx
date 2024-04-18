import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../Helpers/interfaces";
import { getProduct } from "../api/ProductsApi";

export default function ProductDetailPage() : JSX.Element {
	const params = useParams();
	const [productInfo, setProductInfo] = useState<Product>()

	useEffect(() => {
		if (params.id) {
			getProduct(params.id).then(response => {
				setProductInfo(response.product);
			});
		}
	}, [params]);

	return <div>
		<h1>Product Details</h1>
		<label>Name: </label>{productInfo?.name}
		<br/>
		<label>Discription: </label>{productInfo?.description}
		<br/>
		<label>Price: </label>{productInfo?.price}
	</div>
}
