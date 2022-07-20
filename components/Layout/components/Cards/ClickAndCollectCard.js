import Image from 'next/image'
import clickAndCollectIcon from '../../../../public/assets/svgs/clickAndCollectIcon.svg'
import { useState } from 'react'
import Popup from '../Popup/Popup'

export default function ClickAndCollectCard() {
    const [showPopup, setShowPopup] = useState(false)

    return (
        <button className='relative bg-white rounded-lg shadow flex flex-col grow p-2 items-center'
            onClick={() => {
                setShowPopup(!showPopup)
            }}
        >
            <div className='hidden absolute self-start font-bold text-main-blue lg:inline text-2xl xl:text-3xl 2xl:text-4xl'>
                <p>
                    CLICK & COLLECT
                </p>
            </div>
            <div className='self-end mt-auto relative w-full lg:pt-2'>
                <Image
                    src={clickAndCollectIcon}
                    layout={'responsive'}
                />
            </div>
            <div className='lg:hidden flex font-semibold text-main-blue text-xs'>
                <p>
                    Click & Collect
                </p>
            </div>
            {showPopup && (
                <Popup
                    content={
                        <div className='flex flex-col h-full'>
                            <div className='mt-auto mb-auto'>
                                <p className='text-main-blue text-xl font-bold'>
                                    Please Continue in our app to Click & Collect
                                </p>
                                <p>
                                    {/* MOHSIN INSERT LINK TO APPS */}
                                </p>
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