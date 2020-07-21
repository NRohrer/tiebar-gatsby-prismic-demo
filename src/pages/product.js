import React from "react"

class ProductDetail extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			data: null,
		};

	}

	componentDidMount(){
		var pathName = this.props.location.pathname
		var axios = require("axios")

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
		axios(tokenConfig)
			.then(function (response) {
				let productConfig = {
					method: "get",
					url: `https://web-dev.thetiebar.com/api${pathName}`,
					headers: {
						"x-client-id": "7c1f4a77f8f7443bb0d0af8fca9f27f8",
						"x-Access-Token": response.data,
						Cookie:
							"moov_bucket=79; .ASPXANONYMOUS=kgDGsKVYEQQM6ymrXI8HRZdnKM4yxvf1Ot2QduvA_Vc6_ddKa64eYgXH50EbBxOLtuReFsCmIBfeezONm6Pp4WCZx9e7yB1qWa5d6IknLxUEP0xA9H3xWE_OMx0RimQNVXfOZA2; moov_=3b370d15-6234-4ebe-bfcd-05ab980e4040",
					},
				}

				axios(productConfig)
					.then(function (response) {
						console.log("Success")
						console.log(response)
						let data = response.data
						this.setState({data: data})
					}.bind(this))
					.catch(function (error) {
						console.log(error)
					})


			}.bind(this))
			.catch(function (error) {
				console.log(error)
			})
	}

	render() {
		if (!this.state.data) {
			return null
		}

		const result = this.state.data.result

		return (
			<section style={{maxWidth: '1180px', margin: '0 auto'}}>
				<h1>{result.product.details.title}</h1>
				<img src={`${result.product.details.primaryImage}?h=500`} alt={result.product.details.title} />
				<h4>{result.product.details.priceInfo}</h4>
			</section>
		)
	}
}

export default ProductDetail;