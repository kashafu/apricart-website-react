import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { base_url_api } from '../../information.json'
import { getGeneralApiParams } from "../../helpers/ApiHelpers";
import Categories from "../../components/Layout/components/Categories/Categories";
import SingleProduct from "../../components/Layout/components/Products/SingleProduct";
import PageHeading from '../../components/Layout/components/Typography/PageHeading'
import Image from "next/image";
import Link from "next/link";

export default function CategoryProducts({ products, subCategories }) {
	const router = useRouter()
	const { id } = router.query

	const [categories, setCategories] = useState(null)
	const [updatedProductsList, setUpdatedProductsList] = useState(null)
	const [errorMessage, setErrorMessage] = useState('')

	useEffect(() => {
		getCategoriesApi()
		getUpdatedProductsApi()
	}, [])

	const getCategoriesApi = async () => {
		let { city, headers } = getGeneralApiParams()
		let url = base_url_api + '/catalog/categories?level=all&client_type=apricart&city=' + city

		try {
			let response = await axios.get(url,
				{
					headers: headers
				}
			)
			setCategories(response.data.data)
		} catch (error) {
			console.log(error)
		}
	}

	const getUpdatedProductsApi = async () => {
		let { headers, city } = getGeneralApiParams()
		let url = base_url_api + '/catalog/categories/products?category=' + id + '&page=1&size=100&sortType=&sortDirection=desc&instant=3&city=' + city + '&lang=en&client_type=apricart'

		try {
			let response = await axios.get(url, {
				headers: headers
			})

			setUpdatedProductsList(response.data)
			setErrorMessage('')
		}
		catch (err) {
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

	// if (!products || products?.data?.length == 0) {
	// 	return (
	// 		<div>
	// 			<p>
	// 				NO ITEMS EXIST
	// 			</p>
	// 		</div>
	// 	)
	// }

	if (products.status != 1) {
		return (
			<div>
				<p>
					{products.message}
				</p>
			</div>
		)
	}

	return (
		<div>
			{/* <p>
				{JSON.stringify(products)}
			</p> */}
			{/* <PageHeading
				text={products.data[0].categoryleafName}
			/> */}
			<div className="grid grid-cols-5 gap-8">
				{/* CATEGORIES SECTION */}
				<section className="hidden lg:col-span-1 lg:block">
					{categories && (
						<Categories
							categories={categories}
						/>
					)}
				</section>
				{/* PRODUCTS SECTION */}
				<section className="col-span-5 lg:col-span-4 space-y-12">
					{/* SUB CATEGORIES SECTION */}
					{subCategories && (
						<section>
							{subCategories.data.length > 0 && (
								<div className="flex flex-row overflow-y-auto w-full space-x-4">
									{subCategories.data.map((category) => {
										let { id, name, image } = category
										return (
											<Link href={'/category/' + id} passHref key={id}>
												<button className='flex flex-col items-center'>
													<p className="font-lato text-main-blue text-lg font-bold">
														{name}
													</p>
													<Image
														src={image}
														height={100}
														width={100}
													/>
												</button>
											</Link>
										)
									})}
								</div>
							)}
						</section>
					)}
					{errorMessage == '' ? (
						<div>
							{products == null || products?.data?.length == 0 ? (
								<div>
									NO ITEMS EXIST
								</div>
							) : (
								<section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
						<p>
							{errorMessage}
						</p>
					)}
				</section>
			</div>
		</div>
	);
}

export async function getStaticPaths() {
	let { headers } = getGeneralApiParams()
	let url = base_url_api + '/catalog/categories?level=all'
	let paths = []

	try {
		let response = await axios.get(url, {
			headers: headers
		})

		paths = response.data.data.map((categoryId) => {
			categoryId.map((childId) => {
				{
					params: { id: childId.id }
				}
			})
			{
				params: { id: categoryId.id }
			}
		})
		console.log("heeelo")
		console.log(paths);
	} catch (error) {
		console.log(error.response)
	}

	// const paths = ["/category/[id]", "/category/[id]"];
	return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ query, params }) {
	const { id } = query || params;
	let { headers } = getGeneralApiParams()
	let city = 'karachi'
	let url = base_url_api + '/catalog/categories/products?category=' + id + '&page=1&size=100&sortType=&sortDirection=desc&instant=3&city=' + city + '&lang=en&client_type=apricart'
	let products = null

	try {
		let response = await axios.get(url, {
			headers: headers
		})

		products = response.data
	}
	catch (err) {
		console.log(err);
	}

	let subCategoriesUrl = base_url_api + '/catalog/categories/detail?id=' + id + '&lang=en&client_type=apricart'
	let subCategories = null

	try {
		let response = await axios.get(subCategoriesUrl, {
			headers: headers
		})

		subCategories = response.data
	} catch (error) {
		console.log(error)
	}

	return {
		props: {
			products,
			subCategories
		},
		revalidate: 200
	}
}
