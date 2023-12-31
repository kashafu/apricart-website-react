import Image from "next/image"
import Link from "next/link"

import toKebabCase from "../../../../helpers/toKebabCase"

import missingImageIcon from "../../../../public/assets/images/missingImage.png"

const SingleCategory = ({ category }) => {
    let { id, name, image } = category

    return (
        <Link
            className="w-full flex grow h-full"
            href={
                "/category/" +
                toKebabCase(name) +
                "/" +
                id
            }
            passHref
        >
            <a className="w-full grow flex group flex-col gap-y-4 bg-white">
                <div className="w-full flex items-center justify-center rounded-full aspect-square overflow-hidden shadow-xl">
                    <div className="w-2/3 items-center group-hover:scale-105 duration-200">
                        <Image
                            src={image ? image : missingImageIcon}
                            layout={'responsive'}
                            alt='category image'
                            width={20}
                            height={20}
                        />
                    </div>
                </div>
                <div className="w-full h-full flex flex-col items-center justify-center">
                    <p className="text-center text-main-blue font-bold text-xs lg:text-lg">
                        {name}
                    </p>
                </div>
            </a>
        </Link>
    )
}

export default SingleCategory