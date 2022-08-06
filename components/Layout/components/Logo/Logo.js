import logoPNG from '../../../../public/assets/images/logo.png'
import logoWhite from '../../../../public/assets/images/logo-white.png'
import Link from 'next/link'
import Image from 'next/image'

export default function Logo({dark}){
    return(
        <div className=''>
            <Link href={"/"} passHref>
                <a className="flex items-center justify-center">
                    <Image
                        src={dark ? logoWhite:logoPNG  }
                        alt={"logo"}    
                    />
                </a>
            </Link>
        </div>
    )
}