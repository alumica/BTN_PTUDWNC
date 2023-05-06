import ProductItem from "../ProductItem"
import ProductCategory from "../ProductCategory"
import products from "../../../assets/products"
import ProductContainer from "../../ProductContainer"
import { Link } from "react-router-dom"

function ProductSection(props){    
    
    return(
        <>
            <div className="">
                <div className="text-center text-2xl font-bold text-primary-white">{props.title}</div>
                <ProductCategory/>
                <div className="grid grid-cols-12 gap-6">
                    {props.products.map((product)=>{
                        return(
                            <ProductItem 
                            key={product.id}
                            name={product.name}
                            price={product.price}
                            rating={product.rating}
                            image={product.image}
                            />
                        )
                    })}
                </div>
                <div className="flex w-full justify-center">
                    <Link
                        to={""}
                        className=" bg-primary-black rounded-3xl font-montserrat text-primary-white px-6 py-2 "    
                    >Explore More <i class="ml-4 fa-solid fa-arrow-right transition transform hover:translate-x-1"></i>
                    </Link>
            </div>
            </div>
        </>
    )
}

export default ProductSection