import Image from "next/image"

// ICONS
import crossIcon from '../../../../public/assets/svgs/crossIcon.svg'

export default function Popup({ content, handleClose }) {
    return (
        <div className="animate-dropdown fixed inset-0 h-full w-full backdrop-blur-sm z-50">
            <div className="fixed w-3/4 lg:w-1/2 bg-white h-[200px] border-2 shadow-2xl inset-0 m-auto z-50 rounded-lg p-2" >
                <div className="absolute -right-[15px] -top-[15px]">
                    <button
                        onClick={handleClose}
                    >
                        <Image
                            src={crossIcon}
                            width={30}
                            height={30}
                            alt='icon'
                        />
                    </button>
                </div>
                {content}
            </div>
        </div>
    )
}