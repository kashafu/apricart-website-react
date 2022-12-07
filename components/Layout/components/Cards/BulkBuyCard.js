import { useDispatch, useSelector } from 'react-redux'
import { useState } from "react"

import { updateSelectedType } from '../../../../redux/general.slice'
import Alert from "../Alerts/Alert"

const BulkBuyCard = () => {
	const dispatch = useDispatch()
	const reduxCart = useSelector((state) => state.cart)

	const [isShowAlert, setIsShowAlert] = useState(false)

	return (
		<>
			{isShowAlert && (
				<Alert
					text={"Attention: Some of the selected products may not be available if you change order type."}
					onClickOk={() => {
						setIsShowAlert(false)
						dispatch(updateSelectedType('bulk'))
					}}
					onClickCancel={() => {
						setIsShowAlert(false)
					}}
				/>
			)}
			<button
				className='items-center w-full h-full hover:scale-105 duration-300'
				onClick={() => {
					if (reduxCart.length > 0) {
						setIsShowAlert(true)
					}
					else {
						dispatch(updateSelectedType('bulk'))
					}
				}}
			>
				<p className='font-nunito text-main-blue font-black truncate lg:font-extrabold w-full text-xs md:text-base lg:text-sm 2xl:text-lg pl-1 lg:pl-2 leading-none'>
					Online Delivery
				</p>
			</button>
		</>
	)
}

export default BulkBuyCard