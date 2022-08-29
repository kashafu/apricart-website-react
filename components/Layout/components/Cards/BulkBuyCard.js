import Image from "next/image"
import bulkBuyIcon from "../../../../public/assets/svgs/bulkBuyIcon.svg"
import { useDispatch, useSelector } from 'react-redux'
import { updateSelectedType } from '../../../../redux/general.slice'
import { useEffect, useState } from 'react'
import { setCookie } from "../../../../helpers/Cookies"

export default function BulkBuyCard() {
	const dispatch = useDispatch()

	const [style, setStlye] = useState('')
	const [pStyle, setPStyle] = useState('')
	const selectedTypeSelector = useSelector((state) => state.general.selectedType)

	useEffect(() => {
		setStlye(selectedTypeSelector === 'bulk' ? 'bg-main-green' : '')
		setPStyle(selectedTypeSelector === 'bulk' ? 'text-white' : 'text-main-blue')
	}, [selectedTypeSelector])

	return (
		<button className={[style] + ' relative rounded-lg shadow flex flex-col grow p-1 lg:pl-2 lg:pt-2 items-center'}
			onClick={() => {
				dispatch(updateSelectedType('bulk'))
			}}
		>
			<div className={[pStyle] + " hidden absolute self-start font-bold text-main-blue lg:inline text-xl xl:text-2xl 2xl:text-3xl"}>
				<p>Bulk Buy</p>
			</div>
			<div className="self-end mt-auto relative w-full lg:w-[55%]">
				<Image src={bulkBuyIcon} layout={"responsive"} alt="bulk buy" />
			</div>
			<div className={[pStyle] + " lg:hidden flex font-semibold text-main-blue text-xs"}>
				<p>Bulk Buy</p>
			</div>
		</button>
	)
}
