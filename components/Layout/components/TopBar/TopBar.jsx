import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Image from "next/image";
import Link from 'next/link'
import Popup from "../Popup/Popup";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";
import { getGeneralApiParams } from "../../../../helpers/ApiHelpers";

// IMAGES
// import bikePNG from "../../../../public/assets/images/bike.png";
import locationPinPNG from "../../../../public/assets/images/location.png";
import phonePNG from "../../../../public/assets/images/phone.png";
import logoPNG from '../../../../public/assets/images/logo.png'

export default function Layout() {
    const cookies = new Cookies()
    const router = useRouter()

    let pStyle = "font-lato font-bold text-sm lg:text-md text-black lg:text-base"
    // let divIconStyle = "relative w-[15px] h-[15px] lg:w-[22px] lg:h-[22px]" 

    // TODO USE REDUX TO FETCH
    let { selectedAddress, city } = getGeneralApiParams()

    const [getcity, setcity] = useState(city)
    const [currentSelectedAddress, setCurrentSelectedAddress] = useState(selectedAddress)
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (cookies.get("cities") == null) {
            cookies.set("cities", "karachi");
            getLocation();
        }
        console.log(currentSelectedAddress);
    }, []);

    const getLocation = () => {
        if (!navigator.geolocation) {
            return;
        }

        navigator.geolocation.getCurrentPosition((position) => {
            let latitude, longitude;
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            // KARACHI
            let karachiCoords = {
                top: [25.633730508113278, 67.36401298889072],
                bottom: [24.806311517712324, 67.18548517144208],
                left: [24.83871833773748, 66.65264830090317],
                right: [25.139943073700493, 67.64691091500156],
            };

            if (
                latitude <= karachiCoords.top[0] &&
                latitude >= karachiCoords.bottom[0] &&
                longitude <= karachiCoords.right[1] &&
                longitude >= karachiCoords.left[1]
            ) {
                setcity("karachi");
                cookies.set("cities", "karachi");
                return;
            }

            // PESHAWAR
            let peshawarCoords = {
                top: [34.1040966916378, 71.56477299064852],
                bottom: [33.856413627696355, 71.52769413625535],
                left: [33.99144768127041, 71.38281194594128],
                right: [34.025599547506026, 71.75909365348681],
            };

            if (
                latitude <= peshawarCoords.top[0] &&
                latitude >= peshawarCoords.bottom[0] &&
                longitude <= peshawarCoords.right[1] &&
                longitude >= peshawarCoords.left[1]
            ) {
                setcity("peshawar");
                cookies.set("cities", "peshawar");
                return;
            }
        });
    };

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };
    
    const closeButton = () => {
        setIsOpen(!isOpen);
        window.location.reload();
    };

    const handleCity = (event) => {
        setcity(event.target.value);
        cookies.set("cities", event.target.value);
    };

    const submitCities = (e) => {
        e.preventDefault();
        setcity(e.target.value);
    };

    return (
        <header className="flex flex-row w-screen bg-main-yellow lg:justify-between p-6 items-center h-[70px]">
            <div className="flex flex-row items-center justify-between">
                {/* APRICART LOGO */}
                <div className="relative min-w-[100px] w-1/6 lg:hidden">
                    <Link href={"/"} passHref>
                        <button className="flex">
                            <Image
                                src={logoPNG}
                                alt={"logo"}
                                // layout={'fill'}
                            />
                        </button>
                    </Link>
                </div>
                {/* DELIVERY */}
                {/* <div className="hidden lg:inline-flex flex flex-row space-x-2 items-center">
                    <div className="relative w-[15px] h-[15px] lg:w-[22px] lg:h-[22px]">
                        <Image 
                            src={bikePNG} 
                            alt={"bike icon"}
                            layout={"fill"}
                        />
                    </div>
                    <p className={pStyle}>
                        Fast Delivery
                    </p>
                </div> */}
                <div className="flex flex-row space-x-4 lg:space-x-12 items-center">
                    {/* LOCATION */}
                    <div>
                        <button 
                            className="flex flex-row space-x-2 items-center"
                            onClick={togglePopup}
                        >
                            <div className="relative w-[12px] h-[15px] lg:w-[19px] lg:h-[22px]">
                                <Image 
                                    src={locationPinPNG} 
                                    alt={"location icon"}
                                    layout={'fill'} 
                                />
                            </div>
                            <p className={pStyle + " capitalize"}>
                                {getcity}
                            </p>
                        </button>
                    </div>
                    {/* CURRENT SELECTED ADDRESS */}
                    <div className={pStyle + " capitalize flex flex-row space-x-2"}>
                        <button onClick={()=>{
                            router.push('/address')
                        }}>
                            {currentSelectedAddress ? (
                                <p>
                                    {currentSelectedAddress.area}
                                </p>
                            ):(
                                <p className="truncate">
                                    Select Delivery Address
                                </p>
                            )}
                        </button>
                    </div>
                    {/* LANGUAGE */}
                    {/* <div>
                        <p className={pStyle}>
                            English
                        </p>
                    </div> */}
                </div>
            </div>
            {/* PHONE NUMBER */}
            <div className="flex flex-row space-x-2 items-center hidden lg:inline-flex">
                <div className="relative w-[15px] h-[15px] lg:w-[22px] lg:h-[22px]">
                    <Image 
                        src={phonePNG} 
                        alt={"phone icon"}
                        layout={'fill'} 
                    />
                </div>
                <p className={pStyle}>
                    0304-1110195
                </p>
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
                                            checked={
                                                getcity ===
                                                "karachi"
                                            }
                                            onChange={
                                                handleCity
                                            }
                                        />
                                        Karachi
                                    </div>
                                    <div className="freehome_title">
                                        <input
                                            className="radiobtn"
                                            type="radio"
                                            name="cities"
                                            value="peshawar"
                                            checked={
                                                getcity ===
                                                "peshawar"
                                            }
                                            onChange={
                                                handleCity
                                            }
                                        />
                                        Peshawar
                                    </div>
                                </div>
                                <Button
                                 className="bg-sky-600 w-[75px] rounded-full hover:bg-sky-700"
                                    type="submit"
                                    onClick={closeButton}
                                >
                                    Submit
                                </Button>
                            </form>
                        }
                        handleClose={togglePopup}
                    />
                    
                </div>
            )}
        </header>
    );
}
