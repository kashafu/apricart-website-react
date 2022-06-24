import SingleProduct from "./SingleProduct"

export default function MainProducts({products}){
    if(!products){
        return(
            <div>
                Loading
            </div>
        )
    }

    return(
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map((product)=>{
                return(
                    <div key={product.id}>
                        <SingleProduct
                            product={product}
                        />
                    </div>
                )
            })}
        </div>
    )
}