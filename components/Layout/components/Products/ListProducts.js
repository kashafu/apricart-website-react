import SingleProduct from "./SingleProduct"

export default function ListProducts({ products }) {
	if (!products) {
		return <div>Loading</div>
	}

	return (
		<section className="space-y-4 px-2">
			{/* MOBILE VIEW PRODUCTS */}
			<section className="grid grid-cols-2 sm:grid-cols-3 md:hidden gap-2">
				{products.map((product) => {
					let { id } = product
					return (
						<div key={id}>
							<SingleProduct product={product} />
						</div>
					)
				})}
			</section>
			{/* LAPTOP VIEW PRODUCTS */}
			<section className="hidden md:grid md:grid-cols-4 gap-2 xl:hidden">
				{products.map((product) => {
					let { id } = product
					return (
						<div key={id}>
							<SingleProduct product={product} />
						</div>
					)
				})}
			</section>
			{/* DESKTOP VIEW PRODUCTS */}
			<section className="hidden xl:grid xl:grid-cols-5 3xl:grid-cols-6 gap-2">
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
