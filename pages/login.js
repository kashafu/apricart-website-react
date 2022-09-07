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
import { useLoginApi, useResetPasswordApi, useSendOtpApi } from "../helpers/Api"
import { useEffect } from "react"

export default function Login() {
    const router = useRouter();
    let { city, headers, userId } = getGeneralApiParams();

    const [viewState, setViewState] = useState('login')
    const [sharedPhoneNumber, setSharedPhoneNumber] = useState()

    const [errorMessage, setErrorMessage] = useState('')
    const [resetpwdScreen, setresetpwdcreen] = useState(false);

    // const resetPasswordApi = async () => {
    //     let url = base_url_api + "/auth/open/password/forgot?lang=en&client_type=apricart"
    //     let body = {
    //         "phoneNumber": '92' + phoneNumber,
    //         "password": password,
    //         "otp": otp
    //     }
    //     try {
    //         let response = await axios.post(url, body,
    //             {
    //                 headers: headers
    //             }
    //         )
    //         if (response.data.status == 1) {
    //             toast.success(response.data.message);
    //             setresetpwdcreen(false);
    //         }
    //     }
    //     catch (error) {
    //         console.log(error?.response)
    //         toast.error(error?.response?.message)
    //     }

    // }

    const Login = () => {
        const { isLoading, response, errorMessage, setData, setIsLogin } = useLoginApi()

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

        useEffect(() => {
            if (response) {
                router.push('/')
            }
        }, [response])

        return (
            <div
                className="flex justify-center w-full animate-dropdown"
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        if (!buttonDisabled) {
                            setIsLogin(true)
                        }
                    }
                }}
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
                                setData({
                                    "guestuserid": userId,
                                    "username": phoneNumber,
                                    "password": password
                                })
                                setIsLogin(true)
                            }}
                            disabled={buttonDisabled || isLoading}
                        />
                    </div>
                    <ErrorText
                        text={errorMessage}
                    />
                    <button
                        className="underline"
                        onClick={() => {
                            setViewState('otp')
                        }}
                    >
                        Reset Password
                    </button>
                    <div className="flex flex-row space-x-2">
                        <p className="font-nunito">
                            Don't have an Account?
                        </p>
                        <Link href="/register" passHref>
                            <a className="font-nunito underline">
                                Sign Up
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    const Otp = () => {
        const { response, errorMessage, isLoading, setIsSendOtp, setPhoneNumber: setOTPPhoneNumber } = useSendOtpApi()

        const [phoneNumber, setPhoneNumber] = useState('')
        const [buttonDisabled, setButtonDisabled] = useState(true)

        useEffect(() => {
            if (phoneNumber.length === 10) {
                setButtonDisabled(false)
            }
            else {
                setButtonDisabled(true)
            }
        }, [phoneNumber])

        useEffect(() => {
            if (response) {
                setSharedPhoneNumber(phoneNumber)
                setViewState('reset')
            }
        }, [response])

        return (
            <div className="flex justify-center w-full animate-dropdown">
                <div className="flex flex-col p-8 space-y-6 lg:w-1/3 items-center align-center bg-slate-100 shadow rounded-3xl">
                    <PageHeading
                        text={"OTP"}
                    />
                    <div className="space-y-2">
                        <TextField
                            label={"Phone Number"}
                            placeHolder={"3301234567"}
                            customOnChange
                            onChange={(e) => {
                                setPhoneNumber(e.target.value)
                            }}
                            value={phoneNumber}
                            type={'number'}
                        />
                    </div>
                    <div className="w-3/4">
                        <SubmitButton
                            text={"Send OTP"}
                            onClick={() => {
                                setOTPPhoneNumber(prev => phoneNumber)
                                setIsSendOtp(true)
                            }}
                            disabled={buttonDisabled || isLoading}
                        />
                    </div>
                    <ErrorText
                        text={errorMessage}
                    />
                    <button
                        className="font-nunito underline"
                        onClick={() => {
                            setViewState('login')
                        }}
                    >
                        Go back to login
                    </button>
                </div>
            </div>
        )
    }

    const ResetPassword = () => {
        const { response, setData, setIsSendOtp, isLoading, errorMessage } = useResetPasswordApi()

        const [newPassword, setNewPassword] = useState('')
        const [otp, setotp] = useState('')
        const [buttonDisabled, setButtonDisabled] = useState(true)

        useEffect(() => {
            if (newPassword.length > 0 && otp.length === 4) {
                setButtonDisabled(false)
            }
            else {
                setButtonDisabled(true)
            }
        }, [newPassword, otp])

        useEffect(() => {
            if (response) {
                setSharedPhoneNumber(phoneNumber)
                setViewState('reset')
            }
        }, [response])

        return (
            <div className="flex justify-center w-full animate-dropdown">
                <div className="flex flex-col p-8 space-y-6 lg:w-1/3 items-center align-center bg-slate-100 shadow rounded-3xl">
                    <PageHeading
                        text={"RESET PASSWORD"}
                    />
                    <div className="space-y-2">
                        <div className="flex space-x-2 w-full justify-center">
                            <p className="font-nunito">
                                OTP sent to +92{sharedPhoneNumber}
                            </p>
                            <button
                                className="font-nunito underline"
                                onClick={() => {
                                    setViewState('otp')
                                }}
                            >
                                Wrong number?
                            </button>
                        </div>
                        <TextField
                            label={"New Password"}
                            placeHolder={"new password"}
                            onChange={setNewPassword}
                            value={newPassword}
                            type={'password'}
                            autoComplete='new-password'
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
                            onClick={() => {
                                setData({
                                    "phoneNumber": sharedPhoneNumber,
                                    "password": newPassword,
                                    "otp": otp
                                })
                                setIsSendOtp(true)
                            }}
                            disabled={buttonDisabled || isLoading}
                        />
                    </div>
                    <ErrorText
                        text={errorMessage}
                    />
                </div>
            </div>
        )
    }

    return (
        <div>
            <HeadTag title={'Login'} />
            {viewState === 'login' && (
                <Login />
            )}
            {viewState === 'reset' && (
                <ResetPassword />
            )}
            {viewState === 'otp' && (
                <Otp />
            )}
        </div>
    )
}