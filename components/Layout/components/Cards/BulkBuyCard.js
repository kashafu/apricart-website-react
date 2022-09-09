import Image from "next/image"
import bulkBuyIcon from "../../../../public/assets/svgs/bulkBuyIcon.svg"
import { useDispatch, useSelector } from 'react-redux'
import { updateSelectedType } from '../../../../redux/general.slice'
import { useEffect, useState } from 'react'

export default function BulkBuyCard() {
	const dispatch = useDispatch()

	const [style, setStlye] = useState('')
	const selectedTypeSelector = useSelector((state) => state.general.selectedType)

	useEffect(() => {
		setStlye(selectedTypeSelector === 'bulk' ? 'bg-main-yellow' : '')
	}, [selectedTypeSelector])

	return (
		<button className={[style] + ' relative rounded-lg shadow flex grow items-center hover:bg-main-yellow duration-300'}
			onClick={() => {
				dispatch(updateSelectedType('bulk'))
			}}
		>
			<p className='font-nunito text-main-blue font-black truncate lg:font-extrabold w-full text-[8px] md:text-base lg:text-sm 2xl:text-lg pl-1 lg:pl-2 leading-none'>
				Bulk Buy
			</p>
			<div className='w-[60%] max-w-[130px]'>
				<Image
					src={bulkBuyIcon}
					layout={'responsive'}
					alt='icon'
				/>
			</div>
		</button>
	)
}
