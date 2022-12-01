import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { updateSelectedType } from '../../../../redux/general.slice'

export default function HomeDeliveryCard({ isDisabled }) {
    const dispatch = useDispatch()
    const [style, setStlye] = useState('')
    const [disabledStyle, setDisabledStyle] = useState('')
    const selectedTypeSelector = useSelector((state) => state.general.selectedType)

    useEffect(() => {
        setStlye(selectedTypeSelector === 'home' ? 'bg-main-yellow' : '')
    }, [selectedTypeSelector])

    useEffect(() => {
        setDisabledStyle(isDisabled ? 'bg-main-grey grayscale' : '')
    }, [isDisabled])

    return (
        <button className={[style] + ' relative rounded-lg shadow flex items-center grow hover:bg-main-yellow duration-300 ' + [disabledStyle]}
            onClick={() => {
                dispatch(updateSelectedType('home'))
            }}
            disabled={isDisabled}
        >
            <p className='font-nunito text-main-blue font-black lg:font-extrabold text-xs md:text-base lg:text-sm 2xl:text-lg w-full pl-1 lg:pl-2 leading-none'>
                Home Delivery
            </p>
        </button>
    )
}