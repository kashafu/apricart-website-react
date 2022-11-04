import { useRouter } from "next/router"
import Link from "next/link"

import PageHeading from "../../../../components/Layout/components/Typography/PageHeading"
import HeadTag from "../../../../components/Layout/components/Head/HeadTag"
import toKebabCase, { fromKebabCase } from "../../../../helpers/toKebabCase"
import {
	useCategoryProductsApi,
} from "../../../../helpers/Api"
import SubCategoryShimmer from "../../../../components/Layout/components/Loaders/Shimmers/SubCategoryShimmer"
import ListProductsShimmer from "../../../../components/Layout/components/Loaders/Shimmers/ListProductsShimmer"
import ListProducts from "../../../../components/Layout/components/Products/ListProducts"
import CategoryAndItemsLayout from "../../../../components/Layout/components/Layouts/CategoryAndItemsLayout"

export default function CategoryProducts() {
	const router = useRouter()
	const { categoryName } = router.query
	const {
		isLoading,
		categoryProducts,
		subCategories,
		errorMessage,
		totalItems,
		size,
		setPage,
		page
	} = useCategoryProductsApi()

	const SubCategories = () => {
		if (isLoading || !router.isReady) {
			return (
				<SubCategoryShimmer />
			)
		}

		return (
			<section>
				{subCategories.length > 0 && (
					<div className="flex overflow-y-auto h-full w-full gap-4 py-4 px-2">
						{subCategories.map((category) => {
							let { id, name } = category
							return (
								<Link
									key={id}
									href={
										"/category/" +
										toKebabCase(name) +
										"/" +
										id
									}
									passHref
								>
									<a className="transition-all duration-100 rounded-xl shadow-sm px-4 border-main-blue border-2 hover:bg-main-blue text-main-blue hover:text-white">
										<p className="flex flex-col h-full w-full items-center font-lato text-center text-lg font-bold truncate">
											{name}
										</p>
									</a>
								</Link>
							)
						})}
					</div>
				)}
			</section>
		)
	}

	const Filter = () => {
		let arr = []
		for (let index = size; index <= totalItems + size; index = index + size) {
			arr.push(
				<button key={index}
					onClick={() => {
						setPage(index / size)
						window.scroll({
							top: 0,
							left: 0,
							behavior: "smooth",
						})
					}}
					className={index / size === page ? "border-main-blue bg-main-blue px-2 text-white font-bold rounded-lg" : "border-main-blue px-2 text-main-blue font-bold rounded-lg duration-200 hover:bg-main-blue hover:text-white"}
				>
					{index / size}
				</button>
			)
		}

		return (
			<div className="flex w-full space-x-6 items-center overflow-x-auto">
				<p className="">
					Showing items {(page - 1) * size + 1} - {(((page - 1) * size) + size) > totalItems ? (totalItems) : (((page - 1) * size) + size)} of {totalItems}
				</p>
				<div className="flex flex-row space-x-2 w-full overflow-x-auto">
					{arr}
				</div>
			</div>
		)
	}

	const CategoryProducts = () => {
		if (isLoading || !router.isReady) {
			return (
				<ListProductsShimmer />
			)
		}

		if (!categoryProducts) {
			return (
				<div>
					<p>{errorMessage}</p>
				</div>
			)
		}

		if (categoryProducts.length == 0) {
			return (
				<div>
					<p>No items to show</p>
				</div>
			)
		}

		return (
			<ListProducts
				products={categoryProducts}
			/>
		)
	}

	const PageItems = () => {
		return (
			<>
				{router.isReady && (
					<PageHeading
						text={fromKebabCase(categoryName.toUpperCase())}
					/>
				)}
				<section className="space-y-4">
					<SubCategories />
					<CategoryProducts />
					<Filter />
				</section>
			</>
		)
	}

	return (
		<div>
			{router.isReady && (
				<HeadTag
					title={
						fromKebabCase(categoryName)
					}
				/>
			)}
			<CategoryAndItemsLayout>
				<PageItems />
			</CategoryAndItemsLayout>
		</div>
	)
}
