import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState, useRef } from "react"
import { getGeneralApiParams } from "../../../../helpers/ApiHelpers"
import { base_url_api } from "../../../../information.json"
import SingleProductList from "../Products/SingleProductList"
import toKebabCase from "../../../../helpers/toKebabCase"
import { useCategoriesApi } from "../../../../helpers/Api"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { updateCategories } from "../../../../redux/data.slice"

export default function SearchBar() {
	const [searchText, setSearchText] = useState("")
	const [searchResults, setSearchResults] = useState([])
	const [showSearchResults, setShowSearchResults] = useState(false)
	const [selectedCategoryId, setSelectedCategoryId] = useState("")
	const [selectedCategoryName, setSelectedCategoryName] = useState("")
	const { categories } = useCategoriesApi()

	const dispatch = useDispatch()
	const searchIconElement = useRef()
	const router = useRouter()
	const categoriesSelector = useSelector((state) => state.data.categories)

	useEffect(() => {
		if (selectedCategoryId !== "") {
			router.push(
				"/category/" + toKebabCase(selectedCategoryName) + "/" + selectedCategoryId
			)
		}
	}, [selectedCategoryId])

	useEffect(() => {
		if (categories) {
			if (categoriesSelector.length == 0) {
				dispatch(updateCategories(categories))
			}
		}
	}, [categories, categoriesSelector])

	const getSearchResultsApi = async (searchTerm) => {
		if (searchTerm.length <= 2) {
			setSearchResults([])
			setShowSearchResults(false)
			return
		}
		let { city, userId, headers } = getGeneralApiParams()
		let url =
			base_url_api +
			"/catalog/products/search?page=1&size=10&term=" +
			searchTerm +
			"&category=" +
			selectedCategoryId +
			"&city=" +
			city +
			"&lang=en&userid=" +
			userId +
			"&client_type=apricart"
		let searchResponse = await axios.get(url, {
			headers: headers,
		})
		setShowSearchResults(true)
		setSearchResults(searchResponse.data.data)
	}

	return (
		<div className="relative w-full z-30">
			<div className="flex flex-row space-x-1 rounded-lg w-full">
				<select
					disabled={categoriesSelector == null}
					className="py-2 rounded-lg bg-slate-200 w-1/2 lg:w-1/4 font-bold text-xs"
					onChange={(e) => {
						setSelectedCategoryId(e.target.value)
						categoriesSelector.find((item) => {
							if (item.id == e.target.value) {
								setSelectedCategoryName(item.name)
							}
						})
					}}
					value={selectedCategoryId}
				>
					<option value={""} disabled selected>
						Categories
					</option>
					{categoriesSelector &&
						categoriesSelector.map((option) => {
							return (
								<option key={option.id} value={option.id}>
									{option.name}
								</option>
							)
						})}
				</select>
				<input
					ref={searchIconElement}
					className="p-2 w-full bg-slate-300 rounded-lg font-bold"
					type={"search"}
					value={searchText}
					onChange={(e) => {
						setSearchText(e.target.value)
						getSearchResultsApi(e.target.value)
					}}
					placeholder="Search"
					onBlur={async () => {
						await new Promise((r) => setTimeout(r, 500))
						setShowSearchResults(false)
					}}
					onKeyPress={async (e) => {
						if (e.key === 'Enter') {
							router.push('/products/search/' + e.target.value)
							await new Promise((r) => setTimeout(r, 100))
							setShowSearchResults(false)
						}
					}}
				/>
			</div>
			{showSearchResults && (
				<div className="absolute z-30 w-full bg-white max-h-[350px] overflow-auto rounded-b-lg">
					{searchResults.length > 0 ? (
						<div className="flex flex-col p-2 lg:p-4 space-y-2">
							{searchResults.map((product) => {
								let { id } = product
								return (
									<div key={id}>
										<SingleProductList product={product} />
									</div>
								)
							})}
						</div>
					) : (
						<p className="text-main-blue p-2 font-bold text-center">
							Could not find item
						</p>
					)}
				</div>
			)}
		</div>
	)
}
