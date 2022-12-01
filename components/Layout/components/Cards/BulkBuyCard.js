import { useDispatch } from 'react-redux'

import { updateSelectedType } from '../../../../redux/general.slice'

const BulkBuyCard = () => {
	const dispatch = useDispatch()

	return (
		<button
			className='items-center w-full h-full hover:scale-105 duration-300'
			onClick={() => {
				dispatch(updateSelectedType('bulk'))
			}}
		>
			<p className='font-nunito text-main-blue font-black truncate lg:font-extrabold w-full text-xs md:text-base lg:text-sm 2xl:text-lg pl-1 lg:pl-2 leading-none'>
				Online Delivery
			</p>
		</button>
	)
}

export default BulkBuyCard