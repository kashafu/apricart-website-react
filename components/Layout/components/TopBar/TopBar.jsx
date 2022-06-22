import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Image from "next/image";
import Popup from "../Popup/Popup";
import Cookies from "universal-cookie";
let base_url_api = "https://staging.apricart.pk/v1";

// IMAGES
import bikePNG from "../../../../public/assets/images/bike.png";

export default function Layout() {
    const cookies = new Cookies();

    console.log(cookies.get("cities"));

    // if (cookies.get("cities") == "undefined") {
    //   cookies.set("cities", "karachi");
    // }

    const [users, setUsers] = useState([]);
    const [getcity, setcity] = useState(
        cookies.get("cities") == null ? "karachi" : cookies.get("cities")
    );

    const getPopularitems = async () => {
        const response = await axios.get(
            base_url_api + "/home/address/cities?lang=en&client_type=apricart"
        );
        setUsers(response.data.data);
    };

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

    useEffect(() => {
        getPopularitems();
        if (cookies.get("cities") == null) {
            cookies.set("cities", "karachi");
            getLocation();
        }
    }, []);

    const [user, setUser] = useState([]);
    const getTicker = async () => {
        const response = await axios.get(
            `https://staging.apricart.pk/v1/home/all?client_lat=34.02910146301811&client_long=71.63761019869207&city=${cookies.get(
                "cities"
            )}&lang=en&userid=abc123&web=true`
        );
        setUser(response.data.data.ticker);
    };
    useEffect(() => {
        getTicker();
    }, []);

    const [isOpen, setIsOpen] = useState(false);

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
        // window.location.reload();
        // console.log("SELECTED CITY IS " + e.target.value + " AND SETTING COOKIE")
        // cookies.set("cities", e.target.value);
    };
    // console.log(getcity);
    // cookies.set("cities", getcity);

    let checkcity = cookies.get("cities");

    return (
        // Topbar Start
        <header className="main_header">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-sm-12  col-md-12  col-lg-4  col-xl-4  col-xxl-4">
                        <div className="delivery">
                            <ul>
                                <li className="deliver">
                                    <a href="#">
                                        <img
                                            src="assets/images/bike.png"
                                            className="img-fluid"
                                        />
                                        Fast & Free Delivery
                                    </a>
                                </li>
                                <li onClick={togglePopup}>
                                    <a href="#">
                                        <img
                                            src="assets/images/location.png"
                                            className="img-fluid"
                                        />{" "}
                                        {/* <span className="capitalize-class"> {checkcity}</span> */}
                                        <span className="capitalize-class">
                                            {" "}
                                            {getcity}
                                        </span>
                                    </a>
                                </li>
                                <li className="bos">
                                    {" "}
                                    <a href="#">English</a>
                                </li>
                                {/* <li className="text-center">
                                    <h3>
                                        <div className="ticker">
                                        <a className="inTicker">{user}</a>
                                        </div>
                                    </h3>
                                
                                    </li> 
                                */}
                            </ul>
                        </div>
                        {isOpen && (
                            <Popup
                                content={
                                    <>
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
                                                        checked={
                                                            getcity ===
                                                            "peshawar"
                                                        }
                                                        onChange={handleCity}
                                                    />
                                                    Peshawar
                                                </div>
                                            </div>
                                            <>
                                                {/* {users.map((curElem) => {
                        const { id, city } = curElem;
                        console.log(curElem);
                        return (
                          <>
                            <div className="radio" key={id}>
                              <label>
                                <input
                                  type="radio"
                                  value={city}
                                  name="one"
                                  checked={getcity === {city}}
                                  
                                   onChange={handleCity}
                                />
                                {city}
                              </label>
                            </div>
                          </>
                        );
                      })} */}
                                            </>

                                            <Button
                                                type="submit"
                                                onClick={closeButton}
                                            >
                                                Submit
                                            </Button>
                                        </form>
                                    </>
                                }
                                handleClose={togglePopup}
                            />
                        )}
                    </div>
                    <div className="col-5 col-sm-5  col-md-5  col-lg-5  col-xl-5  col-xxl-5">
                        <div className="text-center">
                            <h3>
                                <div className="ticker">
                                    <a className="inTicker">{user}</a>
                                </div>
                            </h3>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12  col-md-3  col-lg-3  col-xl-3  col-xxl-3">
                        <div className="head_phone deliver">
                            <a href="#">
                                <img
                                    src="assets/images/phone.png"
                                    className="img-fluid"
                                />{" "}
                                0304-1110195
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
