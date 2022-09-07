import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"
import Link from "next/link"
import { setCookie } from "../helpers/Cookies"
import { getGeneralApiParams } from "../helpers/ApiHelpers"
import { base_url_api } from '../information.json'
import TextField from "../components/Layout/components/Input/TextField"
import SubmitButton from "../components/Layout/components/Buttons/SubmitButton"
import ErrorText from "../components/Layout/components/Typography/ErrorText"
import PageHeading from "../components/Layout/components/Typography/PageHeading"
import HeadTag from "../components/Layout/components/Head/HeadTag"
import { toast } from "react-toastify";
import { useLoginApi } from "../helpers/Api"
import { useEffect } from "react"

export default function Login() {
    const router = useRouter();
    let { city, headers, userId } = getGeneralApiParams();

    const [errorMessage, setErrorMessage] = useState('')
    const [resetpwdScreen, setresetpwdcreen] = useState(false);
    const [otp, setotp] = useState();

    const loginApi = async () => {
        let url = base_url_api + "/auth/open/login?city=" + city + "&lang=en&client_type=apricart&userid=" + userId
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
                setCookie("cookies-token", response.data.data.token)
                setCookie("cookies-name", response.data.data.name)
                setCookie("cookies-email", response.data.data.email)
                setCookie("cookies-phoneNumber", response.data.data.phoneNumber)
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

    const Login = () => {
        const { isLoading: loginIsLoading, response: loginResponse, errorMessage: loginErrorMessage, setData: setLoginData, setIsLogin } = useLoginApi()

        const [phoneNumber, setPhoneNumber] = useState('')
        const [password, setPassword] = useState('')
        const [buttonDisabled, setButtonDisabled] = useState(true)

        useEffect(() => {
            if (phoneNumber.length === 10 && password.length > 0) {
                setButtonDisabled(false)
            }
            else {
                setButtonDisabled(true)
            }
        }, [phoneNumber, password])

        const onEnterPress = async (e) => {
            if (e.key === 'Enter') {
                await loginApi()
            }
        }

        return (
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
                            onClick={() => {
                                setLoginData({
                                    "guestuserid": userId,
                                    "username": '92' + phoneNumber,
                                    "password": password
                                })
                                setIsLogin(true)
                            }}
                            disabled={buttonDisabled}
                        />
                    </div>
                    <ErrorText
                        text={loginErrorMessage}
                    />
                    <button
                        onClick={sendOtpApi}
                    >
                        Reset Password
                    </button>
                    <div className="flex flex-row space-x-2">
                        <p>
                            Don't have an Account?
                        </p>
                        <Link href="/register" passHref>
                            <a>Sign Up</a>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="animate-dropdown">
            <HeadTag title={'Login'} />
            {resetpwdScreen ? (
                <div className="flex justify-center w-full"
                // onKeyDown={onEnterPress}
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
                <Login />)
            }
        </div>
    )
}