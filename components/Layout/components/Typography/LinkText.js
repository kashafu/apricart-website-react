import Link from "next/link"
import Image from "next/image"

export default function LinkText({text, path, icon}){
    return(
        <Link href={path} passHref>
            <a className="flex flex-row w-full items-center whitespace-nowrap space-x-px font-lato text-main-blue font-semibold">
                {icon && (
                    <Image
                        src={icon}
                        alt={"icon"}
                        height={25}
                        width={25}
                    />
                )}
                <p>
                    {text}
                </p>
            </a>
        </Link>
    )
}