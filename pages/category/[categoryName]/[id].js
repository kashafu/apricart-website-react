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

export default function CategoryProducts({ products, subCategories }) {
	const router = useRouter()
	const { id } = router.query

	const [categories, setCategories] = useState(null)
	const [updatedProductsList, setUpdatedProductsList] = useState(null)
	const [errorMessage, setErrorMessage] = useState("")

	useEffect(() => {
		getCategoriesApi()
		getUpdatedProductsApi()
	}, [])

	const getCategoriesApi = async () => {
		let { city, headers, userId } = getGeneralApiParams()
		let url =
			base_url_api +
			"/catalog/categories?level=all&client_type=apricart&city=" +
			city + "&userid=" + userId 

		try {
			let response = await axios.get(url, {
				headers: headers,
			})
			setCategories(response.data.data)
		} catch (error) {
			console.log(error)
		}
	}

	const getUpdatedProductsApi = async () => {
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

			setUpdatedProductsList(response.data)
			setErrorMessage("")
		} catch (err) {
			console.log(err)
			setErrorMessage(err?.response?.data?.message)
		}
	}

	if (router.isFallback) {
		return (
			<div>
				<h2>Loading Page Data...</h2>
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
				<section className="col-span-5 lg:col-span-4 space-y-12">
					{/* SUB CATEGORIES SECTION */}
					{subCategories && (
						<section>
							{subCategories.data.length > 0 && (
								<div className="grid grid-flow-col overflow-y-auto h-full w-full gap-4 py-8">
									{subCategories.data.map((category) => {
										let { id, name, image } = category
										return (
											<div key={id} className='border rounded-md shadow w-[150px]'>
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
															alt={"category image"}
														/>
													</a>
													{/* <a className="grid grid-rows-2 w-full items-center">
														<p className="font-lato text-main-blue text-center text-lg font-bold flex flex-1">
															{name}
														</p>
														<div className="mt-">
															<Image
																src={image}
																height={100}
																width={100}
																alt={"category image"}
															/>
														</div>
													</a> */}
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
			</div>
		</div>
	)
}

export async function getStaticPaths() {
	let { headers } = getGeneralApiParams()
	let url = base_url_api + "/catalog/categories?level=all"
	let paths = []

	try {
		let response = await axios.get(url, {
			headers: headers,
		})

		paths = response.data.data.map((categoryId) => {
			categoryId.map((childId) => {
				{
					params: {
						id: childId.id
					}
				}
			})
			{
				params: {
					id: categoryId.id
				}
			}
		})
	} catch (error) {
		console.log(error.response)
	}

	// const paths = ["/category/[id]", "/category/[id]"];
	return { paths, fallback: "blocking" }
}

export async function getStaticProps({ query, params }) {
	const { id, categoryName } = query || params
	let { headers } = getGeneralApiParams()
	let city = "karachi"
	let url =
		base_url_api +
		"/catalog/categories/products?category=" +
		id +
		"&page=1&size=100&sortType=&sortDirection=desc&instant=3&city=" +
		city +
		"&lang=en&client_type=apricart&userid=abc123"
	let products = null

	try {
		let response = await axios.get(url, {
			headers: headers,
		})

		products = response.data
	} catch (err) {
		console.log(err)
	}

	let subCategoriesUrl =
		base_url_api +
		"/catalog/categories/detail?id=" +
		id +
		"&lang=en&client_type=apricart&userid=abc123"
	let subCategories = null

	try {
		let response = await axios.get(subCategoriesUrl, {
			headers: headers,
		})

		subCategories = response.data
	} catch (error) {
		console.log(error)
	}

	return {
		props: {
			products,
			subCategories,
		},
		// revalidate: 200,
	}
}
