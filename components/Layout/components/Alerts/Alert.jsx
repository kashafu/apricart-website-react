import SubmitButton from "../Buttons/SubmitButton";

/*
    If onClickCancel, there will be an ok button and a cancel button, otherwise 
    only ok button
*/

const Alert = ({ text, onClickOk, onClickCancel }) => {
    return (
        <div className="animate-slide-up fixed inset-0 h-screen w-screen overscroll-none backdrop-blur-sm z-50">
            <div className="fixed w-5/6 lg:w-1/2 bg-white border-t-2 border-main-red shadow-2xl inset-0 m-auto h-fit rounded-3xl border-2 z-50 py-2 px-4">
                <div className="h-3/4 w-full flex items-center justify-center py-4">
                    <p className="font-nunito text-black font-bold text-base lg:text-2xl text-left">
                        {text}
                    </p>
                </div>
                {onClickCancel ? (
                    <div className="h-1/4 w-full flex flex-row space-x-4 justify-between px-[10%]">
                        <SubmitButton
                            text={"OK"}
                            onClick={() => {
                                onClickOk()
                            }}
                        />
                        <SubmitButton
                            text={"CANCEL"}
                            onClick={() => {
                                onClickCancel()
                            }}
                        />
                    </div>
                ) : (
                    <div className="h-1/4 w-full flex flex-row space-x-4">
                        <SubmitButton
                            text={"OK"}
                            onClick={() => {
                                onClickOk()
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Alert