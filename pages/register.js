import { useRouter } from "next/router"
import { useState, useEffect, useRef } from "react"

import TextField from "../components/Layout/components/Input/TextField"
import SubmitButton from "../components/Layout/components/Buttons/SubmitButton"
import ErrorText from "../components/Layout/components/Typography/ErrorText"
import PageHeading from "../components/Layout/components/Typography/PageHeading"
import HeadTag from "../components/Layout/components/Head/HeadTag"
import { useRegisterApi, useVerifyOtpApi } from "../helpers/Api"

export default function Register() {
    const router = useRouter();

    let sharedPhoneNumber = useRef('')
    const [viewState, setViewState] = useState('register')

    const Register = () => {
        const { isLoading, response, errorMessage, setData, setIsRegister } = useRegisterApi()

        const [name, setname] = useState('');
        const [email, setemail] = useState('');
        const [phoneNumber, setPhoneNumber] = useState('')
        const [password, setPassword] = useState('')
        const [isButtonDisabled, setIsButtonDisabled] = useState(true)

        useEffect(() => {
            if (name.length == 0 || email.length == 0 || password.length == 0 || phoneNumber.length != 10) {
                setIsButtonDisabled(true)
            }
            else {
                setIsButtonDisabled(false)
            }
        }, [name, email, phoneNumber, password])

        useEffect(() => {
            if (response) {
                setViewState('verify')
            }
        }, [response])

        return (
            <div
                className="flex justify-center w-full animate-dropdown"
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        if (!isButtonDisabled) {
                            setData({
                                "email": email,
                                "name": name,
                                "phoneNumber": phoneNumber,
                                "password": password,
                            })
                            sharedPhoneNumber.current = phoneNumber
                            setIsRegister(true)
                        }
                    }
                }}
            >
                <div className="flex flex-col p-8 space-y-6 lg:w-1/3 items-center align-center bg-slate-100 shadow rounded-3xl">
                    <PageHeading
                        text={"REGISTER"}
                    />
                    <div className="space-y-2">
                        <TextField
                            label={"Name"}
                            placeHolder={"Enter Name"}
                            onChange={setname}
                            value={name}
                        />
                        <TextField
                            label={"Email"}
                            placeHolder={"Enter Email"}
                            onChange={setemail}
                            value={email}
                        />
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
                            text={"REGISTER"}
                            onClick={() => {
                                setData({
                                    "email": email,
                                    "name": name,
                                    "phoneNumber": phoneNumber,
                                    "password": password,
                                })
                                sharedPhoneNumber.current = phoneNumber
                                setIsRegister(true)
                            }}
                            disabled={isButtonDisabled || isLoading}
                        />
                    </div>
                    <ErrorText
                        text={errorMessage}
                    />
                    <button
                        className="underline"
                        onClick={() => {
                            router.push('/login')
                        }}
                    >
                        Already have an account?
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
                router.push('/login')
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
                                    setViewState('register')
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

    return (
        <div className="animate-dropdown">
            <HeadTag title={'Register'} />
            {viewState === 'register' && (
                <Register />
            )}
            {viewState === 'verify' && (
                <Verify />
            )}
        </div>
    )
}