import Image from 'next/image'
import { useState } from 'react'
import bulkBuyIcon from '../../../../public/assets/svgs/bulkBuyIcon.svg'
import Popup from '../Popup/Popup'

export default function BulkBuyCard() {
    const [showPopup, setShowPopup] = useState(false)

    return (
        <button className='relative bg-white rounded-lg shadow flex flex-col grow p-2 items-center justify-between'
            onClick={() => {
                setShowPopup(!showPopup)
            }}
        >
            <div className='hidden absolute self-start font-bold text-main-blue lg:inline text-2xl xl:text-3xl 2xl:text-4xl'>
                <p>
                    BULK BUY
                </p>
            </div>
            <div className='self-end mt-auto relative w-full lg:w-2/3'>
                <Image
                    src={bulkBuyIcon}
                    layout={'responsive'}
                />
            </div>
            <div className='lg:hidden flex font-semibold text-main-blue text-xs'>
                <p>
                    Bulk Buy
                </p>
            </div>
            {showPopup && (
                <Popup
                    content={
                        <div className='flex flex-col h-full'>
                            <div className='mt-auto mb-auto flex flex-col space-y-4'>
                                <p className='text-main-blue text-sm lg:text-2xl font-bold'>
                                    Bigger purchase bigger discount with Apricart Bulk Buy.
                                </p>
                                <p className='text-main-blue text-xs lg:text-xl font-bold'>
                                    Use our APP to place your Bulk order.
                                </p>
                                <div className='flex flex-row w-full justify-center'>
                                    <a href="https://play.google.com/store/apps/details?id=com.assorttech.airoso_app&hl=en&gl=US">
                                        <img
                                            src="/assets/images/playstore-img.png"
                                            width={120}
                                            height={40}
                                            margin-right={50}
                                            className="img-fluid"
                                            alt=""
                                        />
                                    </a>
                                    <a href="https://apps.apple.com/us/app/apricart/id1562353936?platform=iphone">
                                        <img
                                            src="/assets/images/appstore-img.png"
                                            width={120}
                                            height={40}
                                            className="img-fluid king"
                                            alt=""
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                    }
                    handleClose={() => {
                        setShowPopup(!showPopup)
                    }}
                />
            )}
        </button>
    )
}