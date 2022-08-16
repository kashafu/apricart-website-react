import Link from "next/link"
import Image from "next/image"

/*
    Can either have onclick which will be a button, or a path which will be a Link
*/
export default function LinkText({ text, path, onClick, icon }) {
    if (onClick) {
        return (
            <button
                onClick={() => {
                    onClick
                }}
            >
                <div className="flex flex-row w-full items-center whitespace-nowrap space-x-px font-lato text-main-blue font-semibold text-center">
                    {icon && (
                        <Image
                            src={icon}
                            alt={"icon"}
                            height={25}
                            width={25}
                        />
                    )}
                    <p className="text-center">
                        {text}
                    </p>
                </div>
            </button>
        )
    }

    return (
        <Link href={path} passHref>
            <a className="flex flex-row w-full items-center whitespace-nowrap space-x-px font-lato text-main-blue font-semibold text-center">
                {icon && (
                    <Image
                        src={icon}
                        alt={"icon"}
                        height={25}
                        width={25}
                    />
                )}
                <p className="text-center">
                    {text}
                </p>
            </a>
        </Link>
    )
}