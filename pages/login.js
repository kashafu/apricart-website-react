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

export default function Login() {
    const router = useRouter();
    const cookies = new Cookies();
    let { city, headers, userId } = getGeneralApiParams();

    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [resetpwdScreen, setresetpwdcreen] = useState(false);
    const [otp, setotp] = useState();

    const loginApi = async () => {
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

            if (response.data.status == 1) {
                cookies.set("cookies-message", response.data.message)
                cookies.set("cookies-token", response.data.data.token)
                cookies.set("cookies-name", response.data.data.name)
                cookies.set("cookies-email", response.data.data.email)
                cookies.set("cookies-phoneNumber", response.data.data.phoneNumber)
                cookies.set("cookies-userId", response.data.data.userId)
                setErrorMessage('')
                router.push('/')
            }
            else {
                setErrorMessage(response.data.message)
            }
        } catch (err) {
            setErrorMessage(err.response.data.message)
        }
    }

    const resetPasswordApi = async () => {
        let url = base_url_api + "/auth/open/password/forgot?lang=en&client_type=apricart"
        let body = {
            "phoneNumber": '92' + phoneNumber,
            "password": password,
            "otp": otp
        }
        try {
            let response = await axios.post(url, body,
                {
                    headers: headers
                }
            )
            if (response.data.status == 1) {
                toast.success(response.data.message);
                setresetpwdcreen(false);
            }
        }
        catch (error) {
            console.log(error?.response)
            toast.error(error?.response?.message)
        }

    }

    const sendOtpApi = async () => {
        const url = base_url_api + "/auth/open/otp"
        let body = {
            "phoneNumber": '92' + phoneNumber
        }
        try {
            let response = await axios.post(url, body,
                {
                    headers: headers
                }
            )
            if (response.data.status == 1) {
                setresetpwdcreen(true);
                toast.success(response.data.message);
            }
            else {
                toast.error(response.data.message);
                toast.error("enter a phone number for otp request to reset password")
            }

        }
        catch (e) {
            console.log(e)
        }

    }

    const onEnterPress = async (e) => {
        if (e.key === 'Enter') {
            await loginApi()
        }
    }

    return (
        <>
            <HeadTag title={'Login'} />
            {resetpwdScreen ? (
                <div className="flex justify-center w-full"
                    onKeyDown={onEnterPress}
                >
                    <div className="flex flex-col p-8 space-y-6 lg:w-1/3 items-center align-center bg-slate-100 shadow rounded-3xl">
                        <PageHeading
                            text={"LOGIN"}
                        />
                        <div className="space-y-2">
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
                            <TextField
                                label={"OTP"}
                                placeHolder={"OTP"}
                                onChange={setotp}
                                value={otp}
                                type={'number'}
                            />
                        </div>
                        <div className="w-3/4">
                            <SubmitButton
                                text={"Reset Password"}
                                onClick={resetPasswordApi}
                            />
                        </div>
                        <ErrorText
                            text={errorMessage}
                        />

                    </div>
                </div>
            ) : (
                <div
                    className="flex justify-center w-full"
                    onKeyDown={onEnterPress}
                >
                    <div className="flex flex-col p-8 space-y-6 lg:w-1/3 items-center align-center bg-slate-100 shadow rounded-3xl">
                        <PageHeading
                            text={"LOGIN"}
                        />
                        <div className="space-y-2">
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
                        <div className="w-3/4">
                            <SubmitButton
                                text={"LOGIN"}
                                onClick={loginApi}
                            />
                        </div>
                        <ErrorText
                            text={errorMessage}
                        />
                        <p> <button onClick={sendOtpApi}>Reset Password</button></p>
                        <p>Don't have an Account ?  <Link href="/register" passHref>
                            <a>Sign Up</a>
                        </Link> </p>
                    </div>
                </div>)
            }
        </>
    )
}