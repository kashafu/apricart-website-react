import { useState, useEffect } from "react";
import axios from "axios";
import { getGeneralApiParams } from "../../helpers/ApiHelpers";
import { base_url_api } from '../../information.json'
import Categories from "../../components/Layout/components/Categories/Categories";

export default function Posts({ posts }) {
	return (
		<div className="w-full">
			<div className="w-full">
				<Categories />
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
// 	const res = await fetch("https://stag.apricart.pk/v1/catalog/categories?level=all");

// 	const getdata = await res.json();
// 	const posts = getdata.data
// 	// const  posts = await postData.data.childrenData;



// 	return {
// 		props: {
// 			posts,
// 		},
// 	};
// }