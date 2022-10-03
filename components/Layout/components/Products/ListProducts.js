import SingleProduct from "./SingleProduct"

export default function ListProducts({ products }) {
	if (!products) {
		return <div>Loading</div>
	}

	return (
		<section className="px-2">
			<section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 3xl:grid-cols-6 gap-2">
				{products.map((product) => {
					let { id } = product
					return (
						<div key={id}>
							<SingleProduct product={product} />
						</div>
					)
				})}
			</section>
		</section>
	)
}
