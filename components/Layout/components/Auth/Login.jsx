// import Link from "next/link";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import axios from "axios";
// import { useRouter } from "next/router";
// import React, { useEffect, useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Login = () => {
//   const router = useRouter();
//   const [userData, setUserData] = useState({
//     username: "",
//     password: "",
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "https://staging.apricart.pk/v1/auth/open/login",
//         { ...userData }
//       );
//       console.log("Data", response.data);
//       console.log("response login", response.data.message);
//       localStorage.setItem("token", response.data.data.token);

//       router.push("/profile_user");
//       toast.success(response.data.message);
//     } catch (err) {
//       const Error = err.response.data;
//       toast.error(Error.message);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserData({ ...userData, [name]: value });
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="exampleFormControlInput1" className="label-left">
//           Phone
//         </label>
//         <div className="input-group mb-3">
//           <span className="input-group-text" id="inputGroup-sizing-sm">
//             +92
//           </span>
//           <input
//             type="tel"
//             className="form-control"
//             id="exampleFormControlInput1"
//             placeholder=""
//             name="username"
//             onChange={(e) => handleChange(e)}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="recipient-name" className="col-form-label label-left">
//             Password
//           </label>
//           <input
//             type="password"
//             className="form-control"
//             name="password"
//             onChange={(e) => handleChange(e)}
//           />
//         </div>
//         <div className="change_pass_btn">
//           <div className="mb-3">
//             <Link href="/forgot_password" data-bs-dismiss="modal">
//               <a className="btn1" role="button">
//                 Forgot Password
//               </a>
//             </Link>
//           </div>
//           <div className="mb-3">
//             <a href="#">
//             <button className="btn3">Login</button>
//             </a>
//           </div>
//         </div>
//       </form>
//     </>
//   );
// };

// export default Login;

import Link from "next/link";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie";
//import { dispatch } from "react-hot-toast/dist/core/store";
import { cartReducer, Login_Succeed } from "../../../../redux/cart.slice";
import { getGeneralApiParams } from "../../../../helpers/ApiHelpers";
import { base_url_api } from "../../../../information.json";

const login = () => {
    const router = useRouter();
    const cookies = new Cookies();
    const [userData, setUserData] = useState({
        guestuserid:cookies.get("guestUserId"),
        username: "",
        password: "",
       
    });
    let { city ,headers} = getGeneralApiParams();
    console.log(headers);
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);

    const handleSubmit = async () => {  //
       
        let url ="https://staging.apricart.pk/v1/auth/open/login?city=karachi&lang=en"

        try {
            const response = await axios.post(url, { ...userData},{headers:headers});
            console.log(response);
            // console.log("Data", response.data);
            // console.log("response login", response.data.message);
            //  localStorage.setItem("token", response.data.data.token);
            cookies.set("cookies-message", response.data.message);
            cookies.set("cookies-token", response.data.data.token);
            cookies.set("cookies-name", response.data.data.name);
            cookies.set("cookies-email", response.data.data.email);
            cookies.set("cookies-phoneNumber", response.data.data.phoneNumber);
            cookies.set("cookies-userId", response.data.data.userId);
            // console.log(response.data.data.userId);
            // console.log(cart.getstate());
            // dispatch(Login_Succeed(cart.getstate()));
            router.push("/");
            toast.success(response.data.message);
            window.location.reload(false);
        } catch (err) {
            //const Error = err.message;
            toast.error(err.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };
////onSubmit={handleSubmit}
    return (
        <>
            <form >
                <label
                    htmlFor="exampleFormControlInput1"
                    className="label-left"
                >
                    Phone
                </label>
                <div className="input-group mb-3">
                    <span
                        className="input-group-text"
                        id="inputGroup-sizing-sm"
                    >
                        +92
                    </span>
                    <input
                        type="tel"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder=""
                        name="username"
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="recipient-name"
                        className="col-form-label label-left"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className="change_pass_btn">
                    <div className="mb-3">
                        <Link href="/forgot_password" data-bs-dismiss="modal">
                            <a className="btn1" role="button">
                                Forgot Password
                            </a>
                        </Link>
                    </div>
                    <div className="mb-3">
                        <a href="#">
                            <button className="btn3" onClick={()=>{handleSubmit();}} >Login</button>
                        </a>
                    </div>
                </div>
            </form>
        </>
    );
};

export default login;
