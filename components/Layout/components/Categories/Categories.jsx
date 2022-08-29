import Link from "next/link"
import { useEffect, useState } from "react"
import Image from "next/image"
import upArrowIcon from "../../../../public/assets/svgs/upArrowIcon.svg"
import downArrowIcon from "../../../../public/assets/svgs/downArrowIcon.svg"
import toKebabCase from "../../../../helpers/toKebabCase"
import { useCategoriesApi } from "../../../../helpers/Api"
import { useRouter } from "next/router"

export default function Categories() {
	const router = useRouter()
	const { categoryId } = router.query

	const [routerCategoryId, setRouterCategoryId] = useState(0)
	const { isLoading, categories, errorMessage } = useCategoriesApi()
	const [isSelected, setIsSelected] = useState("")

	useEffect(() => {
		if (router.isReady) {
			if (categoryId) {
				setIsSelected(categoryId)
				setRouterCategoryId(categoryId)
			}
		}
	}, [router.query])

	if (isLoading) {
		return (
			<div>
				<p>Loading categories</p>
			</div>
		)
	}

	if (!categories) {
		return (
			<div>
				<p>{errorMessage}</p>
			</div>
		)
	}

	console.log()

	return (
		<div className="sticky top-[70px] w-full overflow-y-auto no-scrollbar max-h-[calc(100vh-100px)]">
			<div className="space-y-4">
				<p className="text-main-blue font-bold lg:text-2xl 2xl:text-3xl">
					Categories
				</p>
				<div className="grid grid-flow-row divide-y">
					{categories.map((category) => {
						let { id, name, childrenData } = category
						return (
							<div key={id} className="w-full">
								{isSelected == id ? (
									<div className="grid grid-flow-row">
										<div className="grid grid-cols-5 py-2 pl-4 bg-main-blue items-center rounded-t-lg">
											<Link
												href={
													"/category/" +
													toKebabCase(name) +
													"/" +
													id
												}
												passHref
											>
												<a className="text-white font-bold col-span-4">
													{name}
												</a>
											</Link>
											<button
												onClick={() => {
													if (isSelected == id) {
														setIsSelected("")
													} else {
														setIsSelected(id)
													}
												}}
											>
												<Image
													src={upArrowIcon}
													width={10}
													height={10}
													alt="icon"
												/>
											</button>
										</div>
										<div className="bg-main-blue rounded-b-lg px-6 divide-y animate-dropdown">
											{childrenData.map((subCategory) => {
												let { id: subId, name } = subCategory
												return (
													<div
														key={subId}
														className="flex flex-row w-full items-center py-2"
													>
														<Link
															href={
																"/category/" +
																toKebabCase(name) +
																"/" +
																subId
															}
															passHref
														>
															<a className="font-bold text-main-yellow">
																{name}
															</a>
														</Link>
													</div>
												)
											})}
										</div>
									</div>
								) : (
									<div className="grid grid-cols-5 py-2 pl-4 bg-white duration-100 hover:text-lg hover:bg-black items-center rounded-lg">
										<Link
											href={
												"/category/" +
												toKebabCase(name) +
												"/" +
												id
											}
											passHref
										>
											<a className="text-main-blue col-span-4">
												{name}
											</a>
										</Link>

										<button
											onClick={() => {
												setIsSelected(id)
											}}
										>
											<Image
												src={downArrowIcon}
												width={10}
												height={10}
												alt={"icon"}
											/>
										</button>
									</div>
								)}
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}
