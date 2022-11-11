import { useRouter } from "next/router"
import { useEffect } from "react"
import { useState, useRef } from "react"
import { useSelector } from "react-redux"

import { useVerifyPaymentProcessApi } from "../../../../helpers/Api"

const JsOtpPopup = ({ setShowJsScreen }) => {
    const router = useRouter()
    const redirectInformationSelector = useSelector(state => state.general.redirectInformation)
    const { isLoading, setData: setOtpData, setIsVerifyOtp, response: otpResponse } = useVerifyPaymentProcessApi()

    const [otp1, setOtp1] = useState('')
    const [otp2, setOtp2] = useState('')
    const [otp3, setOtp3] = useState('')
    const [otp4, setOtp4] = useState('')
    const [otp5, setOtp5] = useState('')

    const otp1Ref = useRef()
    const otp2Ref = useRef()
    const otp3Ref = useRef()
    const otp4Ref = useRef()
    const otp5Ref = useRef()

    let otpStyle = 'rounded-full w-1/4 aspect-square shadow-inner-3xl text-center'

    useEffect(() => {
        otp1Ref.current.focus()
    }, [])

    useEffect(() => {
        if (otpResponse) {
            setShowJsScreen(false)
        }
    }, [otpResponse])

    return (
        <div className="animate-dropdown fixed inset-0 h-full w-full backdrop-blur-sm z-50">
            <div className="fixed w-3/4 lg:w-1/3 h-fit bg-white border-2 shadow-2xl inset-0 m-auto z-50 rounded-lg p-2">
                <div className="flex flex-col items-center space-y-4 h-full w-full">
                    <p className="font-nunito text-js text-xl text-center">
                        Authentication
                    </p>
                    <p className="text-nunito text-black text-center font-semibold">
                        Enter the 4-digit OTP for +92{redirectInformationSelector.phoneNumber}
                    </p>
                    <div className="flex space-x-2 w-4/5">
                        <input
                            ref={otp1Ref}
                            className={otpStyle}
                            type={'number'}
                            value={otp1}
                            onChange={(e) => {
                                if (e.target.value.length == 1) {
                                    setOtp1(e.target.value)
                                    otp2Ref.current.focus()
                                }
                                else if (e.target.value.length <= 1) {
                                    setOtp1(e.target.value)
                                }
                            }}
                        />
                        <input
                            ref={otp2Ref}
                            className={otpStyle}
                            type={'number'}
                            value={otp2}
                            onChange={(e) => {
                                if (e.target.value.length == 1) {
                                    setOtp2(e.target.value)
                                    otp3Ref.current.focus()
                                }
                                else if (e.target.value.length <= 1) {
                                    setOtp2(e.target.value)
                                }
                            }}
                            onKeyUp={async (e) => {
                                if (e.key === 'Backspace' && otp2 === '') {
                                    otp1Ref.current.focus()
                                }
                            }}
                        />
                        <input
                            ref={otp3Ref}
                            className={otpStyle}
                            type={'number'}
                            value={otp3}
                            onChange={(e) => {
                                if (e.target.value.length == 1) {
                                    setOtp3(e.target.value)
                                    otp4Ref.current.focus()
                                }
                                else if (e.target.value.length <= 1) {
                                    setOtp3(e.target.value)
                                }
                            }}
                            onKeyUp={async (e) => {
                                if (e.key === 'Backspace' && otp3 === '') {
                                    otp2Ref.current.focus()
                                }
                            }}
                        />
                        <input
                            ref={otp4Ref}
                            className={otpStyle}
                            type={'number'}
                            value={otp4}
                            onChange={(e) => {
                                if (e.target.value.length == 1) {
                                    setOtp4(e.target.value)
                                    otp5Ref.current.focus()
                                }
                                else if (e.target.value.length <= 1) {
                                    setOtp4(e.target.value)
                                }
                            }}
                            onKeyUp={async (e) => {
                                if (e.key === 'Backspace' && otp4 === '') {
                                    otp3Ref.current.focus()
                                }
                            }}
                        />
                        <input
                            ref={otp5Ref}
                            className={otpStyle}
                            type={'number'}
                            value={otp5}
                            onChange={(e) => {
                                if (e.target.value.length == 1) {
                                    setOtp5(e.target.value)
                                }
                                else if (e.target.value.length <= 1) {
                                    setOtp5(e.target.value)
                                }
                            }}
                            onKeyUp={async (e) => {
                                if (e.key === 'Backspace' && otp5 === '') {
                                    otp4Ref.current.focus()
                                }
                            }}
                        />
                    </div>
                    <div className="flex flex-row space-x-4 w-full pt-4">
                        <button
                            className="w-full rounded-full bg-white drop-shadow-2xl"
                            onClick={() => {
                                router.push('/')
                            }}
                        >
                            <p className="text-js text-center font-nunito">
                                CANCEL
                            </p>
                        </button>
                        <button
                            className="w-full rounded-full bg-white drop-shadow-2xl"
                            onClick={() => {
                                setOtpData({
                                    phoneNumber: redirectInformationSelector.phoneNumber,
                                    otp: otp1 + otp2 + otp3 + otp4
                                })
                                setIsVerifyOtp(true)
                            }}
                            disabled={isLoading}
                        >
                            <p className="text-js text-center font-nunito">
                                NEXT
                            </p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JsOtpPopup