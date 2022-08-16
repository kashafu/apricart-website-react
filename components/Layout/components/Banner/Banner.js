import Image from "next/image";
import Link from "next/link";

export default function Banner({ bannerImage, offerId }) {
    return (
        <div className="w-full rounded-xl overflow-hidden">
            {offerId == 0 ? (
                <Image
                    src={bannerImage}
                    layout={'responsive'}
                    alt={"banner image"}
                    width={'100%'}
                    height={20}
                />
            ) : (
                <Link
                    href={
                        "/offers/" + offerId
                    }
                    passHref
                    key={offerId}
                >
                    <a className="w-full">
                        <Image
                            src={bannerImage}
                            layout={'responsive'}
                            alt={"banner image"}
                            width={'100%'}
                            height={20}
                        />
                    </a>
                </Link>
            )}
        </div>
    )
}