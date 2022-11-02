import SingleProduct from "./SingleProduct"
import Link from "next/link"
import Image from "next/image"
import missingImageIcon from '../../../../public/assets/images/missingImage.png'

export default function MainProducts({ section }) {
	let { data, name, offerId } = section
	let bannerImageWeb = section?.bannerImageWeb
	let identifier = section?.identifier

	let numberOfProductsMobile = 6
	let numberOfProductsLaptop = 8
	let numberOfProductsDesktop = 6

	if (!section) {
		return <div>Loading</div>
	}

	let imageUrl = bannerImageWeb === '' ? missingImageIcon : bannerImageWeb

	return (
		<section key={name} className="space-y-4 px-2 py-2">
			<div className="w-full border-b border-main-blue-100 py-2">
				<div className="flex flex-row items-center w-full justify-between">
					<p className="text-lg lg:text-[22px] text-main-blue font-bold">
						{name}
					</p>
					{identifier === "mostviewed" && (
						<Link href={"/products/most-viewed"} passHref>
							<a className="bg-main-blue px-6 py-1 h-full rounded-md flex items-center">
								<p className="text-white font-nunito font-normal text-xs lg:text-lg">
									View All
								</p>
							</a>
						</Link>
					)}
					{identifier === "recommended" && (
						<Link href={"/products/recommended"} passHref>
							<a className="bg-main-blue px-6 py-1 h-full rounded-md flex items-center">
								<p className="text-white font-nunito font-normal text-xs lg:text-lg">
									View All
								</p>
							</a>
						</Link>
					)}
				</div>
			</div>
			{identifier !== 'otherstores' && (
				<div>
					{/* MOBILE VIEW PRODUCTS */}
					<section className="grid grid-cols-2 sm:grid-cols-3 md:hidden gap-2">
						{data.slice(0, numberOfProductsMobile).map((product) => {
							let { id } = product
							return (
								<div key={id}>
									<SingleProduct product={product} />
								</div>
							)
						})}
					</section>
					{/* LAPTOP AND TABLET VIEW PRODUCTS */}
					<section className="hidden md:grid md:grid-cols-4 gap-2 xl:hidden">
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
					<section className="hidden xl:grid xl:grid-cols-5 3xl:grid-cols-6 gap-2">
						{data.slice(0, numberOfProductsDesktop).map((product) => {
							let { id } = product
							return (
								<div key={id}>
									<SingleProduct product={product} />
								</div>
							)
						})}
					</section>
				</div>
			)}
			<div className="w-full rounded-xl overflow-hidden">
				{offerId == 0 ? (
					<Image
						src={imageUrl}
						layout={'responsive'}
						alt={"banner image"}
						width={'100%'}
						height={18}
					/>
				) : (
					<Link
						href={
							"/offers/" + offerId
						}
						passHref
						key={offerId}
					>
						<a className="w-full">
							<Image
								src={imageUrl}
								layout={'responsive'}
								alt={"banner image"}
								width={'100%'}
								height={18}
							/>
						</a>
					</Link>
				)}
			</div>
		</section>
	)
}
