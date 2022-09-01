import Image from "next/image"
import bulkBuyIcon from "../../../../public/assets/svgs/bulkBuyIcon.svg"
import { useDispatch, useSelector } from 'react-redux'
import { updateSelectedType } from '../../../../redux/general.slice'
import { useEffect, useState } from 'react'

export default function BulkBuyCard() {
	const dispatch = useDispatch()

	const [style, setStlye] = useState('')
	const [pStyle, setPStyle] = useState('')
	const selectedTypeSelector = useSelector((state) => state.general.selectedType)

	useEffect(() => {
		setStlye(selectedTypeSelector === 'bulk' ? 'bg-main-yellow' : '')
		setPStyle(selectedTypeSelector === 'bulk' ? 'text-main-blue' : 'text-main-blue')
	}, [selectedTypeSelector])

	return (
		<button className={[style] + ' relative rounded-lg shadow flex grow items-center justify-between'}
			onClick={() => {
				dispatch(updateSelectedType('bulk'))
			}}
		>
			<p className='font-nunito text-main-blue font-bold text-sm'>
				Bulk Buy
			</p>
			<div className='w-[40px]'>
				<Image
					src={bulkBuyIcon}
					layout={'responsive'}
					alt='icon'
				/>
			</div>
			{/* <div className={[pStyle] + " hidden absolute self-start font-bold text-main-blue lg:inline text-xl xl:text-2xl 2xl:text-3xl pl-4"}>
				<p className="font-nunito font-bold">Bulk Buy</p>
			</div>
			<div className="self-end mt-auto relative w-full lg:w-[55%]">
				<Image src={bulkBuyIcon} layout={"responsive"} alt="bulk buy" />
			</div>
			<div className={[pStyle] + " lg:hidden flex font-semibold text-main-blue text-xs"}>
				<p className="font-nunito font-bold">Bulk Buy</p>
			</div> */}
		</button>
	)
}
