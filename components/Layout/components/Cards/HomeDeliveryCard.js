import Image from 'next/image'
import homeDeliveryIcon from '../../../../public/assets/svgs/homeDeliveryIcon.svg'
import { useDispatch, useSelector } from 'react-redux'
import { updateSelectedType } from '../../../../redux/general.slice'
import { useEffect, useState } from 'react'
import Cookies from 'universal-cookie'

export default function HomeDeliveryCard({ isDisabled }) {
    const dispatch = useDispatch()
    const cookies = new Cookies()
    const [style, setStlye] = useState('')
    const [pStyle, setPStyle] = useState('')
    const [disabledStyle, setDisabledStyle] = useState('')
    const selectedTypeSelector = useSelector((state) => state.general.selectedType)

    useEffect(() => {
        setStlye(selectedTypeSelector === 'home' ? 'bg-main-green' : '')
        setPStyle(selectedTypeSelector === 'home' ? 'text-white' : 'text-main-blue')
    }, [selectedTypeSelector])

    useEffect(() => {
        setDisabledStyle(isDisabled ? 'bg-main-grey grayscale' : '')
    }, [isDisabled])

    return (
        <button className={[style] + ' relative rounded-lg shadow flex flex-col grow p-2 items-center ' + [disabledStyle]}
            onClick={() => {
                dispatch(updateSelectedType('home'))
                cookies.remove('selected-type', {path: '/'})
                cookies.set('selected-type', 'home', {path: '/'})
            }}
            disabled={isDisabled}
        >
            <div className={[pStyle] + ' z-10 hidden absolute self-start font-bold lg:inline text-2xl xl:text-3xl 2xl:text-4xl'}>
                <p>
                    HOME
                </p>
                <p>
                    DELIVERY
                </p>
            </div>
            <div className='self-end mt-auto relative w-full lg:w-4/5 lg:pl-6'>
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