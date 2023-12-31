import Link from "next/link"

import SingleCategory from "./SingleCategory"

const MainCategories = ({ categories }) => {
    let numberOfCategoriesMobile = 9
    let numberOfProductsLaptop = 10
    let numberOfProductsDesktop = 12

    return (
        <section className="space-y-4 px-2 py-2">
            <div className="w-full border-b border-main-blue-100 py-2">
                <div className="flex flex-row items-center w-full justify-between">
                    <p className="text-lg lg:text-[22px] text-main-blue font-bold">
                        Shop By Category
                    </p>
                    <Link href={"/category"} passHref>
                        <a className="bg-main-blue px-6 py-1 h-full rounded-md flex items-center">
                            <p className="text-white font-nunito font-normal text-xs lg:text-lg">
                                View All
                            </p>
                        </a>
                    </Link>
                </div>
            </div>
            <div>
                {/* MOBILE VIEW PRODUCTS */}
                <section className="grid grid-cols-3 lg:hidden gap-x-10 gap-y-2">
                    {categories.slice(0, numberOfCategoriesMobile).map((category) => {
                        let { id } = category
                        return (
                            <div key={id}>
                                <SingleCategory category={category} />
                            </div>
                        )
                    })}
                </section>
                {/* LAPTOP VIEW PRODUCTS */}
                <section className="hidden lg:grid lg:grid-cols-5 gap-x-12 gap-y-2 2xl:hidden">
                    {categories.slice(0, numberOfProductsLaptop).map((category) => {
                        let { id } = category
                        return (
                            <div key={id}>
                                <SingleCategory category={category} />
                            </div>
                        )
                    })}
                </section>
                {/* DESKTOP VIEW PRODUCTS */}
                <section className="hidden 2xl:grid 2xl:grid-cols-6 gap-x-12 gap-y-2">
                    {categories.slice(0, numberOfProductsDesktop).map((category) => {
                        let { id } = category
                        return (
                            <div key={id}>
                                <SingleCategory category={category} />
                            </div>
                        )
                    })}
                </section>
            </div>
        </section>
    )
}

export default MainCategories