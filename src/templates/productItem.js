import React from "react"
import { Link } from "gatsby"

const ProductItem = ({product}) => {
	return(
		<div>
			<Link to={`${product.masterUrl}`}>
				<img src={`${product.productImage}?h=310`} alt={product.title} />
			</Link>
			<h5>{product.title}</h5>
			<p>{product.priceInfo}</p>
		</div>
	)
}

export default ProductItem