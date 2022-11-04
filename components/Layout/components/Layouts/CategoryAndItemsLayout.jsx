import Categories from "../Categories/Categories"

const CategoryAndItemsLayout = ({ children }) => {
    return (
        <main className="w-full grid grid-cols-5 gap-6">
            {/* CATEGORIES SECTION */}
            <section className="hidden lg:block lg:col-span-1">
                <Categories />
            </section>
            <section className="col-span-5 lg:col-span-4">
                {children}
            </section>
        </main>
    )
}

export default CategoryAndItemsLayout