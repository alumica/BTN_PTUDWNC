import { useState } from "react"

function ProductCategory(props){
    const boxStyle="border border-primary-white rounded-3xl text-primary-white hover:text-primary-red bg-primary-gray/10 hover:bg-primary-white px-7 py-2"
    // const category = ["All", "Combo", "Sushi", "Ramen", "Udon", "Danggo", "Other" ]
    // const [type,setType] = useState('false')
    // const activeButton = () =>{
    //     if(true){
    //         return()
    //     }
    // }
    return(
        // <div>
        //     {category.map(category => (
        //         <button
        //             key={category} 
        //             onClick={() => setType(category)}
        //         >
        //             {category}
        //         </button>
        //     ))}
        // </div>
        <div className="py-2 flex gap-6 justify-evenly items-center text-center mx-[240px] font-montserrat">
          <div className="border border-primary-white rounded-3xl text-primary-red bg-primary-white px-7 py-2">All</div>
          <div className={boxStyle}>Combo</div>
          <div className={boxStyle}>Sushi</div>
          <div className={boxStyle}>Ramen</div>
          <div className={boxStyle}>Udon</div>
          <div className={boxStyle}>Danggo</div>
          <div className={boxStyle}>Other</div>
        </div>
    )
}
export default ProductCategory