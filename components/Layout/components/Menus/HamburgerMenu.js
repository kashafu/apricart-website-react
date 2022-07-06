import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/router"
import menuIcon from '../../../../public/assets/svgs/menuIcon.svg'
import crossIcon from '../../../../public/assets/svgs/crossIcon.svg'
import profileIcon from '../../../../public/assets/svgs/profileIcon.svg'
import Logo from "../Logo/Logo"
import { getGeneralApiParams, logOutRemoveCookies, getGeneralCookies } from "../../../../helpers/ApiHelpers"
import SubmitButton from "../Buttons/SubmitButton"
import LinkButton from "../Buttons/LinkButton"

export default function HamburgerMenu({}){
    const router = useRouter()

    let { token } = getGeneralApiParams()
    let { name, email, phoneNumber } = getGeneralCookies()
    const [showMenu, setShowMenu] = useState(false)

    const logout = () => {
        logOutRemoveCookies()
        router.push('/')
        router.reload()
    }
    
    return(
        <div className="relative">
            <button
                className="flex items-center"
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
                <div className="fixed top-0 flex flex-col py-4 px-2 left-0 w-3/4 h-screen bg-white z-10 justify-between rounded-r-2xl">
                    <div className="space-y-4">
                        <div className="flex flex-row justify-between items-center">
                            <div className="w-1/2">
                                <Logo />
                            </div>
                            <button
                                onClick={()=>{
                                    setShowMenu(!showMenu)
                                }}
                            >
                                <Image
                                    src={crossIcon}
                                    alt={'cross icon'}
                                    width={20}
                                    height={20}
                                />
                            </button>
                        </div>
                        {token && (
                            <p>
                                Welcome, {name}
                            </p>
                        )}
                        <div className="items-center align-center space-y-2">
                            <LinkButton
                                text={"View Categories"}
                                path={'/'}
                            />
                            <LinkButton
                                text={"Shopping List"}
                                path={'/'}
                            />
                            <LinkButton
                                text={"Order Manually"}
                                path={'/'}
                            />
                        </div>
                    </div>
                    {token ? (
                        <div className="flex flex-col">
                            {/* <div className="flex flex-row">
                                <Image
                                    src={profileIcon}
                                    alt={'icon'}
                                    height={20}
                                    width={20}
                                />
                                <div className="flex flex-col">
                                    <p>
                                        {name}
                                    </p>
                                    <p>
                                        {email}
                                    </p>
                                    <p>
                                        {phoneNumber}
                                    </p>
                                </div>
                            </div> */}
                            <SubmitButton
                                text={"LOGOUT"}
                                onClick={logout}
                            />
                        </div>
                    ):(
                        <div className="space-y-2">
                            <SubmitButton
                                text={"LOGIN"}
                                onClick={()=>{
                                    router.push('/login')
                                }}
                            />
                            <SubmitButton
                                text={"REGISTER"}
                                onClick={()=>{
                                    router.push('/register')
                                }}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}