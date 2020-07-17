import React from "react"

const ProductItem = ({product}) => {
	return(
		<div>
			<img src={`${product.productImage}?h=310`} alt={product.title} />
			<h5>{product.title}</h5>
			<p>{product.priceInfo}</p>
		</div>
	)
}

export default ProductItem