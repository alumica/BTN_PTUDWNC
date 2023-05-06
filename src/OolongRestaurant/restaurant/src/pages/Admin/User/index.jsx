import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../../../components/Others/loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { deleteUserById, getUsers } from "../../../services/UserRepository";

const Users = () => {
    const [usersList, setUsersList] = useState([]),
        [isVisibleLoading, setIsVisibleLoading] = useState(true);
    let { id } = useParams(),
        p = 1, ps = 10;

    useEffect(() => {
        document.title = 'Danh sách người dùng';

        getUsers(ps, p).then(data => {
            if (data)
                setUsersList(data.items);
            else
                setUsersList([]);
            setIsVisibleLoading(false)
        });
        
    }, [
        p, ps]);

    
    return (
        <div>
            <h1 className="py-4 font-bold text-4xl">Danh sách người dùng</h1>
            <div className="mb-5">
                <Link to="/admin/users/edit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Thêm mới</Link>
            </div>
            {isVisibleLoading ? <Loading/> :
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-collapse border-black">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Họ và tên</th>
                            <th scope="col" className="px-6 py-3">Tên người dùng</th>
                            <th scope="col" className="px-6 py-3">Mật khẩu</th>
                            <th scope="col" className="px-6 py-3">Hình ảnh</th>
                            <th scope="col" className="px-6 py-3">Loại</th>
                            <th scope="col" className="px-6 py-3">Xóa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersList?.length > 0 ? usersList?.map((item, index) =>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-black" key={index}>
                                <td className="px-6 py-4 ">
                                    <Link to={`/admin/users/edit/${item.id}`} className="text-blue-600/100">
                                        {item.fullName}
                                    </Link>
                                    <p className="text-muted">{item.email}</p>
                                </td>
                                <td className="px-6 py-4">{item.userName}</td>
                                <td className="px-6 py-4">{item.password}</td>
                                <td className="px-6 py-4">{item.imageUrl}</td>
                                <td className="px-6 py-4">{item.typeUser ? "Quản trị viên" : "Bình thường"}</td>
                                <td className="px-6 py-4">
                                    <button onClick={(() => {
                                        if (window.confirm('Bạn có muốn xóa người dùng này không ?'))
                                        {
                                            deleteUserById(item.id);
                                            window.location.reload();
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
                                        <h4 className="">Không tìm thấy người dùng nào</h4>
                                    </td>
                                </tr>
                        }
                    </tbody>
                </table> }
        </div>
    )
}

export default Users;