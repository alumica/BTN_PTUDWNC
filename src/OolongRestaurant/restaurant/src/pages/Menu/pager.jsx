import Menu from "./menu";
import FoodsList from "./food";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import images from "../../assets/img";


const Pager = ({ foodList, metadata }) => {
    let pageCount = metadata.pageCount,
        hasNextPage = metadata.hasNextPage,
        hasPreviousPage = metadata.hasPreviousPage,
        pageNumber = metadata.pageNumber,
        pageSize = metadata.pageSize,
        actionName = '', slug = useParams();

    if (pageCount > 1) {
        return (
            <>
                {hasPreviousPage
                ? <div className="flex flex-row justify-center items-center w-[80px] h-[80px] bg-white/20 backdrop-blur-[20px] rounded-[50px]">
                    <Link to={`/menu/${slug}?p=${pageNumber - 1}&ps=${pageSize}`}>
                        <img src={images.leftArrow}></img>
                    </Link>
                </div>
                : <div className="flex flex-row justify-center items-center w-[80px] h-[80px] bg-white/20 backdrop-blur-[20px] rounded-[50px]">
                    <img src={images.leftArrow}></img>
                </div>
                }

                <FoodsList list={foodList} />

                {hasNextPage
                ? 
                <div className="flex flex-row justify-center items-center w-[80px] h-[80px] bg-white/20 backdrop-blur-[20px] rounded-[50px] -rotate-180">
                    <Link to={`/menu/${slug}?p=${pageNumber + 1}&ps=${pageSize}`}>
                        <img src={images.leftArrow}></img>
                    </Link>
                </div>
                : <div className="flex flex-row justify-center items-center w-[80px] h-[80px] bg-white/20 backdrop-blur-[20px] rounded-[50px] -rotate-180">
                    <img src={images.leftArrow}></img>
                </div>
                }
            </>
        );
    }
    return (
        <Link></Link>
    );
}

export default Pager;