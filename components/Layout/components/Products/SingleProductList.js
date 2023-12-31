import Image from "next/image"
import Link from "next/link"
import missingImageIcon from "../../../../public/assets/svgs/missingImageIcon.svg"
import toKebabCase from "../../../../helpers/toKebabCase"

export default function SingleProductList({ product, isInStock }) {
	let {
		productImageUrl,
		productImageUrlThumbnail,
		title,
		currentPrice,
		sku,
		inStock,
		categoryleafName,
		categoryIds,
	} = product

	// For error handling when category leaf name or id are undefined or null from api
	categoryleafName = categoryleafName ?? "category-leaf"
	categoryIds = categoryIds ?? "0"

	if (isInStock) {
		inStock = isInStock
	}

	let imageUrl =
		productImageUrlThumbnail != ""
			? productImageUrlThumbnail
			: productImageUrl != ""
				? productImageUrl
				: missingImageIcon

	let immediateCategoryName = categoryleafName.split("|")[0].trim()
	let immediateCategoryId = categoryIds.replace(/\s+/g, "").split("|")[0]

	return (
		<div className="flex flex-row w-full bg-white rounded-lg items-center shadow overflow-hidden">
			<Link
				href={
					"/category/" +
					toKebabCase(immediateCategoryName) +
					"/" +
					immediateCategoryId +
					"/" +
					toKebabCase(title) +
					"/" +
					sku
				}
				passHref
			>
				<a className="flex flex-row w-full items-center">
					<div className="relative w-[50px] h-[50px] lg:w-[100px] lg:h-[100px] p-2">
						<Image src={imageUrl} layout={"fill"} />
					</div>
					<div className="relative flex flex-col items-center justify-between w-full rounded-2xl pl-2 py-2">
						<div className="flex flex-row w-full justify-left">
							<p className="font-lato font-bold text-left text-xs text-main-blue flex-1">
								{title}
							</p>
						</div>
						<div className="flex flex-row w-full justify-left">
							<p className="font-lato text-sm text-left">
								Rs.{" "}
								<span className="text-main-blue font-bold">
									{" "}
									{currentPrice}{" "}
								</span>
							</p>
						</div>
					</div>
				</a>
			</Link>
		</div>
	)
}
