exports.createPages = async ({ actions: {createPage }, graphql }) => {

	// page with no data
	createPage({
		path: "/no-data/",
		component: require.resolve("./src/templates/no-data.js")
	})

	// page with hard coded context data
	createPage({
		path: "/page-with-context/",
		component: require.resolve("./src/templates/with-context.js"),
		context: {
			title: "This is the context title",
			content: '<p>This is the context content</p><p>This is coming from the gatsby node file and formatted as html.</p>'
		}
	})

	// product pages with json context data
	const products = require("./data/products.json")
	products.forEach(product => {
		createPage({
			path: `/product/${product.slug}`,
			component: require.resolve("./src/templates/product.js"),
			context: {
				title: product.title,
				description: product.description,
				image: product.image,
				price: product.price
			}
		})
	})

	// product pages with graphql data
	const results = await graphql(`
    {
      allProductsJson {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)
  results.data.allProductsJson.edges.forEach(edge => {
    const product = edge.node
    createPage({
      path: `/gql/${product.slug}/`,
      component: require.resolve("./src/templates/product-graphql.js"),
      context: {
        slug: product.slug,
      },
    })
  })
}
