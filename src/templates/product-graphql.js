import React from "react"
import { graphql } from "gatsby"

export const query = graphql`
  query($slug: String!) {
    productsJson(slug: { eq: $slug }) {
      title
      description
      price
      image
    }
  }
`
const Product = ({ data }) => {
  const product = data.productsJson
  return (
    <div>
      <h1>{product.title}</h1>
      <img
        src={product.image}
        alt={product.title}
        style={{ float: "left", marginRight: "1rem", width: 150 }}
      />
      <p>{product.price}</p>
      <div dangerouslySetInnerHTML={{ __html: product.description }} />
    </div>
  )
}
export default Product