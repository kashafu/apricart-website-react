import { useRouter } from "next/router";

import SubmitButton from "../Buttons/SubmitButton";

const Alert = ({ text, setIsProceed }) => {
    const router = useRouter()

    return (
        <div className="animate-dropdown fixed inset-0 h-full w-full backdrop-blur-sm z-50">
            <div className="fixed w-3/4 lg:w-1/3 bg-white h-[200px] border-2 shadow-2xl inset-0 m-auto z-50 rounded-lg p-2">
                <div className="h-3/4 w-full flex items-center justify-center">
                    <p className="">
                        {text}
                    </p>
                </div>
                <div className="h-1/4 w-full flex flex-row space-x-4">
                    <SubmitButton
                        text={"Cancel"}
                        onClick={() => {
                            router.push("/")
                        }}
                        bgColor={"bg-red-500"}
                    />
                    <SubmitButton
                        text={"Proceed"}
                        onClick={() => {
                            setIsProceed(true)
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Alert