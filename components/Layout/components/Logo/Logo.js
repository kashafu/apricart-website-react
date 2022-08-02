import logoPNG from '../../../../public/assets/images/logo.png'
import Link from 'next/link'
import Image from 'next/image'

export default function Logo({}){
    return(
        <div className=''>
            <Link href={"/"} passHref>
                <a className="flex items-center justify-center">
                    <Image
                        src={logoPNG}
                        alt={"logo"}
                    />
                </a>
            </Link>
        </div>
    )
}