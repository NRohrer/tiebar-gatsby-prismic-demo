import React from "react"
import ProductItem from "./productItem"
import { Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(() => ({
  headerText: {
    textTransform: "capitalize",
  },
  section: {
    maxWidth: 1180,
    margin: "0 auto",
  },
}))

const ProductListing = ({ pageContext }) => {
  const classes = useStyles()
  const products = pageContext.data.result.products
  const metadata = pageContext.data.metadata
  return (
    <section className={classes.section}>
      <h1 className={classes.headerText}>{metadata.header}</h1>
      <h4>{metadata.subHeader}</h4>
      <Grid container spacing={3}>
        {products.map((product, i) => {
          return (
            <Grid key={i} item xs={4}>
              <ProductItem product={product} />
            </Grid>
          )
        })}
      </Grid>

      {metadata && metadata.footerTitle && <h2>{metadata.footerTitle}</h2>}
      {metadata && metadata.footerDescription && (
        <div dangerouslySetInnerHTML={{ __html: metadata.footerDescription }} />
      )}
    </section>
  )
}

export default ProductListing
