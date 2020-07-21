exports.createPages = async ({ actions: { createPage }, graphql }) => {
  // page with no data
  createPage({
    path: "/no-data/",
    component: require.resolve("./src/templates/no-data.js"),
  })

  // page with hard coded context data
  createPage({
    path: "/page-with-context/",
    component: require.resolve("./src/templates/with-context.js"),
    context: {
      title: "This is the context title",
      content:
        "<p>This is the context content</p><p>This is coming from the gatsby node file and formatted as html.</p>",
    },
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
        price: product.price,
      },
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

  var axios = require("axios")
  const plps = ["shirts", "pants", "ties", "clothing", "whats-new", "bow-ties"]

  // configuration for token api call
  var tokenConfig = {
    method: "get",
    url: "https://web-dev.thetiebar.com/api/token",
    headers: {
      "x-client-id": "7c1f4a77f8f7443bb0d0af8fca9f27f8",
      Cookie:
        "moov_bucket=79; .ASPXANONYMOUS=kgDGsKVYEQQM6ymrXI8HRZdnKM4yxvf1Ot2QduvA_Vc6_ddKa64eYgXH50EbBxOLtuReFsCmIBfeezONm6Pp4WCZx9e7yB1qWa5d6IknLxUEP0xA9H3xWE_OMx0RimQNVXfOZA2; moov_=3b370d15-6234-4ebe-bfcd-05ab980e4040",
    },
  }

  // token api call
  var token = await axios(tokenConfig)
    .then(function (response) {
      //console.log(JSON.stringify(response.data));
      return response.data
    })
    .catch(function (error) {
      console.log(error)
    })

  // PLP pages with Rest API data
  const productLandPages = new Promise((resolve, reject) => {
    axios.all(plps.map(plp => getPLPEndPoint(plp)))
    .then(axios.spread(function (...res) {
      // all requests are now complete
      Promise.all(res.map(async(response, i) => {
        createPage({
          path: `/${plps[i]}/`,
          component: require.resolve("./src/templates/product-listing.js"),
          context: {
            data: response.data,
          },
        })
      })).then(resolve)

    }));
  })

  await Promise.all([productLandPages])

  function getPLPEndPoint(plp) {
    let testConfig = {
      method: "get",
      url: `https://web-dev.thetiebar.com/api/products/${plp}`,
      headers: {
        "x-client-id": "7c1f4a77f8f7443bb0d0af8fca9f27f8",
        "x-Access-Token": token,
        Cookie:
          "moov_bucket=79; .ASPXANONYMOUS=kgDGsKVYEQQM6ymrXI8HRZdnKM4yxvf1Ot2QduvA_Vc6_ddKa64eYgXH50EbBxOLtuReFsCmIBfeezONm6Pp4WCZx9e7yB1qWa5d6IknLxUEP0xA9H3xWE_OMx0RimQNVXfOZA2; moov_=3b370d15-6234-4ebe-bfcd-05ab980e4040",
      },
    }

    return axios(testConfig)
  }

}
