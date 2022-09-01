import Image from 'next/image'
import homeDeliveryIcon from '../../../../public/assets/svgs/homeDeliveryIcon.svg'
import { useDispatch, useSelector } from 'react-redux'
import { updateSelectedType } from '../../../../redux/general.slice'
import { useEffect, useState } from 'react'

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
        <button className={[style] + ' relative rounded-lg shadow flex items-center grow justify-between ' + [disabledStyle]}
            onClick={() => {
                dispatch(updateSelectedType('home'))
            }}
            disabled={isDisabled}
        >
            <p className='font-nunito text-main-blue font-bold text-sm lg:text-2xl pl-2 leading-none'>
                Home Delivery
            </p>
            <div className='w-[80px] lg:w-[120px]'>
                <Image
                    src={homeDeliveryIcon}
                    layout={'responsive'}
                    alt='icon'
                />
            </div>
            {/* <div className={[pStyle] + ' z-10 hidden absolute self-start font-bold lg:inline text-xl xl:text-2xl 2xl:text-3xl pl-4'}>
                <p className='font-nunito'>
                    Home
                </p>
                <p className='font-nunito'>
                    Delivery
                </p>
            </div>
            <div className='self-end mt-auto relative w-full lg:w-[60%] lg:pl-6'>
                <Image
                    src={homeDeliveryIcon}
                    layout={'responsive'}
                    alt='icon'
                />
            </div>
            <div className={[pStyle] + ' lg:hidden flex font-bold text-xs'}>
                <p className='font-nunito'>
                    Home Delivery
                </p>
            </div> */}
        </button>
    )
}