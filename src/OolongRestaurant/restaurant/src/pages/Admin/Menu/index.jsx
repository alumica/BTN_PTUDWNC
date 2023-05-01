import { useEffect, useState } from "react";
import { deleteMenuById, getMenus } from "../../../services/MenuRepository";
import { Link, useParams } from "react-router-dom";
import Loading from "../../../components/Others/loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Menus = () => {
    const [menusList, setMenusList] = useState([]),
        [isVisibleLoading, setIsVisibleLoading] = useState(true);
    let { id } = useParams(),
        p = 1, ps = 10;

    useEffect(() => {
        document.title = 'Danh sách thực đơn';
        getMenus(ps, p).then(data => {
            if (data)
                setMenusList(data.items);
            else
                setMenusList([]);
                setIsVisibleLoading(false);
        });
    }, [
        p, ps]);

    
    return (
        <div>
            <h1 className="py-4 font-bold text-4xl">Danh sách thực đơn</h1>
            <div className="mb-5">
                <Link to="/admin/menus/edit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Thêm mới</Link>
            </div>
            {isVisibleLoading ? <Loading/> :
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-collapse border-black">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Tên thực đơn</th>
                            <th scope="col" className="px-6 py-3">Số món ăn</th>
                            <th scope="col" className="px-6 py-3">Slug</th>
                            <th scope="col" className="px-6 py-3">Xóa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {menusList?.length > 0 ? menusList?.map((item, index) =>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-black" key={index}>
                                <td className="px-6 py-4 ">
                                    <Link to={`/admin/menus/edit/${item.id}`} className="text-blue-600/100">
                                        {item.name}
                                    </Link>
                                    <p className="text-muted">{item.description}</p>
                                </td>
                                <td className="px-6 py-4">{item.foodCount}</td>
                                <td className="px-6 py-4">{item.urlSlug}</td>
                                
                                {/* <td className="px-6 py-4">{item.showOnMenu ? 
                                    <button>1</button> : 
                                    <button>2</button> }</td> */}
                                <td className="px-6 py-4">
                                    <button onClick={(() => {
                                        if (confirm('Bạn có muốn xóa thực đơn này không ?'))
                                        {
                                            deleteMenuById(item.id); location.reload();
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
                                        <h4 className="">Không tìm thấy thực đơn nào</h4>
                                    </td>
                                </tr>
                        }
                    </tbody>
                </table> }
        </div>
    ) 
}

export default Menus;