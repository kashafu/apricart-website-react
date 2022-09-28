import MainCategories from '../../components/Layout/components/Categories/MainCategories'
import SingleCategory from '../../components/Layout/components/Categories/SingleCategory'
import HeadTag from '../../components/Layout/components/Head/HeadTag'
import PageHeading from '../../components/Layout/components/Typography/PageHeading'
import { useCategoriesApi } from '../../helpers/Api'

const CategoriesListing = () => {
	const Categories = () => {
		const { isLoading, errorResponse, errorMessage, categories } = useCategoriesApi()

		if (isLoading) {
			return <>

			</>
		}

		if (errorResponse) {
			<p>
				{errorMessage}
			</p>
		}

		return (
			<section>
				<section className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-8 gap-4">
					{categories.map((category) => {
						let { id } = category
						return (
							<div key={id}>
								<SingleCategory
									category={category}
								/>
							</div>
						)
					})}
				</section>
			</section>
		)
	}

	return (
		<div className="w-full">
			<HeadTag
				title="Categories"
			/>
			<PageHeading
				text={"CATEGORIES"}
			/>
			<section className="w-full">
				<Categories />
			</section>
		</div>
	)
}

export default CategoriesListing