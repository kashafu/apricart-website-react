import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import HeadTag from "../../../components/Layout/components/Head/HeadTag"
import Categories from "../../../components/Layout/components/Categories/Categories"
import SingleProduct from "../../../components/Layout/components/Products/SingleProduct"
import PageHeading from '../../../components/Layout/components/Typography/PageHeading'
import { getGeneralApiParams } from "../../../helpers/ApiHelpers"
import { base_url_api } from "../../../information.json"
import ErrorText from "../../../components/Layout/components/Typography/ErrorText"

const SearchResults = () => {
	const router = useRouter()

    const [results, setResults] = useState(null)
    const [errorMessage, setErrorMessage] = useState('Loading Search Data..')
	const [categories, setCategories] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')

	useEffect(() => {
        // router.reload()
		getCategoriesApi()
        if(router.isReady){
            const { term } = router.query
            console.log(term);
            setSearchTerm(term)
            getSearchResultsApi(term)
        }
	}, [router.isReady, router.query])

    const getSearchResultsApi = async (term) => {
		let { city, userId, headers } = getGeneralApiParams()
        let url =
            base_url_api +
            "/catalog/products/search?page=1&size=25&term=" +
            term +
            "&category=&city=" +
            city +
            "&lang=en&userid=" +
            userId +
            "&client_type=apricart"

        console.log(url);
        try {
            let searchResponse = await axios.get(url, {
                headers: headers,
            })
            setResults(searchResponse.data.data)
            console.log(searchResponse.data.data)
            setErrorMessage('')
        } catch (error) {
            setErrorMessage(error?.response?.data?.message)
        }
	}

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

    if(!results){
        return(
            <>
                Loading Search Results...
            </>
        )
    }

	return (
		<div>
			<HeadTag title={"Search"} />
			<div className="grid grid-cols-5 gap-8">
				{/* CATEGORIES SECTION */}
				<section className="hidden lg:col-span-1 lg:block">
					{categories && <Categories categories={categories} />}
				</section>
				{/* PRODUCTS SECTION */}
				<section className="col-span-5 lg:col-span-4 space-y-12">
                    <PageHeading
                        text={'SEARCH RESULTS FOR: ' + searchTerm}
                    />
					{results.length == 0 ? (
						<div>NO ITEMS EXIST</div>
					) : (
						<section className="grid grid-cols-2 md:grid-cols-4 gap-4">
							{results.map((result) => {
								let { id } = result
								return (
									<div key={id}>
										<SingleProduct product={result} />
									</div>
								)
							})}
						</section>
					)}
				</section>
			</div>
		</div>
	)
}

export default SearchResults