import Link from "next/link"
import { useRouter } from "next/router"

import { logOutRemoveCookies } from "../../../../helpers/ApiHelpers"
import SubmitButton from "../Buttons/SubmitButton"

const ProfileNavigationMenu = () => {
    const router = useRouter()

    const logout = () => {
        logOutRemoveCookies()
        router.push("/")
    }

    return (
        <>
            <div className="w-full grid grid-flow-row border-2 divide-y-2 rounded-lg overflow-hidden">
                <Link href="/orders" passHref>
                    <a className={"text-main-blue font-bold text-xl text-center py-2 hover:bg-main-blue hover:text-white duration-200 ease-in-out " + [router.pathname === '/orders' && 'bg-main-blue text-white']}>Orders</a>
                </Link>
                <Link href="/address" passHref>
                    <a className={"text-main-blue font-bold text-xl text-center py-2 hover:bg-main-blue hover:text-white duration-200 ease-in-out " + [router.pathname === '/address' && 'bg-main-blue text-white']}>My Address</a>
                </Link>
                <Link href="/profile" passHref>
                    <a className={"text-main-blue font-bold text-xl text-center py-2 hover:bg-main-blue hover:text-white duration-200 ease-in-out " + [router.pathname === '/profile' && 'bg-main-blue text-white']}>Account details</a>
                </Link>
            </div>
            <SubmitButton text={"LOGOUT"} onClick={logout} bgColor={"bg-red-500"} />
        </>
    )
}

export default ProfileNavigationMenu
