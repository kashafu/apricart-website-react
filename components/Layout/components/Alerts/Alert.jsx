import SubmitButton from "../Buttons/SubmitButton";

const Alert = ({ text, onClick }) => {
    return (
        <div className="animate-slide-up fixed inset-0 h-full w-full backdrop-blur-sm z-50">
            <div className="fixed w-full lg:w-1/3 bg-white border-t-2 border-main-red shadow-2xl bottom-0 lg:inset-0 lg:m-auto lg:h-fit lg:rounded-3xl lg:border-2 z-50 rounded-t-3xl p-2">
                <div className="h-3/4 w-full flex items-center justify-center py-16">
                    <p className="font-nunito text-black text-2xl">
                        {text}
                    </p>
                </div>
                <div className="h-1/4 w-full flex flex-row space-x-4">
                    <SubmitButton
                        text={"OK"}
                        onClick={() => {
                            onClick()
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Alert