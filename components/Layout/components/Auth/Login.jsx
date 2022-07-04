import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Cookies from "universal-cookie";
import { getGeneralApiParams } from "../../../../helpers/ApiHelpers";
import { base_url_api } from "../../../../information.json";
import TextField from '../Input/TextField'
import SubmitButton from '../Buttons/SubmitButton'
import ErrorText from '../Typography/ErrorText'

export default function Login(){
    const router = useRouter();
    const cookies = new Cookies();
<<<<<<< HEAD
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
=======

    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const loginApi = async () => {
        let { city, headers, userId} = getGeneralApiParams();
        let url = base_url_api + "/auth/open/login?city=" + city + "&lang=en&client_type=apricart"
        let body = {
            "guestuserid": userId,
            "username": '92' + phoneNumber,
            "password": password
        }

        try {
            let response = await axios.post(url, body,
                {
                    headers: headers
                }
            )
            
            if(response.data.status == 1){
                cookies.set("cookies-message", response.data.message)
                cookies.set("cookies-token", response.data.data.token)
                cookies.set("cookies-name", response.data.data.name)
                cookies.set("cookies-email", response.data.data.email)
                cookies.set("cookies-phoneNumber", response.data.data.phoneNumber)
                cookies.set("cookies-userId", response.data.data.userId)
                setErrorMessage('')
                router.reload()
            }
            else{
                setErrorMessage(response.data.message)
            }
>>>>>>> 51e8136e3110fc4ad1e6f53a91d3c733d108854a
        } catch (err) {
            setErrorMessage(err.response.data.message)
        }
    }

    const onEnterPress = async (e)=>{
        console.log("pressed")
        if(e.key === 'Enter'){
            await loginApi()
        }
    }

    return (
<<<<<<< HEAD
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
=======
        <div onKeyDown={onEnterPress}>
            <div>
                <TextField
                    label={"Phone Number"}
                    placeHolder={"3301234567"}
                    onChange={setPhoneNumber}
                    value={phoneNumber}
                    type={'number'}
                />
                <TextField
                    label={"Password"}
                    placeHolder={"password"}
                    onChange={setPassword}
                    value={password}
                    type={'password'}
                />
            </div>
            <div>
                <SubmitButton
                    text={"LOGIN"}
                    onClick={loginApi}
                />
                <ErrorText
                    text={errorMessage}
                />
            </div>
        </div>
    )
}
>>>>>>> 51e8136e3110fc4ad1e6f53a91d3c733d108854a
