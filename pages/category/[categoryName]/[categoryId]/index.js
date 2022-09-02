import { useRouter } from "next/router"
import Link from "next/link"

import Categories from "../../../../components/Layout/components/Categories/Categories"
import SingleProduct from "../../../../components/Layout/components/Products/SingleProduct"
import PageHeading from "../../../../components/Layout/components/Typography/PageHeading"
import HeadTag from "../../../../components/Layout/components/Head/HeadTag"
import toKebabCase, { fromKebabCase } from "../../../../helpers/toKebabCase"
import {
	useCategoryProductsApi,
} from "../../../../helpers/Api"
import SubCategoryShimmer from "../../../../components/Layout/components/Loaders/Shimmers/SubCategoryShimmer"

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
		if (isLoading) {
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
										<p className="flex flex-col h-full w-full items-center font-lato text-center text-lg font-bold py-2 truncate">
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
					}}
					className={index / size === page ? "border-main-blue border-1 bg-main-blue p-2 text-white font-bold rounded-lg" : "border-main-blue border-1 p-2 text-main-blue font-bold rounded-lg duration-200 hover:bg-main-blue hover:text-white"}
				>
					{index / size}
				</button>
			)
		}

		return (
			<div className="flex w-full space-x-6 items-center">
				<p className="">
					Showing items {(page - 1) * size} - {(((page - 1) * size) + size) > totalItems ? (totalItems) : (((page - 1) * size) + size)} of {totalItems}
				</p>
				<div className="space-x-2">
					{arr}
				</div>
			</div>
		)
	}

	const CategoryProducts = () => {
		if (isLoading) {
			return (
				<div>

				</div>
			)
		}

		return (
			<section>
				<section className="grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-5 gap-4">
					{categoryProducts.map((product) => {
						let { sku } = product
						return (
							<div key={sku}>
								<SingleProduct
									product={product}
								// TODO call api to get updated details of product and check if it is in stock
								/>
							</div>
						)
					})}
				</section>
			</section>
		)
	}

	if (!router.isReady) {
		return <></>
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
		<div>
			<HeadTag
				title={
					fromKebabCase(categoryName)[0].toUpperCase() +
					fromKebabCase(categoryName).substring(1)
				}
			/>
			<div className="grid grid-cols-5 gap-8">
				{/* CATEGORIES SECTION */}
				<section className="hidden lg:col-span-1 lg:block">
					<Categories />
				</section>
				{/* PRODUCTS SECTION */}
				<section className="col-span-5 lg:col-span-4">
					<PageHeading
						text={fromKebabCase(categoryName.toUpperCase())}
					/>
					<section className="space-y-12">
						<SubCategories />
						<Filter />
						<CategoryProducts />
						<Filter />
					</section>
				</section>
			</div>
		</div>
	)
}
