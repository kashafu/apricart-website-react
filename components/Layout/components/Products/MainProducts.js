import SingleProduct from "./SingleProduct"
import Link from "next/link"
import Image from "next/image"

export default function MainProducts({ section }) {
    let { bannerImageWeb, data, name, offerId } = section

    if (!section) {
        return (
            <div>
                Loading
            </div>
        )
    }

    return (
        <section key={name} className='space-y-4'>
            {/* <div className="lg:hidden relative w-full h-[90px] md:h-[150px] lg:h-[250px] rounded-xl overflow-hidden">
                <Link href="/offers/[id]"
                    as={
                        "/offers/" + offerId
                    }
                    passHref
                    key={offerId}
                >
                    <a>
                        <Image
                            src={bannerImageWeb}
                            layout={'fill'}
                            alt={"banner image"}
                        />
                    </a>
                </Link>
            </div> */}
            <div className="w-full border-b border-main-blue-100 py-4">
                <p className="text-2xl text-main-blue font-bold">
                    - {name}
                </p>
            </div>
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                {data.map((product) => {
                    let { id } = product
                    return (
                        <div key={id}>
                            <SingleProduct
                                product={product}
                            />
                        </div>
                    )
                })}
            </section>
        </section>
        // <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        //     {section.map((product)=>{
        // return(
        //     <div key={product.id}>
        //         <SingleProduct
        //             product={data}
        //         />
        //     </div>
        // )
        //     })}
        // </div>
    )
}