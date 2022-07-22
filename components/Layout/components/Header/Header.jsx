import Link from "next/link"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import BtnCart from "../test"
import Cookies from "universal-cookie"
import verticleLineIcon from "../../../../public/assets/svgs/verticalLine.svg"
import heartIcon from "../../../../public/assets/svgs/heartIcon.svg"
import locationPinPNG from "../../../../public/assets/images/location.png"

import { base_url_api } from "../../../../information.json"
import { getGeneralApiParams } from "../../../../helpers/ApiHelpers"
import SearchBar from "../SearchBar/SearchBar"
import Popup from "../Popup/Popup"
import HamburgerMenu from "../Menus/HamburgerMenu"
import Logo from "../Logo/Logo"
import Profile from "../Auth/Profile"
import Image from "next/image"
import HomeDeliveryCard from "../Cards/HomeDeliveryCard"
import ClickAndCollectCard from "../Cards/ClickAndCollectCard"
import BulkBuyCard from "../Cards/BulkBuyCard"
import CartSlider from "../Cart/CartSlider"
import { useRouter } from "next/router"

export default function Header({}) {
    const cookies = new Cookies()
    const router = useRouter()

    let { token, city } = getGeneralApiParams()

    const [getcity, setcity] = useState(city)
    const [isOpen, setIsOpen] = useState(false)

    if (!cookies.get("guestUserId")) {
        const d = new Date()
        cookies.set("guestUserId", "desktopuser_" + d.getTime(), 30)
    }

    useEffect(() => {
        if (cookies.get("cities") == null) {
            cookies.set("cities", "karachi")
            getLocation()
        }
    }, [])

    const getLocation = () => {
        if (!navigator.geolocation) {
            return
        }

        navigator.geolocation.getCurrentPosition((position) => {
            let latitude, longitude
            latitude = position.coords.latitude
            longitude = position.coords.longitude
            // KARACHI
            let karachiCoords = {
                top: [25.633730508113278, 67.36401298889072],
                bottom: [24.806311517712324, 67.18548517144208],
                left: [24.83871833773748, 66.65264830090317],
                right: [25.139943073700493, 67.64691091500156],
            }

            if (
                latitude <= karachiCoords.top[0] &&
                latitude >= karachiCoords.bottom[0] &&
                longitude <= karachiCoords.right[1] &&
                longitude >= karachiCoords.left[1]
            ) {
                setcity("karachi")
                cookies.set("cities", "karachi")
                return
            }

            // PESHAWAR
            let peshawarCoords = {
                top: [34.1040966916378, 71.56477299064852],
                bottom: [33.856413627696355, 71.52769413625535],
                left: [33.99144768127041, 71.38281194594128],
                right: [34.025599547506026, 71.75909365348681],
            }

            if (
                latitude <= peshawarCoords.top[0] &&
                latitude >= peshawarCoords.bottom[0] &&
                longitude <= peshawarCoords.right[1] &&
                longitude >= peshawarCoords.left[1]
            ) {
                setcity("peshawar")
                cookies.set("cities", "peshawar")
                return
            }
        })
    }

    const togglePopup = () => {
        setIsOpen(!isOpen)
    }

    const closeButton = () => {
        setIsOpen(!isOpen)
        window.location.reload()
    }

    const handleCity = (event) => {
        setcity(event.target.value)
        cookies.set("cities", event.target.value)
    }

    const submitCities = (e) => {
        e.preventDefault()
        setcity(e.target.value)
    }

    return (
        <div className="flex flex-col bg-white px-2 md:px-12 py-2 md:py-8 space-y-2 border-b">
            <div className="flex flex-row items-center space-x-2 md:space-x-4">
                <div className="lg:hidden">
                    <HamburgerMenu />
                </div>
                <div className="hidden lg:block lg:w-[200px]">
                    <Logo />
                </div>
                <div className="grow">
                    <SearchBar />
                </div>
                <div className="lg:hidden flex flex-row">
                    <CartSlider />
                </div>
                <div className="hidden lg:inline lg:flex lg:flex-row lg:space-x-4 lg:items-center">
                    <div className="pr-4">
                        <button
                            className="flex flex-row space-x-2 items-center"
                            onClick={togglePopup}
                        >
                            <div className="relative w-[12px] h-[15px] lg:w-[19px] lg:h-[22px]">
                                <Image
                                    src={locationPinPNG}
                                    alt={"location icon"}
                                    layout={"fill"}
                                />
                            </div>
                            <p
                                className={
                                    "font-bold text-sm lg:text-md text-main-grey-800 lg:text-lg capitalize"
                                }
                            >
                                {getcity}
                            </p>
                        </button>
                    </div>
                    <Link href={"/wishlist"} passHref>
                        <Image src={heartIcon} width={45} height={45} />
                    </Link>
                    <div className="relative">
                        <CartSlider />
                    </div>
                    {token ? (
                        <div>
                            <Profile />
                        </div>
                    ) : (
                        <div className="flex flex-row space-x-2 items-center">
                            <Link href={"/login"} passHref>
                                <a className="text-xl font-main-grey-800 font-semibold">
                                    Login
                                </a>
                            </Link>
                            <p className="text-3xl font-bold pb-[5px]">|</p>
                            <Link href={"/register"} passHref>
                                <a className="truncate text-xl font-main-grey-800 font-semibold">
                                    Sign Up
                                </a>
                            </Link>
                        </div>
                    )}
                </div>
                {isOpen && (
                    <div className="fixed w-1/2 bg-white h-1/6 border-8 inset-0 m-auto z-10">
                        <Popup
                            content={
                                <form onSubmit={submitCities}>
                                    <label className="select_city">
                                        Select City
                                    </label>
                                    <hr />
                                    <div className="freehome_d">
                                        <div className="freehome_title">
                                            <input
                                                className="radiobtn"
                                                type="radio"
                                                name="cities"
                                                value="karachi"
                                                checked={getcity === "karachi"}
                                                onChange={handleCity}
                                            />
                                            Karachi
                                        </div>
                                        <div className="freehome_title">
                                            <input
                                                className="radiobtn"
                                                type="radio"
                                                name="cities"
                                                value="peshawar"
                                                checked={getcity === "peshawar"}
                                                onChange={handleCity}
                                            />
                                            Peshawar
                                        </div>
                                    </div>
                                    <button
                                        className="bg-sky-600 w-[75px] rounded-full hover:bg-sky-700 text-white"
                                        type="submit"
                                        onClick={closeButton}
                                    >
                                        Submit
                                    </button>
                                </form>
                            }
                            handleClose={togglePopup}
                        />
                    </div>
                )}
            </div>
            {router.pathname === '/' && (
                <div className="grid grid-cols-3 gap-2 lg:gap-8">
                    <HomeDeliveryCard />
                    <ClickAndCollectCard />
                    <BulkBuyCard />
                </div>
            )}
        </div>
    )
}
