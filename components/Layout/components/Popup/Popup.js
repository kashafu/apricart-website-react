import Image from "next/image"

// ICONS
import crossIcon from '../../../../public/assets/svgs/crossIcon.svg'

export default function Popup({ content, handleClose }) {
    return (
        <div className="animate-dropdown fixed inset-0 h-full w-full backdrop-blur-sm z-10">
            <div className="fixed w-3/4 lg:w-1/2 bg-white h-[200px] border-2 shadow-2xl inset-0 m-auto z-10 rounded-lg p-2" >
                <div className="absolute right-[10px] top-[10px]">
                    <button
                        onClick={handleClose}
                    >
                        <Image
                            src={crossIcon}
                            width={20}
                            height={20}
                            alt='icon'
                        />
                    </button>
                </div>
                {content}
            </div>
        </div>
    )
}