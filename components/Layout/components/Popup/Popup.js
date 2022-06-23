import Image from "next/image"

// ICONS
import crossIcon from '../../../../public/assets/images/crossIcon.svg'

export default function Popup({content, handleClose}){
    return(
        <div className="fixed w-1/2 bg-white h-[200px] border-8 inset-0 m-auto z-10  rounded-lg" >
            <div className="absolute right-[10px] top-[10px]">
                <button
                    onClick={handleClose}
                >
                    <Image
                        src={crossIcon}
                        width={"20px"}
                        height={"20px"}
                    />
                </button>
            </div>
            {content}
        </div>
    )
}