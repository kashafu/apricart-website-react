import { useState, useEffect } from "react";
import axios from "axios";
import { getGeneralApiParams } from "../../helpers/ApiHelpers";
import { base_url_api } from '../../information.json'
import Categories from "../../components/Layout/components/Categories/Categories";

export default function Posts({ posts }) {
	const [categories, setCategories] = useState(null)

	useEffect(() => {
		getCategoriesApi()
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

	if (!categories) {
		return (
			<div>
				Loading
			</div>
		)
	}

	return (
		<div className="w-full">
			<div className="w-full">
				<Categories
					categories={categories}
				/>
			</div>
		</div>
	)
	// console.log("Data product", posts)
	// return (
	// 	<ul>
	// 		{posts.map((post) => {
	// 			return (
	// 				<li key={post.id}>
	// 					<h3>
	// 						<Link href="/category/[id]" as={"/category/" + post.id}>
	// 							<a>{post.name}</a>
	// 						</Link>
	// 					</h3>

	// 				</li>
	// 			);
	// 		})}
	// 	</ul>
	// );
}

// export async function getServerSideProps() {
// 	const res = await fetch("https://staging.apricart.pk/v1/catalog/categories?level=all");

// 	const getdata = await res.json();
// 	const posts = getdata.data
// 	// const  posts = await postData.data.childrenData;



// 	return {
// 		props: {
// 			posts,
// 		},
// 	};
// }