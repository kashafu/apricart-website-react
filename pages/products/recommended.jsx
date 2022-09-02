import { useState, useEffect } from "react"
import axios from "axios"
import HeadTag from "../../components/Layout/components/Head/HeadTag"
import Categories from "../../components/Layout/components/Categories/Categories"
import SingleProduct from "../../components/Layout/components/Products/SingleProduct"
import PageHeading from '../../components/Layout/components/Typography/PageHeading'
import { getGeneralApiParams } from "../../helpers/ApiHelpers"
import { base_url_api } from "../../information.json"
import { useRecommendedProductsApi } from "../../helpers/Api"

export default function Recommended() {
	const { isLoading, errorMessage, recommendedProducts, response } = useRecommendedProductsApi()

	const RecommendedProducts = () => {
		if (isLoading) {
			return (
				<div></div>
			)
		}

		if (!recommendedProducts) {
			return (
				<div>
					<p>{errorMessage}</p>
				</div>
			)
		}

		if (recommendedProducts.length == 0) {
			return (
				<div>
					<p>No Items</p>
				</div>
			)
		}

		return (
			<section className="grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-5 gap-4">
				{recommendedProducts.map((product) => {
					let { id } = product
					return (
						<div key={id}>
							<SingleProduct product={product} />
						</div>
					)
				})}
			</section>
		)

	}


	return (
		<div>
			<HeadTag title={"Recommended Products"} />
			<div className="grid grid-cols-5 gap-8">
				{/* CATEGORIES SECTION */}
				<section className="hidden lg:col-span-1 lg:block">
					<Categories />
				</section>
				{/* PRODUCTS SECTION */}
				<section className="col-span-5 lg:col-span-4 space-y-12">
					<PageHeading
						text='RECOMMENDED PRODUCTS'
					/>
					<RecommendedProducts />
				</section>
			</div>
		</div>
	)
}
