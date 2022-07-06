import logoPNG from '../../../../public/assets/images/logo.png'
import Link from 'next/link'
import Image from 'next/image'

export default function Logo({}){
    return(
        <div>
            <Link href={"/"} passHref>
                <button className="flex">
                    <Image
                        src={logoPNG}
                        alt={"logo"}
                    />
                </button>
            </Link>
        </div>
    )
}