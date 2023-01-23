import { useRouter } from "next/router"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"

import TextField from "../components/Layout/components/Input/TextField"
import SubmitButton from "../components/Layout/components/Buttons/SubmitButton"
import ErrorText from "../components/Layout/components/Typography/ErrorText"
import PageHeading from "../components/Layout/components/Typography/PageHeading"
import HeadTag from "../components/Layout/components/Head/HeadTag"
import { useLoginApi, useResetPasswordApi, useSendOtpApi, useVerifyOtpApi } from "../helpers/Api"

export default function Login() {
    const router = useRouter();

    const [viewState, setViewState] = useState('login')
    let sharedPhoneNumber = useRef('')

    const Login = () => {
        const { isLoading, response, errorMessage, errorResponse, setData, setIsLogin } = useLoginApi()

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

        useEffect(() => {
            if (errorResponse) {
                if (errorResponse?.data?.status === 1010) {
                    setViewState('verify')
                }
            }
        }, [errorResponse])

        return (
            <div
                className="flex justify-center w-full animate-dropdown"
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        if (!buttonDisabled) {
                            setData({
                                "username": phoneNumber,
                                "password": password
                            })
                            sharedPhoneNumber.current = phoneNumber
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
                                    "username": phoneNumber,
                                    "password": password
                                })
                                sharedPhoneNumber.current = phoneNumber
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
                sharedPhoneNumber.current = phoneNumber
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

    const Verify = () => {
        const { isLoading, response, errorMessage, setData, setIsVerifyOtp } = useVerifyOtpApi()

        const [otp, setOtp] = useState('')
        const [isButtonDisabled, setIsButtonDisabled] = useState(true)

        useEffect(() => {
            if (otp.length === 4) {
                setIsButtonDisabled(false)
            }
            else {
                setIsButtonDisabled(true)
            }
        }, [otp])

        useEffect(() => {
            if (response) {
                // setViewState('login')
                router.push('/')
            }
        }, [response])

        return (
            <div className="flex justify-center w-full animate-dropdown">
                <div className="flex flex-col p-8 space-y-6 lg:w-1/3 items-center align-center bg-slate-100 shadow rounded-3xl">
                    <PageHeading
                        text={"VERIFY NUMBER"}
                    />
                    <div className="space-y-2">
                        <div className="flex space-x-2 w-full justify-center">
                            <p className="font-nunito">
                                OTP sent to +92{sharedPhoneNumber.current}
                            </p>
                            <button
                                className="font-nunito underline"
                                onClick={() => {
                                    setViewState('login')
                                }}
                            >
                                Wrong number?
                            </button>
                        </div>
                        <TextField
                            label={"OTP"}
                            placeHolder={"Enter OTP"}
                            onChange={setOtp}
                            value={otp}
                            type='number'
                        />
                    </div>
                    <div className="w-3/4">
                        <SubmitButton
                            text={"VERIFY"}
                            onClick={() => {
                                setData({
                                    "phoneNumber": sharedPhoneNumber.current,
                                    "otp": otp,
                                })
                                setIsVerifyOtp(true)
                            }}
                            disabled={isButtonDisabled || isLoading}
                        />
                    </div>
                    <ErrorText
                        text={errorMessage}
                    />
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
                setViewState('login')
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
                                OTP sent to +92{sharedPhoneNumber.current}
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
                                    "phoneNumber": sharedPhoneNumber.current,
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
            {viewState === 'verify' && (
                <Verify />
            )}
        </div>
    )
}