import { useState } from "react"
import SubmitButton from "../Buttons/SubmitButton"

const OtpJsPopup = () => {
    const [otp1, setOtp1] = useState('')
    const [otp2, setOtp2] = useState('')
    const [otp3, setOtp3] = useState('')
    const [otp4, setOtp4] = useState('')

    return (
        <div className="animate-dropdown fixed inset-0 h-full w-full backdrop-blur-sm z-50">
            <div className="fixed w-3/4 lg:w-1/3 h-1/3 bg-white border-2 shadow-2xl inset-0 m-auto z-50 rounded-lg p-2">
                <div className="flex flex-col justify-between h-full w-full">
                    <p className="font-nunito text-js text-xl text-center">
                        Authentication
                    </p>
                    <div className="w-full items-stretch">
                        <input
                            className="rounded-full"
                            type={'number'}
                            value={otp1}
                            onChange={(e) => {
                                setOtp1(e.target.value)
                            }}
                        />
                        <input
                            className="rounded-full"
                            type={'number'}
                            value={otp2}
                            onChange={(e) => {
                                setOtp2(e.target.value)
                            }}
                        />
                        <input
                            className="rounded-full"
                            type={'number'}
                            value={otp3}
                            onChange={(e) => {
                                setOtp3(e.target.value)
                            }}
                        />
                        <input
                            className="rounded-full"
                            type={'number'}
                            value={otp4}
                            onChange={(e) => {
                                setOtp4(e.target.value)
                            }}
                        />
                    </div>
                    <div className="flex flex-row space-x-4">
                        <button
                            className="w-full rounded-full bg-white drop-shadow-2xl"
                            onClick={() => {

                            }}
                        >
                            <p className="text-js text-center font-nunito">
                                CANCEL
                            </p>
                        </button>
                        <button
                            className="w-full rounded-full bg-white drop-shadow-2xl"
                            onClick={() => {

                            }}
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

export default OtpJsPopup