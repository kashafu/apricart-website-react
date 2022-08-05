import { useRouter } from "next/router"
import Categories from "../../../../components/Layout/components/Categories/Categories"
import SingleProduct from "../../../../components/Layout/components/Products/SingleProduct"
import PageHeading from "../../../../components/Layout/components/Typography/PageHeading"
import Image from "next/image"
import Link from "next/link"
import HeadTag from "../../../../components/Layout/components/Head/HeadTag"
import toKebabCase from "../../../../helpers/toKebabCase"
import { fromKebabCase } from "../../../../helpers/toKebabCase"
import { useCategoryProductsApi, useSubCategoriesApi } from "../../../../helpers/Api"

export default function CategoryProducts() {
	const router = useRouter()
	const { categoryId, categoryName } = router.query

	const SubCategories = () => {
		const { isLoading, subCategories, errorMessage } = useSubCategoriesApi()

		if (isLoading) {
			return (
				<div>
					<p>
						Loading
					</p>
				</div>
			)
		}

		if (!subCategories) {
			return (
				<div>
					<p>
						{errorMessage}
					</p>
				</div>
			)
		}

		return (
			<section>
				{subCategories.length > 0 && (
					<div className="grid grid-flow-col overflow-y-auto h-full w-full gap-4 py-8">
						{subCategories.map((category) => {
							let { id, name, image } = category
							return (
								<div
									key={id}
									className="border rounded-md shadow w-[150px]"
								>
									<Link
										href="/category/[categoryName]/[id]"
										as={
											"/category/" +
											toKebabCase(name) +
											"/" +
											id
										}
										passHref
									>
										<a className="flex flex-col h-full w-full items-center">
											<p className="font-lato text-center text-main-blue text-lg font-bold py-2">
												{name}
											</p>
											<Image
												src={image}
												height={100}
												width={100}
												alt={
													"category image"
												}
											/>
										</a>
									</Link>
								</div>
							)
						})}
					</div>
				)}
			</section>
		)
	}

	const CategoryProducts = () => {
		const { isLoading, categoryProducts, errorMessage } = useCategoryProductsApi()

		if (isLoading) {
			return (
				<div>
					<p>
						Loading
					</p>
				</div>
			)
		}

		if (!categoryProducts) {
			return (
				<div>
					<p>
						{errorMessage}
					</p>
				</div>
			)
		}

		if (categoryProducts.length == 0) {
			return (
				<div>
					<p>
						No items to show
					</p>
				</div>
			)
		}

		return (
			<section className="grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-5 gap-4">
				{categoryProducts.map((product) => {
					let { id } = product
					return (
						<div key={id}>
							<SingleProduct
								product={product}
							// TODO call api to get updated details of product and check if it is in stock
							/>
						</div>
					)
				})}
			</section>
		)
	}

	if(!router.isReady){
		return(
			<></>
		)
	}

	return (
		<div>
			<HeadTag title={fromKebabCase(categoryName)[0].toUpperCase() + fromKebabCase(categoryName).substring(1)} />
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
