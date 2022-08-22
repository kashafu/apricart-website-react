export default function SubmitButton({ text, onClick, disabled, bgColor }) {
    let className = disabled ? "duration-200 bg-slate-400 font-lato text-white min-w-full rounded-lg py-2 text-md  lg:text-xl " : "duration-200 bg-main-blue font-lato text-white min-w-full rounded-lg py-2 text-md  lg:text-xl "

    return (
        <div className="w-full">
            <button
                className={className + [bgColor]}
                disabled={disabled}
                onClick={() => {
                    onClick()
                }}
            >
                {text}
            </button>
        </div>
    )
}