import Image from 'next/image'
import homeDeliveryIcon from '../../../../public/assets/svgs/homeDeliveryIcon.svg'
import { useDispatch, useSelector } from 'react-redux'
import { updateSelectedType } from '../../../../redux/general.slice'
import { useEffect, useState } from 'react'

export default function HomeDeliveryCard(){
    const dispatch = useDispatch()

    const [style, setStlye] = useState('')
    const [pStyle, setPStyle] = useState('')
    const selectedTypeSelector = useSelector((state) => state.general.selectedType)

    useEffect(()=>{
        setStlye(selectedTypeSelector === 'home' ? 'bg-main-green' : '')
        setPStyle(selectedTypeSelector === 'home' ? 'text-white' : 'text-main-blue')
    },[selectedTypeSelector])

    return(
        <button className={[style] + ' relative rounded-lg shadow flex flex-col grow p-2 items-center'}
            onClick={()=>{
                dispatch(updateSelectedType('home'))
            }}
        >
            <div className={[pStyle] + ' hidden absolute self-start font-bold lg:inline text-2xl xl:text-3xl 2xl:text-4xl'}>
                <p>
                    HOME
                </p>
                <p>
                    DELIVERY
                </p>
            </div>
            <div className='self-end mt-auto relative w-full lg:w-4/5 lg:pl-4'>
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