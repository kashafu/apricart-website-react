import Image from "next/image"

export default function SubmitButton({ text, onClick, disabled, bgColor, icon, height, width }) {
    let className = disabled ? "duration-200 bg-slate-400 text-white min-w-full rounded-lg py-2 text-md  lg:text-xl flex flex-row items-center space-x-4 justify-center" : "duration-200 bg-main-blue text-white min-w-full rounded-lg py-2 text-md lg:text-xl flex flex-row items-center space-x-4 justify-center " + bgColor

    return (
        <div className="w-full">
            <button
                className={className}
                disabled={disabled}
                onClick={() => {
                    onClick()
                }}
            >
                {icon && (
                    <Image
                        src={icon}
                        width={width}
                        height={height}
                        alt='icon'
                    />
                )}
                <p className="font-lato">
                    {text}
                </p>
            </button>
        </div>
    )
}