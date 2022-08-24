import { useRouter } from "next/router"
import Categories from "../../../../components/Layout/components/Categories/Categories"
import SingleProduct from "../../../../components/Layout/components/Products/SingleProduct"
import PageHeading from "../../../../components/Layout/components/Typography/PageHeading"
import Link from "next/link"
import HeadTag from "../../../../components/Layout/components/Head/HeadTag"
import toKebabCase from "../../../../helpers/toKebabCase"
import { fromKebabCase } from "../../../../helpers/toKebabCase"
import {
	useCategoryProductsApi,
	useSubCategoriesApi,
} from "../../../../helpers/Api"
import { useState } from "react"

export default function CategoryProducts() {
	const router = useRouter()
	const { categoryId, categoryName } = router.query

	const SubCategories = () => {
		const { isLoading, subCategories, errorMessage } = useSubCategoriesApi()

		if (isLoading) {
			return (
				<div>
					<p>Loading</p>
				</div>
			)
		}

		if (!subCategories) {
			return (
				<div>
					<p>{errorMessage}</p>
				</div>
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

	const CategoryProducts = () => {
		const {
			isLoading,
			categoryProducts,
			errorMessage,
			totalItems,
			size,
			setSize,
			setPage,
			page
		} = useCategoryProductsApi()

		if (isLoading) {
			return (
				<div>
					<p>Loading</p>
				</div>
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

		const Filter = () => {
			let arr = []
			for (let index = size; index <= totalItems + size; index = index + size) {
				arr.push(
					<button key={index}
						onClick={() => {
							setPage(index / size)
						}}
					>
						<p>{index / size}</p>
					</button>
				)
			}

			return (
				<div className="flex w-full space-x-6">
					<p>
						{/* Showing items {pageNumber * numberOfProducts}-{(pageNumber * numberOfProducts) + numberOfProducts} of {totalItems} */}
					</p>
					<div className="space-x-4">{arr}</div>
				</div>
			)
		}

		return (
			<section>
				<Filter />
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
						<CategoryProducts />
					</section>
				</section>
			</div>
		</div>
	)
}
