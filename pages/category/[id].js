import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from 'universal-cookie';
let base_url_api = "https://staging.apricart.pk/v1";
import Link from "next/link";
import Pagination from "../../components/Layout/components/Pagination/pagination";
import PerPage from "../../components/Layout/components/PerPage/PerPage";
import { useDispatch } from "react-redux";
import Image from 'next/image';
import { getGeneralApiParams } from "../../helpers/ApiHelpers";
import MainProducts from "../../components/Layout/components/Products/MainProducts";
import Categories from "../../components/Layout/components/Categories/Categories";

export default function CategoryProducts({ products }) {
	const router = useRouter();

	const [categories, setCategories] = useState(null)

	useEffect(()=>{
		getCategoriesApi()
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

	// let total = postData.length;

	// let cattype = postData.data
	// console.log("Total item found", postData.length)

	// if (!postData) {
	// 	return (
	// 		<div>
	// 			<p>
	// 				Item does not exist
	// 			</p>
	// 		</div>
	// 	)
	// }

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
				<MainProducts
					products={products.data}
				/>
			</section>
		</div>
	);
}

export async function getStaticPaths() {
	const paths = ["/category/[id]", "/category/[id]"];
	return { paths, fallback: true };
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
