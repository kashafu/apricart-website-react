import SubmitButton from "../Buttons/SubmitButton";

/*
    If onClickCancel, there will be an ok button and a cancel button, otherwise 
    only ok button
*/

const Alert = ({ text, onClickOk, onClickCancel }) => {
    return (
        <div className="animate-slide-up fixed inset-0 h-full w-full backdrop-blur-sm z-50">
            <div className="fixed w-full lg:w-1/3 bg-white border-t-2 border-main-red shadow-2xl bottom-0 lg:inset-0 lg:m-auto lg:h-fit lg:rounded-3xl lg:border-2 z-50 rounded-t-3xl p-2">
                <div className="h-3/4 w-full flex items-center justify-center py-16 lg:py-8">
                    <p className="font-nunito text-black text-2xl text-center">
                        {text}
                    </p>
                </div>
                {onClickCancel ? (
                    <div className="h-1/4 w-full flex flex-row space-x-4 justify-between">
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