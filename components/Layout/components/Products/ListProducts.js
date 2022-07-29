import SingleProduct from "./SingleProduct"

export default function ListProducts({ products }) {
	if (!products) {
		return <div>Loading</div>
	}

	return (
		<section className="space-y-4 px-2">
			{/* MOBILE VIEW PRODUCTS */}
			<section className="grid grid-cols-2 lg:hidden gap-2">
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
			<section className="hidden lg:grid lg:grid-cols-4 gap-2 2xl:hidden">
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
			<section className="hidden 2xl:grid 2xl:grid-cols-5 gap-2">
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
