import Image from 'next/image'
import homeDeliveryIcon from '../../../../public/assets/svgs/homeDeliveryIcon.svg'

export default function HomeDeliveryCard(){
    return(
        <button className='relative rounded-lg shadow flex flex-col grow p-2 items-center bg-main-yellow'>
            <div className='hidden absolute self-start font-bold text-main-blue lg:inline text-2xl xl:text-3xl 2xl:text-4xl'>
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
                />
            </div>
            <div className='lg:hidden flex font-semibold text-main-blue text-xs'>
                <p>
                    Home Delivery
                </p>
            </div>
        </button>
    )
}