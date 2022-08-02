import Image from "next/image"
import bulkBuyIcon from "../../../../public/assets/svgs/bulkBuyIcon.svg"
import { useDispatch, useSelector } from 'react-redux'
import { updateSelectedType } from '../../../../redux/general.slice'


export default function BulkBuyCard() {
	const dispatch = useDispatch()
    const selectedTypeSelector = useSelector((state) => state.general.selectedType)
    
    let style = selectedTypeSelector === 'bulk' ? 'bg-main-yellow' : ''

	return (
		<button
			className={[style] + " relative rounded-lg shadow flex flex-col grow p-2 items-center justify-between"}
			onClick={()=>{
                dispatch(updateSelectedType('bulk'))
            }}
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
