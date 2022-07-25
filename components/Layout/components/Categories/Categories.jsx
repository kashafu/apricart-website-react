import Link from "next/link"
import { useState } from "react"
import Image from "next/image"
import upArrowIcon from "../../../../public/assets/svgs/upArrowIcon.svg"
import downArrowIcon from "../../../../public/assets/svgs/downArrowIcon.svg"
import toKebabCase from "../../../../helpers/toKebabCase"

export default function Categories({ categories }) {
	const [isSelected, setIsSelected] = useState("")

	return (
		<div className="space-y-4">
			<p className="text-main-blue font-bold lg:text-2xl 2xl:text-4xl">
				- CATEGORIES
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
											href="/category/[categoryName]/[id]"
											as={
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
												src={
													isSelected == id
														? upArrowIcon
														: downArrowIcon
												}
												width={20}
												height={20}
												alt="icon"
											/>
										</button>
									</div>
									<div className="bg-main-blue rounded-b-lg px-6 divide-y">
										{childrenData.map((subCategory) => {
											let { id, name } = subCategory
											return (
												<div
													key={id}
													className="flex flex-row w-full items-center py-2"
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
								<div className="grid grid-cols-5 py-2 pl-4 bg-white items-center rounded-lg">
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
											src={
												isSelected == id
													? upArrowIcon
													: downArrowIcon
											}
											width={20}
											height={20}
										/>
									</button>
								</div>
							)}
						</div>
					)
				})}
			</div>
		</div>
	)
}
