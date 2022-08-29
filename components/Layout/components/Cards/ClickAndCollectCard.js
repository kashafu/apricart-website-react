import Image from "next/image"
import clickAndCollectIcon from "../../../../public/assets/svgs/clickAndCollectIcon.svg"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateSelectedType } from "../../../../redux/general.slice"

export default function ClickAndCollectCard({ isDisabled }) {
	const dispatch = useDispatch()
	const [style, setStlye] = useState('')
	const [pStyle, setPStyle] = useState('')
	const [disabledStyle, setDisabledStyle] = useState('')
	const selectedTypeSelector = useSelector((state) => state.general.selectedType)

	useEffect(() => {
		setStlye(selectedTypeSelector === 'cnc' ? 'bg-main-green' : '')
		setPStyle(selectedTypeSelector === 'cnc' ? 'text-white' : 'text-main-blue')
	}, [selectedTypeSelector])

	useEffect(() => {
		setDisabledStyle(isDisabled ? 'bg-main-grey grayscale' : '')
	}, [isDisabled])

	return (
		<button
			className={[style] + ' relative rounded-lg shadow flex flex-col grow p-1 lg:pl-2 lg:pt-2 items-center ' + [disabledStyle]}
			onClick={() => {
				dispatch(updateSelectedType('cnc'))
			}}
			disabled={isDisabled}
		>
			<div className={[pStyle] + ' z-10 hidden absolute self-start font-bold lg:inline text-xl xl:text-2xl 2xl:text-3xl'}>				<p>Click & Collect</p>
			</div>
			<div className="self-end mt-auto relative w-full lg:w-[80%]">
				<Image
					src={clickAndCollectIcon}
					layout={"responsive"}
					alt="click and collect"
				/>
			</div>
			<div className={[pStyle] + ' lg:hidden flex font-semibold text-xs'}>
				<p>Click & Collect</p>
			</div>
		</button>
	)
}
