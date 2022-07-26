import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"
import Link from "next/link"
import Cookies from "universal-cookie"
import { getGeneralApiParams } from "../helpers/ApiHelpers"
import { base_url_api } from '../information.json'
import TextField from "../components/Layout/components/Input/TextField"
import SubmitButton from "../components/Layout/components/Buttons/SubmitButton"
import ErrorText from "../components/Layout/components/Typography/ErrorText"
import PageHeading from "../components/Layout/components/Typography/PageHeading"
import HeadTag from "../components/Layout/components/Head/HeadTag"
import { toast } from "react-toastify";
export default function Register(){
    const router = useRouter();
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [otp, setotp] = useState();
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
    })
    const [showOTPScreen, setShowOTPScreen] = useState(false)
    const [otpCode, setOtpCode] = useState("")

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let Data={
        "name":name,
        "phoneNumber":phoneNumber,
        "email":email ,
        "password":password 
    }
    const handleSubmit = async (e) => {
       // e.preventDefault();
      
        try {
            let { userId, headers } = getGeneralApiParams();
            let url = base_url_api + "/auth/open/register?city=karachi&lang=en";
            // let body = {
            //     ...userData,
            //     guestuserid: userId,
            // }
            let body = {
                "email":email ,
                "name":name,
                "phoneNumber": '92' + phoneNumber,
                "password": password,
                "guestuserid": userId,
                
            }
            console.log(body)
            const response = await axios.post(url, body, {
                headers: headers,
            });
            toast.success(response.data.message);
            setShowOTPScreen(true);
            // setCookie("register");
            // setCookie("token", response.data.data.token, { path: "/address" });
        } catch (err) {
            //const Error = err.response.data;
            console.log(err);
            toast.error(err.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };
    const onEnterPress = async (e) => {
        if (e.key === 'Enter') {
            await handleSubmit()
        }
    }
    const otpCodeApiHandler = async (code) => {
        let { headers } = getGeneralApiParams();

        let url = base_url_api + "/auth/open/otp/verify";
        let body = {
            phoneNumber: "92" + phoneNumber,
            otp: code,
        };
        try {
            let response = await axios.post(url, body, {
                headers: headers,
            });
            router.push("/");
            toast.success(response.data.message);
        } catch (error) {
            console.log(error);
            toast.error(error)
        }
    };

    return (
        <>
        <HeadTag title={'Register'} />
        {showOTPScreen ? (
        <div className='flex flex-row justify-center w-full'>
           
                <div className='bg-slate-100 p-8 shadow rounded-3xl'>
                    <p>Check 0{phoneNumber} for otp code</p>
                    <TextField
                                label={"otp"}
                                placeHolder={"OTP"}
                                onChange={setotp}
                                value={otp}
                                type={'number'}
                            />
                    {/* <input
                        type={"number"}
                        value={otpCode}
                        onChange={(e) => {
                            setOtpCode(e.target.value);
                        }}
                    /> */}
                    <SubmitButton
                                text={"Register"}
                                onClick={() => {
                                    otpCodeApiHandler(otp);
                                }}
                            />
                    {/* <button
                        onClick={() => {
                            otpCodeApiHandler(otp);
                        }}
                    >
                        Verify OTP
                    </button> */}
                </div>
                </div>
            ) : (
                 
                <div>
                <div className="flex justify-center w-full" onKeyDown={onEnterPress}    >
                    <div className="flex flex-col p-8 space-y-6 lg:w-1/3 items-center align-center bg-slate-100 shadow rounded-3xl">
                        <PageHeading
                            text={"Register"}
                        />
                        <div className="space-y-2">
                        <TextField
                                label={"Name"}
                                placeHolder={"name"}
                                onChange={setname}
                                value={name}
                                type={'String'}
                            />
                             <TextField
                                label={"Email"}
                                placeHolder={"Email"}
                                onChange={setemail}
                                value={email}
                                type={'String'}
                            />
                            <TextField
                                label={"Phone Number"}
                                placeHolder={"3301234567"}
                                onChange={setPhoneNumber}
                                value={phoneNumber}
                                type={'number'}
                            />
                            <TextField
                                label={"New Password"}
                                placeHolder={"password"}
                                onChange={setPassword}
                                value={password}
                                type={'password'}
                            />
                           
                        </div>
                        <div className="w-3/4">
                            <SubmitButton
                                text={"Register"}
                                onClick={handleSubmit}
                            />
                        </div>
                        <ErrorText
                            text={errorMessage}
                        />

                    </div>
                </div>
            </div>
           
            )
        }

       
        </>
    )
}