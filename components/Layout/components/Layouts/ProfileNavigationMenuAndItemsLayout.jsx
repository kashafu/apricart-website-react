import { useRouter } from "next/router"
import { useEffect } from "react"

import { getGeneralApiParams } from "../../../../helpers/ApiHelpers"
import ProfileNavigationMenu from "../Menus/ProfileNavigationMenu"

const ProfileNavigationMenuAndItemsMenuLayout = ({ children }) => {
    const router = useRouter()
    let { token } = getGeneralApiParams()

    useEffect(() => {
        if (!token) {
            router.push("/login")
        }
    }, [])

    return (
        <main className="flex flex-col lg:flex-row w-full space-y-6 lg:space-y-0 lg:space-x-4">
            <div className="w-full lg:w-1/5">
                <ProfileNavigationMenu />
            </div>
            <section className="w-full lg:w-4/5">
                {children}
            </section>
        </main>
    )
}

export default ProfileNavigationMenuAndItemsMenuLayout