import SingleProduct from "./SingleProduct"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

export default function MainProducts({ section }) {
	let { data, name, offerId } = section
	let bannerImageWeb = section?.bannerImageWeb
	let identifier = section?.identifier

	const [numberOfProductsMobile, setNumberOfProductsMobile] = useState(4)
	const [numberOfProductsLaptop, setNumberOfProductsLaptop] = useState(8)
	const [numberOfProductsDesktop, setNumberOfProductsDesktop] = useState(10)

	if (!section) {
		return <div>Loading</div>
	}

	return (
		<section key={name} className="space-y-4 px-2 py-4">
			<div className="w-full rounded-xl overflow-hidden">
				{offerId == 0 ? (
					<Image
						src={bannerImageWeb}
						layout={'responsive'}
						alt={"banner image"}
						width={'100%'}
						height={20}
					/>
				) : (
					<Link href="/offers/[id]"
						as={
							"/offers/" + offerId
						}
						passHref
						key={offerId}
					>
						<a className="w-full">
							<Image
								src={bannerImageWeb}
								layout={'responsive'}
								alt={"banner image"}
								width={'100%'}
								height={20}
							/>
						</a>
					</Link>
				)}
			</div>
			<div className="w-full border-b border-main-blue-100 py-4">
				<div className="flex flex-row items-stretch w-full justify-between">
					<p className="text-2xl text-main-blue font-bold">
						- {name}
					</p>
					{identifier === "mostviewed" && (
						<Link href={"/products/most-viewed"} passHref>
							<a className="bg-main-blue px-4 rounded-xl flex items-center">
								<p className="text-white font-bold text-md lg:text-lg">
									View All
								</p>
							</a>
						</Link>
					)}
					{identifier === "recommended" && (
						<Link href={"/products/recommended"} passHref>
							<a className="bg-main-blue px-4 rounded-xl flex items-center">
								<p className="text-white font-bold text-md lg:text-lg">
									View All
								</p>
							</a>
						</Link>
					)}
				</div>
			</div>
			{/* MOBILE VIEW PRODUCTS */}
			<section className="grid grid-cols-2 lg:hidden gap-2">
				{data.slice(0, numberOfProductsMobile).map((product) => {
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
				{data.slice(0, numberOfProductsLaptop).map((product) => {
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
				{data.slice(0, numberOfProductsDesktop).map((product) => {
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
