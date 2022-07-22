export default function SubmitButton({text, onClick, disabled}){
    let className = disabled ? "bg-slate-400 font-lato text-white min-w-full rounded-lg py-2 text-md  lg:text-xl" : "bg-main-blue font-lato text-white min-w-full rounded-lg py-2 text-md  lg:text-xl"

    return(
        <div className="w-full">
            <button
                className={className}
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