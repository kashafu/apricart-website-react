import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import { base_url_api } from "../../../information.json"
import { getGeneralApiParams } from "../../../helpers/ApiHelpers"
import Categories from "../../../components/Layout/components/Categories/Categories"
import SingleProduct from "../../../components/Layout/components/Products/SingleProduct"
import PageHeading from "../../../components/Layout/components/Typography/PageHeading"
import Image from "next/image"
import Link from "next/link"
import HeadTag from "../../../components/Layout/components/Head/HeadTag"
import toKebabCase from "../../../helpers/toKebabCase"

export default function CategoryProducts() {
	const router = useRouter()
	const { id, categoryName } = router.query

	const [products, setProducts] = useState(null)
	const [subCategories, setSubCategories] = useState(null)
	const [categories, setCategories] = useState(null)
	const [errorMessage, setErrorMessage] = useState("")

	useEffect(() => {
		if (router.isReady) {
			getCategoryProducts()
			getSubCategories()
		}
		getCategoriesApi()
	}, [router.query])

	const getCategoriesApi = async () => {
		let { city, headers, userId } = getGeneralApiParams()
		let url =
			base_url_api +
			"/catalog/categories?level=all&client_type=apricart&city=" +
			city +
			"&userid=" +
			userId

		try {
			let response = await axios.get(url, {
				headers: headers,
			})
			setCategories(response.data.data)
		} catch (error) {
			console.log(error)
		}
	}

	const getCategoryProducts = async () => {
		let { headers, city } = getGeneralApiParams()
		let url =
			base_url_api +
			"/catalog/categories/products?category=" +
			id +
			"&page=1&size=100&sortType=&sortDirection=desc&instant=3&city=" +
			city +
			"&lang=en&client_type=apricart"

		try {
			let response = await axios.get(url, {
				headers: headers,
			})

			setProducts(response.data)
			setErrorMessage("")
		} catch (err) {
			console.log(err)
			setErrorMessage(err?.response?.data?.message)
		}
	}

	const getSubCategories = async () => {
		let { headers, userId } = getGeneralApiParams()
		let url =
			base_url_api +
			"/catalog/categories/detail?id=" +
			id +
			"&lang=en&client_type=apricart&userid=" + userId
			
		try {
			let response = await axios.get(url, {
				headers: headers,
			})

			setSubCategories(response.data) 
			setErrorMessage("")
		} catch (err) {
			console.log(err)
			setErrorMessage(err?.response?.data?.message)
		}
	}

	if(!products){
		return(
			<div>
				<p>
					Loading
				</p>
			</div>
		)
	}

	if (products.status != 1) {
		return (
			<div>
				<p>{products.message}</p>
			</div>
		)
	}

	return (
		<div>
			<HeadTag title={"Category"} />
			<div className="grid grid-cols-5 gap-8">
				{/* CATEGORIES SECTION */}
				<section className="hidden lg:col-span-1 lg:block">
					{categories && <Categories categories={categories} />}
				</section>
				{/* PRODUCTS SECTION */}
				<section className="col-span-5 lg:col-span-4">
					<PageHeading
						text={categoryName.toUpperCase()}
					/>
					<section className="space-y-12">
						{/* SUB CATEGORIES SECTION */}
						{subCategories && (
							<section>
								{subCategories.data.length > 0 && (
									<div className="grid grid-flow-col overflow-y-auto h-full w-full gap-4 py-8">
										{subCategories.data.map((category) => {
											let { id, name, image } = category
											return (
												<div
													key={id}
													className="border rounded-md shadow w-[150px]"
												>
													<Link
														href="/category/[categoryName]/[id]"
														as={
															"/category/" +
															toKebabCase(name) +
															"/" +
															id
														}
														passHref
													>
														<a className="flex flex-col h-full w-full items-center">
															<p className="font-lato text-center text-main-blue text-lg font-bold py-2">
																{name}
															</p>
															<Image
																src={image}
																height={100}
																width={100}
																alt={
																	"category image"
																}
															/>
														</a>
													</Link>
												</div>
											)
										})}
									</div>
								)}
							</section>
						)}
						{errorMessage == "" ? (
							<div>
								{products == null || products?.data?.length == 0 ? (
									<div>NO ITEMS EXIST</div>
								) : (
									<section className="grid grid-cols-2 md:grid-cols-4 gap-4">
										{products.data.map((product) => {
											let { id } = product
											return (
												<div key={id}>
													<SingleProduct
														product={product}
														// TODO call api to get updated details of product and check if it is in stock
													/>
												</div>
											)
										})}
									</section>
								)}
							</div>
						) : (
							<p>{errorMessage}</p>
						)}
					</section>
				</section>
			</div>
		</div>
	)
}
