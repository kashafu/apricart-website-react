import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
let base_url_api = "https://staging.apricart.pk/v1";
import { getGeneralApiParams } from "../../helpers/ApiHelpers";
import Categories from "../../components/Layout/components/Categories/Categories";
import SingleProduct from "../../components/Layout/components/Products/SingleProduct";

export default function CategoryProducts({ products }) {
	const router = useRouter()
	const { id } = router.query

	const [categories, setCategories] = useState(null)
	const [updatedProductsList, setUpdatedProductsList] = useState(null)
	const [errorMessage, setErrorMessage] = useState('')

	useEffect(()=>{
		getCategoriesApi()
		getUpdatedProductsApi()
	}, [])

	const getCategoriesApi = async () => {
		let {city, headers} = getGeneralApiParams()
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
			setErrorMessage(err.response.data.message)
		}
	}

	if (router.isFallback) {
		return (
			<div>
				<h2>Loading Page Data...</h2>
			</div>
		)
	}

	if(!products) {
		return(
			<div>
				<p>
					NO ITEMS EXIST
				</p>
			</div>
		)
	}

	if(products.status != 1){
		return(
			<div>
				<p>
					{products.message}
				</p>
			</div>
		)
	}

	return (
		<div>
			<p>
				{/* {products.data[0].categoryleafName} */}
				{JSON.stringify(products)}
			</p>
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
					{/* <MainProducts
						products={products.data}
					/> */}
					{errorMessage == '' ? (
						<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
							{products.data.map((product)=>{
								let { id } = product
								return(
									<div key={id}>
										<SingleProduct
											product={product}
											// TODO call api to get updated details of product and check if it is in stock
										/>
									</div>
								)
							})}
						</div>
					)
					:
					(
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

		paths = response.data.data.map((categoryId)=>{
			categoryId.map((childId)=>{
				{
					params: {id: childId.id}
				}
			})
			{
				params: {id: categoryId.id}
			}
		})
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

	return {
		props: {
			products,
		},
		revalidate: 200
	};
}
