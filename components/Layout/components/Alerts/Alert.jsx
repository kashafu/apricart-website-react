import { useRouter } from "next/router";

import SubmitButton from "../Buttons/SubmitButton";

const Alert = ({ text, setShow }) => {
    const router = useRouter()

    return (
        <div className="animate-slide-up fixed inset-0 h-full w-full backdrop-blur-sm z-50">
            <div className="fixed w-full lg:w-1/3 bg-white h-[300px] border-t-2 border-main-red shadow-2xl bottom-0 z-50 rounded-t-3xl p-2">
                <div className="h-3/4 w-full flex items-center justify-center">
                    <p className="font-nunito text-black text-2xl">
                        {text}
                    </p>
                </div>
                <div className="h-1/4 w-full flex flex-row space-x-4">
                    <SubmitButton
                        text={"OK"}
                        onClick={() => {
                            setShow(false)
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Alert