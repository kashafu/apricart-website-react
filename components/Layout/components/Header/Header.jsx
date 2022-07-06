import Link from "next/link";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import BtnCart from "../test";
import WelcomeBtn from "../Auth/Test";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import CatagoryBtn from "../test1";
import profileIcon from '../../../../public/assets/svgs/profileIcon.svg'

import { base_url_api } from "../../../../information.json";
import { getGeneralApiParams } from "../../../../helpers/ApiHelpers";
import SearchBar from "../SearchBar/SearchBar";
import HamburgerMenu from "../Menus/HamburgerMenu";
import Logo from "../Logo/Logo";
import LinkText from "../Typography/LinkText";

export default function Header({}) {
    const cookies = new Cookies();
    const router = useRouter();

    let { token } = getGeneralApiParams();

    const [user, setAuthenticated] = useState(false);

    var messsage = cookies.get("cookies-message");
    var name = cookies.get("cookies-name");
    var userId = cookies.get("cookies-userId");

    useEffect(() => {
        if (token) {
            setAuthenticated(true);
        }
        return () => {
            token;
        };
    }, []);

    const logout = () => {
        cookies.remove("cookies-token");
        cookies.remove("selected-address");
        localStorage.clear();
        setAuthenticated(false);
        router.push("/");
    };

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
                    <a className="nav-link">
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
    );

    const cart = useSelector((state) => state.cart);
    const wish = useSelector((state) => state.wish);

    const dispatch = useDispatch();

    const getTotalPrice = () => {
        return cart.reduce(
            (accumulator, item) => accumulator + item.quantity * item.price,
            0
        );
    };
    const cartnotify = () => {
        if (cart.length == 0) {
            toast.info("No Item in the Cart !");
        }
    };
    const wishnotify = () => {
        if (wish.length == 0) {
            toast.info("No Item in Wishlist !");
        }
    };

    let cartAll = {};
    let mydata;
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
        );
    const config = {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.get("cookies-token"),
        },
    };
    if (token) {
        userId = cookies.get("cookies-userId");
        cartAll = async () => {
            const response = await axios.get(
                `https://staging.apricart.pk/v1/order/cart/checkout?userid=10638&city=karachi&lang=en&client_lat=24.909230104621333&client_long=67.12185373161728`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + cookies.get("cookies-token"),
                    },
                }
            );
            //setData(response.data.data);
            let Data1 = response.data.data;
            mydata = Data1.products;
            // console.log("NEW"); //checking data
            // console.log(Data1);
        };
    } else {
        // cartAll = async() =>{
        //   const response = await axios.get(
        //     `https://staging.apricart.pk/v1/guest/cart/all?userid=${cookies.get('guestUserId')}&lang=en`,
        //     config
        //   );
        //   setData(response.data.data);
        //   let Data1 = response.data.data;
        //   mydata = Data1;
        // }
    }

    return (
        //Main Header Start
        <div className="flex flex-row h-[50px] bg-white items-center py-2 px-4 space-x-4">
            <div className="md:hidden">
                <HamburgerMenu />
            </div>
            <div className="hidden md:block md:w-[200px]">
                <Logo />
            </div>
            <div className="md:grow">
                <SearchBar />
            </div>
            <div className="hidden md:inline md:flex md:flex-row md:space-x-4">
                <LinkText
                    text={"Order Manually"}
                    path={"/grocery_list"}
                />
                <LinkText
                    text={"Shopping List"}
                    path={"/wishlist"}
                />
                <LinkText
                    text={"Login"}
                    path={"/login"}
                    icon={profileIcon}
                />
            </div>
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
    );
}
