import { useRouter } from "next/router"
import { useEffect, useState, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"

import searchIcon from '../../../../public/assets/svgs/searchIcon.svg'

import SingleProductList from "../Products/SingleProductList"
import toKebabCase from "../../../../helpers/toKebabCase"
import { useCategoriesApi, useSearchBarResultsApi } from "../../../../helpers/Api"
import { updateCategories } from "../../../../redux/data.slice"
import Image from "next/image"

export default function SearchBar() {
	const [searchText, setSearchText] = useState("")
	const [showSearchResults, setShowSearchResults] = useState(false)
	const [selectedCategoryId, setSelectedCategoryId] = useState("")
	const [selectedCategoryName, setSelectedCategoryName] = useState("")
	const { categories } = useCategoriesApi()
	const { isLoading, setSearchTerm, searchResults, errorResponse, errorMessage } = useSearchBarResultsApi()

	const dispatch = useDispatch()
	const searchBarRef = useRef()
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

	return (
		<div className="relative w-full z-30">
			<div className="flex flex-row items-center h-7 lg:h-8 rounded-lg w-full">
				<select
					disabled={categoriesSelector == null}
					className="rounded-l-lg bg-slate-200 w-1/2 lg:w-1/4 h-full font-bold text-xs border border-main-blue"
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
					ref={searchBarRef}
					className="px-2 py-1 w-full h-full bg-slate-200 font-bold border border-main-blue"
					type={"search"}
					value={searchText}
					onChange={(e) => {
						setSearchText(e.target.value)
						if (e.target.value.length >= 3) {
							setSearchTerm(e.target.value)
							setShowSearchResults(true)
						}
						else {
							setShowSearchResults(false)
						}
					}}
					placeholder="Search Products..."
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
					autoComplete="false"
					name="hidden"
				/>
				<button className="h-full w-16 rounded-xl ml-[-30px] bg-main-red flex items-center justify-center"
					onClick={async () => {
						if (searchText === '') {
							searchBarRef.current.focus()
						}
						else {
							router.push('/products/search/' + searchText)
							await new Promise((r) => setTimeout(r, 100))
						}
					}}
				>
					<Image
						src={searchIcon}
						height={20}
						width={20}
						alt='search icon'
					/>
				</button>
			</div>
			{showSearchResults && !isLoading && (
				<div className="animate-dropdown absolute z-30 w-full bg-slate-100 max-h-[350px] overflow-auto rounded-b-lg">
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
