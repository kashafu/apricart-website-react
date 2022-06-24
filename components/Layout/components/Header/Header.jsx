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
import {
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    updatedcart,
} from "../../../../redux/cart.slice";
import information from '../../../../information.json'
// const baseURL = "https://staging.staging.pk/v1";
const baseURL = information.base_url_api

import { getGeneralApiParams } from '../../../../helpers/ApiHelpers'
import SearchBar from "../SearchBar/SearchBar";

export default function Header(props) {
	const cookies = new Cookies();
    const router = useRouter();

    const [users, setUsers] = useState([]);
    const [text, setText] = useState("");
    const [suggestions, setSuggestions] = useState([]);
	
	const [searchText, setSearchText] = useState('')
    useEffect(()=>{
        console.log(searchText)
    }, [searchText])
	const [searchResults, setSearchResults] = useState([])

	const searchHandler = async (searchTerm) => {
        let {city, userId, headers} = getGeneralApiParams()
        let url = baseURL + '/catalog/products/search?page=1&size=20&term=' + searchTerm + '&category=&city=' + city + '&lang=en&userid=' + userId + '&client_type=apricart'
		let searchResponse = await axios.get(
            url,
            {
                'headers': headers
            }
		)
        console.log(searchResponse)
	}

    function inputData(e) {
        e.preventDefault();
    }
    // let logindata;
    //   //Login/Welcome condition
    //   if(isLoggedIn()){
    //     logindata =true
    // }
    // else{
    //   logindata = false

    // }

    const [user, setAuthenticated] = useState(false);

    const login = () => {
        setAuthenticated(true);
    };

    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     const name = localStorage.getItem('name')
    //     if (token) {
    //         setAuthenticated(true);
    //     } else if (token === null) {
    //         setAuthenticated(false);
    //     }

    //     return () => {};
    // }, []);
    // const handleSubmit = (e) => {
    //   localStorage.removeItem("token");
    // };

    const [homeprofile, setHomeprofile] = useState([]);

    var messsage = cookies.get("cookies-message");
    var token = cookies.get("cookies-token");
    console.log(token);
    var name = cookies.get("cookies-name");
    var userId = cookies.get("cookies-userId");
    console.log(userId);

    // if (messsage == 'success')
    // {
    //   const getHomeprofile = async () => {
    //     const response = await axios.get(`https://staging.apricart.pk/v1/home/profile`
    //     );
    //     setHomeprofile(response.data.data.name);
    //     // const msg = response.data.total;
    //     // if(msg === 'Success')
    //     // console.log("response login", response.data.total);
    //   };
    //   useEffect(() => {
    //     getHomeprofile();

    //   }, []);

    // }

    useEffect(() => {
        if (token) {
            setAuthenticated(true);
        }
        return () => {
            token;
        };
    }, []);
    // const handleSubmit = (e) => {
    //   localStorage.removeItem("token");
    // };

    //   function handleSubmit(){
    //  //   cookies.remove('token');
    //    // cookies.remove('name');
    //   // cookies.remove(cookies.get('cookies-token'));
    //   // cookies.remove(cookies.get('cookies-name'));
    //   var allCookies = document.cookie.split(';');

    //   // The "expire" attribute of every cookie is
    //   // Set to "Thu, 01 Jan 1970 00:00:00 GMT"
    //   for (var i = 0; i < allCookies.length; i++)
    //       document.cookie = allCookies[i] + "=;expires="
    //       + new Date(0).toUTCString();

    //   displayCookies.innerHTML = document.cookie;

    //   }

    const logout = () => {
        cookies.remove("cookies-token");
        localStorage.clear();
        setAuthenticated(false);
        router.push("/");
    };

    const Links = user ? (
        <li className="nav-item">
            <div className="dropdown">
                <button
                    className="dropbtn"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    data-bs-whatever="@mdo"
                >
                    {""}
                    <a className="nav-link" href="#">
                        <img
                            src="/assets/images/user.png"
                            className="img-fluid"
                        />
                        {name && <p>Welcome {name}</p>}

                        {/*
            {profile.map((pro) => {
             return(<p>{pro.name}</p>)
           })} */}
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
                {/* <button
          className="dropbtn"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          data-bs-whatever="@mdo"
        >
          {" "}
          <a className="nav-link" href="#">
            <img src="assets/images/user.png" className="img-fluid" />
            Login/Signup
          </a>
        </button> */}
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
                `https://staging.apricart.pk/v1/order/cart/all?city=karachi&lang=en&orderType=pickup`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + cookies.get("cookies-token"),
                    },
                }
            );
            setData(response.data.data);
            let Data1 = response.data.data;
            mydata = Data1;
            console.log("NEW"); //checking data
            console.log(Data1);
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
        <div className="container-fluid hae">
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
                <div className="container-fluid">
                    {/* <Link href="/">
            <a className="navbar-brand">
              <img
                src="/assets/images/logo.png"
                className="img-fluid"
                width="150px;"
              />
            </a>
          </Link> */}

                    <form
                        className="d-flex ms-auto manu_cat"
                        required
                        onSubmit={inputData}
                    >
                        <div className="sidebar-1">
                            <a className="nav-link d-lg-none catagory-style">
                                <CatagoryBtn />
                            </a>
                        </div>
                        <div className=" d-md-none d-lg-none">
                            {/* <button onClick="myFunction()" className="dropbtn">
                Category
              </button> */}
                        </div>
                        <div className="input-group searching_pro">
                            <SearchBar
                                onChange={setSearchText}
                                value={searchText}
                            />
                            <input
                                className="form-control border-0 mr-2"
                                type="search"
                                placeholder="Search Products"
                                aria-label="Search"
                                onChange={(e) =>
                                    onChangeHandler(e.target.value)
                                }
                                value={text}
                                required
                            />

                            <Link href="/search/[id]" as={"/search/" + text}>
                                <button
                                    className="btn btn-primary chane border-0"
                                    type="submit"
                                >
                                    <i
                                        className="fa fa-search"
                                        aria-hidden="true"
                                    ></i>
                                </button>
                            </Link>
                        </div>
                    </form>

                    <div className="cart-header" id="navbar-content">
                        <ul className="navbar-nav mr-auto mb-2 mb-lg-0 float-end">
                            <li className="nav-item">
                                <Link href="/grocery_list">
                                    <a
                                        className="nav-link"
                                        aria-current="page"
                                        href="#"
                                    >
                                        Grocery List
                                    </a>
                                </Link>
                            </li>

                            <li className="nav-item" onClick={wishnotify}>
                                <Link href="/wishlist">
                                    <a className="nav-link" href="#">
                                        {wishList}
                                        Wishlist
                                    </a>
                                </Link>
                            </li>
                            <BtnCart />
                            {cart.length}

                            {Links}
                        </ul>
                    </div>
                </div>
            </nav>
            <div>
                <div className="suggDrop">
                    {suggestions &&
                        suggestions.map((suggestion, i) => (
                            <div key={i} className="suggestion col-md-12">
                                <Link
                                    href="/details/[id]"
                                    as={"/details/" + suggestion.sku}
                                    className="Link-CSS"
                                >
                                    <p onClick={DropSuggestion}>
                                        {suggestion.title}
                                    </p>
                                </Link>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
