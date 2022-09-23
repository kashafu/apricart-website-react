import { useRegisterApi } from "../../../../helpers/Api"
import SubmitButton from "../Buttons/SubmitButton"

const JsPopup = () => {
    const { isLoading, response, setData, setIsRegister, errorResponse, errorMessage } = useRegisterApi()

    function generatePassword() {
        return ("mujtaba")
    }

    return (
        <div className="animate-dropdown fixed inset-0 h-full w-full backdrop-blur-sm z-50">
            <div className="fixed w-3/4 lg:w-1/3 h-1/3 bg-white border-2 shadow-2xl inset-0 m-auto z-50 rounded-lg p-2">
                <div className="flex flex-col justify-between h-full w-full">
                    <p className="font-nunito text-black text-xl text-center">
                        Your Zindagi User ID and number is needed to proceed. Please confirm to grant access to this information.
                    </p>
                    <div className="flex flex-row space-x-4">
                        <SubmitButton
                            text={"Confirm"}
                            onClick={() => {
                                setData({
                                    email: '',
                                    phoneNumber: '',
                                    name: '',
                                    password: generatePassword()
                                })
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