import Link from "next/link";
import { useState } from "react";
import { getGeneralCookies, logOutRemoveCookies } from "../../../../helpers/ApiHelpers";
import LinkText from "../Typography/LinkText";
import profileIcon from '../../../../public/assets/svgs/profileIcon.svg'
import bagIcon from '../../../../public/assets/svgs/shoppingBagIcon.svg'
import locationIcon from '../../../../public/assets/svgs/locationPinIcon.svg'
import SubmitButton from "../Buttons/SubmitButton";
import { useRouter } from "next/router";

export default function Profile({ }) {
    const router = useRouter()

    let { name } = getGeneralCookies()
    const [showDropdown, setShowDropdown] = useState(false)

    const logout = () => {
        logOutRemoveCookies()
        router.push("/")
    }

    return (
        <div className="relative">
            <Link href={'/account_detail'} passHref>
                <a className="flex flex-row w-full items-center whitespace-nowrap space-x-px font-lato text-main-blue font-semibold"
                    onMouseEnter={() => {
                        setShowDropdown(true)
                    }}
                    onMouseLeave={() => {
                        setShowDropdown(false)
                    }}
                >
                    <p className="capitalize">
                        Welcome, {name}
                    </p>
                </a>
            </Link>
            {showDropdown && (
                <div className="flex flex-col items-center absolute z-10 w-full p-4 bg-white rounded-b-xl space-y-6"
                    onMouseEnter={() => {
                        setShowDropdown(true)
                    }}
                    onMouseLeave={() => {
                        setShowDropdown(false)
                    }}
                >
                    <div className="flex flex-col items-center space-y-4">
                        <LinkText
                            text={'My Profile'}
                            path={'/profile_user'}
                            icon={profileIcon}
                        />
                        <LinkText
                            text={'My Orders'}
                            path={'/order'}
                            icon={bagIcon}
                        />
                        <LinkText
                            text={'My Addresses'}
                            path={'/address'}
                            icon={locationIcon}
                        />
                    </div>
                    <SubmitButton
                        text={'LOGOUT'}
                        onClick={logout}
                    />
                </div>
            )}
        </div>
    )
}