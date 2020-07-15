import React from "react"

const Product = ({pageContext}) => (
	<div>
		<h1>{pageContext.title}</h1>
		<img src={pageContext.image} alt={pageContext.title} />
		<p>{pageContext.price}</p>
		<div dangerouslySetInnerHTML={{__html: pageContext.description}}/>
	</div>
)

export default Product