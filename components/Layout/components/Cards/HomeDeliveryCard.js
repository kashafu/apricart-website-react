import Image from 'next/image'
import homeDeliveryIcon from '../../../../public/assets/svgs/homeDeliveryIcon.svg'
import { useDispatch, useSelector } from 'react-redux'
import { updateSelectedType } from '../../../../redux/general.slice'
import { useEffect, useState } from 'react'

export default function HomeDeliveryCard({ isDisabled }) {
    const dispatch = useDispatch()
    const [style, setStlye] = useState('')
    const [pStyle, setPStyle] = useState('')
    const [disabledStyle, setDisabledStyle] = useState('')
    const selectedTypeSelector = useSelector((state) => state.general.selectedType)

    useEffect(() => {
        setStlye(selectedTypeSelector === 'home' ? 'bg-main-yellow' : '')
        setPStyle(selectedTypeSelector === 'home' ? 'text-main-blue' : 'text-main-blue')
    }, [selectedTypeSelector])

    useEffect(() => {
        setDisabledStyle(isDisabled ? 'bg-main-grey grayscale' : '')
    }, [isDisabled])

    return (
        <button className={[style] + ' relative rounded-lg shadow flex flex-col grow p-1 items-center ' + [disabledStyle]}
            onClick={() => {
                dispatch(updateSelectedType('home'))
            }}
            disabled={isDisabled}
        >
            <div className={[pStyle] + ' z-10 hidden absolute self-start font-bold lg:inline text-xl xl:text-2xl 2xl:text-3xl pl-4'}>
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
            <div className={[pStyle] + ' lg:hidden flex font-semibold text-xs'}>
                <p>
                    Home Delivery
                </p>
            </div>
        </button>
    )
}