import React from "react"
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

const ProductDetail = () => {
  const classes = useStyles()

  return (
    <section className={classes.section}>
      <h1 className={classes.headerText}>Product Details</h1>
    </section>
  )
}

export default ProductDetail