export default function SubmitButton({text, onClick, disabled}){
    let className = disabled ? "bg-slate-400 font-lato text-white min-w-full rounded-lg py-2 text-xl" : "bg-main-blue font-lato text-white min-w-full rounded-lg py-2 text-xl"

    return(
        <div className="min-w-full">
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