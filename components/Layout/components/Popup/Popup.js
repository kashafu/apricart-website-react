import Image from "next/image"

// ICONS
import crossIcon from '../../../../public/assets/svgs/crossIcon.svg'

export default function Popup({content, handleClose}){
    return(
        <div className="fixed w-1/2 bg-white h-[200px] border-2 shadow-2xl inset-0 m-auto z-10 rounded-lg" >
            <div className="absolute right-[10px] top-[10px]">
                <button
                    onClick={handleClose}
                >
                    <Image
                        src={crossIcon}
                        width={10}
                        height={10}
                    />
                </button>
            </div>
            {content}
        </div>
    )
}