import Image from "next/image"
import bulkBuyIcon from "../../../../public/assets/svgs/bulkBuyIcon.svg"
import { useDispatch, useSelector } from 'react-redux'
import { updateSelectedType } from '../../../../redux/general.slice'
import { useEffect, useState } from 'react'

export default function BulkBuyCard() {
    const dispatch = useDispatch()

    const [style, setStlye] = useState('')
    const selectedTypeSelector = useSelector((state) => state.general.selectedType)

    useEffect(()=>{
        setStlye(selectedTypeSelector === 'bulk' ? 'bg-main-yellow' : '')
    },[selectedTypeSelector])

    return(
        <button className={[style] + ' relative rounded-lg shadow flex flex-col grow p-2 items-center'}
			onClick={()=>{
                dispatch(updateSelectedType('bulk'))
            }}
			disabled
		>
			<div className="hidden absolute self-start font-bold text-main-blue lg:inline text-2xl xl:text-3xl 2xl:text-4xl">
				<p>BULK BUY</p>
			</div>
			<div className="self-end mt-auto relative w-full lg:w-2/3">
				<Image src={bulkBuyIcon} layout={"responsive"} alt="bulk buy" />
			</div>
			<div className="lg:hidden flex font-semibold text-main-blue text-xs">
				<p>Bulk Buy</p>
			</div>
		</button>
	)
}
