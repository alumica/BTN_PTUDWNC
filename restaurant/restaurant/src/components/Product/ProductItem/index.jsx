import { Link } from "react-router-dom";

function ProductItem(props){
    <Link
    to={""}
    className='group col-span-2 overflow-hidden rounded-2xl border border-primary-white bg-primary-gray/10 shadow-md '
  >
    <img 
        src={props.image} 
        alt="" 
        className='h-15 w-full object-cover duration-300 ease-in-out group-hover:scale-105' />
    <div className="py-2 px-4 grid text-primary-white">
      <div className="font-title">{props.name}</div>
      <div className="flex justify-between">
        <span className="">
            <span className="">{props.rating}</span>
            <i className="fa-solid fa-star ml-1 text-yellow"></i>
        </span>
        <span className="">${props.price}</span>
      </div>
    </div>
  </Link>
}

export default ProductItem