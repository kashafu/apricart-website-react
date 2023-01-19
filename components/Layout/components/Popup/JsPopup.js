import { useRouter } from "next/router"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import Image from "next/image"

import { useJSRegisterApi } from "../../../../helpers/Api"
import SubmitButton from "../Buttons/SubmitButton"

import zindigiLogo from "../../../../public/assets/images/zindigiLogo.png"

const JsPopup = ({ setShowScreen }) => {
    const router = useRouter()
    const redirectInformationSelector = useSelector(state => state.general.redirectInformation)
    const { isLoading, response, setData, setIsRegister, errorResponse } = useJSRegisterApi()

    useEffect(() => {
        if (response || errorResponse?.status === 409) {
            setShowScreen(true)
        }

    }, [errorResponse, response])

    return (
        <div className="animate-dropdown fixed inset-0 h-full w-full backdrop-blur-sm z-50">
            <div className="fixed w-3/4 lg:w-1/3 h-fit bg-slate-800 border-2 border-slate-900 shadow-2xl inset-0 m-auto z-50 rounded-lg p-4">
                <div className="flex flex-col justify-between h-full w-full">
                    <div className="flex w-full justify-center items-center">
                        <div className="w-2/3">
                            <Image
                                src={zindigiLogo}
                                alt='zindigi logo'
                                layout="responsive"
                            />
                        </div>
                    </div>
                    <p className="font-nunito text-white text-xl text-center py-4">
                        Your Username and Zindigi Number is needed to proceed. Please confirm to grant access to this information.
                    </p>
                    <div className="flex flex-row space-x-4">
                        <SubmitButton
                            text={"Confirm"}
                            onClick={() => {
                                setData({
                                    email: redirectInformationSelector.email,
                                    phoneNumber: redirectInformationSelector.phoneNumber,
                                    name: redirectInformationSelector.name,
                                })
                                setIsRegister(true)
                            }}
                            bgColor={'bg-js'}
                            disabled={isLoading}
                        />
                        <SubmitButton
                            text={"Decline"}
                            onClick={() => {
                                router.push('/')
                            }}
                            bgColor={'bg-js'}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JsPopup