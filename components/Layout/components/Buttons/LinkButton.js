import Image from "next/image"
import Link from "next/link"

export default function LinkButton({ text, path, onClick, icon, height, width }) {
    return (
        <Link href={path} passHref>
            <div className="flex flex-row items-center space-x-4 w-full bg-white rounded-2xl text-center p-2 font-bold text-main-blue"
                onClick={() => {
                    if (onClick) {
                        onClick()
                    }
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
                <a className="font-lato">
                    {text}
                </a>
            </div>
        </Link>
    )
}