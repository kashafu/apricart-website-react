import Link from "next/link"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import axios from "axios"
import { toast } from "react-toastify"
// import "react-toastify/dist/ReactToastify.css";
import React, { useContext, useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import BtnCart from "../test"
import WelcomeBtn from "../Auth/Test"
import { useRouter } from "next/router"
import Cookies from "universal-cookie"
import CatagoryBtn from "../test1"
import verticleLineIcon from "../../../../public/assets/svgs/verticalLine.svg"
import heartIcon from "../../../../public/assets/svgs/heartIcon.svg"
import locationPinPNG from "../../../../public/assets/images/location.png"

import { base_url_api } from "../../../../information.json"
import { getGeneralApiParams } from "../../../../helpers/ApiHelpers"
import SearchBar from "../SearchBar/SearchBar"
import Popup from "../Popup/Popup"
import HamburgerMenu from "../Menus/HamburgerMenu"
import Logo from "../Logo/Logo"
import LinkText from "../Typography/LinkText"
import Profile from "../Auth/Profile"
import Image from "next/image"

export default function Header({}) {
    const cookies = new Cookies()
    const router = useRouter()

    let { token, city } = getGeneralApiParams()

    const [user, setAuthenticated] = useState(false)
    const [getcity, setcity] = useState(city)
    const [isOpen, setIsOpen] = useState(false)

    var name = cookies.get("cookies-name")

    if (!cookies.get("guestUserId")) {
        const d = new Date()
        cookies.set("guestUserId", "desktopuser_" + d.getTime(), 30)
    }

    useEffect(() => {
        if (cookies.get("cities") == null) {
            cookies.set("cities", "karachi")
            getLocation()
        }
        if (token) {
            setAuthenticated(true)
        }
        return () => {
            token
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

    const logout = () => {
        cookies.remove("cookies-token")
        cookies.remove("selected-address")
        localStorage.clear()
        setAuthenticated(false)
        router.push("/")
    }

    const Links = user ? (
        <li className="nav-item">
            <div className="dropdown">
                <button
                    className="dropbtn"
                    // data-bs-toggle="modal"
                    // data-bs-target="#exampleModal"
                    // data-bs-whatever="@mdo"
                >
                    {""}
                    <a className="nav-link capitalize">
                        <img
                            src="/assets/images/user.png"
                            className="img-fluid"
                        />
                        {name && <p>Welcome {name}</p>}
                    </a>
                </button>
                <div className="dropdown-content">
                    <Link href="/profile_user">
                        <a href="#">
                            <img
                                src="/assets/images/user.png"
                                className="img-fluid"
                            />
                            My Profile
                        </a>
                    </Link>
                    <Link href="/order">
                        <a href="#">
                            <img
                                src="/assets/images/bag.png"
                                className="img-fluid"
                            />
                            My Orders
                        </a>
                    </Link>
                    <Link href="/address">
                        <a href="#">
                            <img
                                src="/assets/images/location.png"
                                className="img-fluid"
                            />
                            My Address
                        </a>
                    </Link>
                    <button className="logoutbtn" onClick={logout}>
                        <a>
                            <img
                                src="/assets/images/logout.png"
                                className="img-fluid"
                            />{" "}
                            Logout
                        </a>
                    </button>
                </div>
            </div>
        </li>
    ) : (
        <li className="nav-item">
            <div className="dropdown">
                <WelcomeBtn className="navlink" />
            </div>
        </li>
    )

    const cart = useSelector((state) => state.cart)
    const wish = useSelector((state) => state.wish)

    const dispatch = useDispatch()

    const getTotalPrice = () => {
        return cart.reduce(
            (accumulator, item) => accumulator + item.quantity * item.price,
            0
        )
    }
    const cartnotify = () => {
        if (cart.length == 0) {
            toast.info("No Item in the Cart !")
        }
    }
    const wishnotify = () => {
        if (wish.length == 0) {
            toast.info("No Item in Wishlist !")
        }
    }

    let cartAll = {}
    let mydata
    // let Data1
    const wishList =
        wish.length > 0 ? (
            <span className="heart2">
                <AiFillHeart className="abcd" />
            </span>
        ) : (
            <span className="heart1">
                <AiOutlineHeart className="abcd" />
            </span>
        )
    const config = {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.get("cookies-token"),
        },
    }

    return (
        <div className="flex flex-row h-[60px] bg-white items-center py-2 px-12 space-x-4">
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
                <BtnCart />
                {cart.length}
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
                        <p className={"font-bold text-sm lg:text-md text-main-grey-800 lg:text-lg capitalize"}>{getcity}</p>
                    </button>
                </div>
                <Link href={"/wishlist"} passHref>
                    <Image src={heartIcon} width={45} height={45} />
                </Link>
                <div className="relative">
                    <BtnCart />
                    <p className="absolute -right-2 -top-2 text-black">
                        {cart.length}
                    </p>
                </div>
                {token ? (
                    <Profile />
                ) : (
                    <div className="flex flex-row space-x-2 items-center">
                        <Link href={'/login'} passHref>
                            <a className="text-xl font-main-grey-800 font-semibold">
                                Login
                            </a>
                        </Link>
                        <p className="text-3xl font-bold pb-[5px]">|</p>
                        <Link href={'/register'} passHref>
                            <a className="text-xl font-main-grey-800 font-semibold">
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
        // <div className="container-fluid hae">
        //     <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
        //         <div className="container-fluid">
        //             <div className="hidden lg:block">
        //                 <Link href="/" passHref>
        //                     <a>
        //                         <img
        //                             src="/assets/images/logo.png"
        //                             // className="img-fluid"
        //                             width="150px;"
        //                         />
        //                     </a>
        //                 </Link>
        //             </div>

        //             <form
        //                 className="d-flex ms-auto manu_cat"
        //                 required
        //                 onSubmit={inputData}
        //             >
        //                 <div className="sidebar-1">
        //                     <a className="nav-link d-lg-none category-style">
        //                         <CatagoryBtn />
        //                     </a>
        //                 </div>
        //                 <div className=" d-md-none d-lg-none"></div>
        //                 <div className="input-group searching_pro">
        //                     <SearchBar />
        //                 </div>
        //             </form>

        //             <div className="cart-header" id="navbar-content">
        //                 <ul className="navbar-nav mr-auto mb-2 mb-lg-0 float-end">
        //                     <li className="nav-item">
        //                         <Link href="/grocery_list">
        //                             <a
        //                                 className="nav-link"
        //                                 aria-current="page"
        //                                 href="#"
        //                             >
        //                                 Order Manually
        //                             </a>
        //                         </Link>
        //                     </li>

        //                     <li className="nav-item" onClick={wishnotify}>
        //                         <Link href="/wishlist">
        //                             <a className="nav-link" href="#">
        //                                 {wishList}
        //                                 Shopping List
        //                             </a>
        //                         </Link>
        //                     </li>
        //                     <BtnCart />
        //                     {cart.length}

        //                     {Links}
        //                 </ul>
        //             </div>
        //         </div>
        //     </nav>
        //     <div></div>
        // </div>
    )
}
