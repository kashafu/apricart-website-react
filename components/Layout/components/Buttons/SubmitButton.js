export default function SubmitButton({text, onClick, disabled}){
    return(
        <div className="min-w-full">
            <button
                className="bg-main-blue font-lato text-white min-w-full rounded-lg py-2 text-xl"
                disabled={disabled}
                onClick={()=>{
                    onClick()
                }}
            >
                {text}
            </button>
        </div>
    )
}