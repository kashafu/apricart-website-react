import Image from "next/image"
import { useState } from "react"
import menuIcon from '../../../../public/assets/svgs/MenuIcon.svg'

export default function HamburgerMenu({}){
    const [showMenu, setShowMenu] = useState(false)
    
    return(
        <div className="relative w-full">
            <button
                onClick={()=>{
                    setShowMenu(!showMenu)
                }}
            >
                <Image
                    src={menuIcon}
                    alt={'icon'}
                    width={25}
                    height={20}
                />  
            </button>
            {showMenu && (
                <div className="absolute top-0 left-0 w-3/4 bg-black z-10">

                </div>
            )}
        </div>
    )
}