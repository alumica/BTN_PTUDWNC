import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { getFoods, deleteFoodById } from "../../../services/FoodRepository";
import Loading from "../../../components/Others/loading";


const Foods = () => {
    const [foodsList, setFoodsList] = useState([]),
        [isVisibleLoading, setIsVisibleLoading] = useState(true);
    let { id } = useParams(),
        p = 1, ps = 10;

    useEffect(() => {
        document.title = 'Danh sách món ăn';
        getFoods(ps, p).then(data => {
            if (data)
                setFoodsList(data.items);
            else
                setFoodsList([]);
                setIsVisibleLoading(false);
        });
    }, [
        p, ps]);

    
    return (
        <div>
            <h1 className="py-4 font-bold text-4xl">Danh sách món ăn</h1>
            <div className="mb-5">
                <Link to="/admin/foods/edit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Thêm mới</Link>
            </div>
            {isVisibleLoading ? <Loading/> :
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-collapse border-black">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Tên món ăn</th>
                            <th scope="col" className="px-6 py-3">Giá</th>
                            <th scope="col" className="px-6 py-3">Hình ảnh</th>
                            <th scope="col" className="px-6 py-3">Xóa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {foodsList?.length > 0 ? foodsList?.map((item, index) =>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-black" key={index}>
                                <td className="px-6 py-4 ">
                                    <Link to={`/admin/foods/edit/${item.id}`} className="text-blue-600/100">
                                        {item.name}
                                    </Link>
                                    <p className="text-muted">{item.description}</p>
                                </td>
                                <td className="px-6 py-4">{item.price}</td>
                                <td className="px-6 py-4">{item.imageUrl}</td>
                                
                                {/* <td className="px-6 py-4">{item.showOnMenu ? 
                                    <button>1</button> : 
                                    <button>2</button> }</td> */}
                                <td className="px-6 py-4">
                                    <button onClick={(() => {
                                        if (window.confirm('Bạn có muốn xóa món ăn này không ?'))
                                        {
                                            deleteFoodById(item.id); window.location.reload();
                                        }
                                        else
                                            console.log("Hủy");})}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                            <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                                    </button>
                                </td>
                            </tr>
                            ) :
                                <tr>
                                    <td colSpan={4}>
                                        <h4 className="">Không tìm thấy món ăn nào</h4>
                                    </td>
                                </tr>
                        }
                    </tbody>
                </table> }
        </div>
    ) 
}

export default Foods;