import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getContacts, deleteContact } from "../../../services/ContactRepository";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import ContactFilterPane from "./ContactFilterPane";


const Contacts = () => {
    const [contactsList, setContactsList] = useState([]);
    let { id } = useParams(),
        p = 1, ps = 10;

    useEffect(() => {
        document.title = 'Danh sách liên hệ';
        getContacts(ps, p).then(data => {
            if (data)
                setContactsList(data.items);
            else
                setContactsList([]);
        });
    }, [
        p, ps]);

    
    return (
        <div>
            <h1 className="py-4 font-bold text-4xl">Danh sách liên hệ</h1>
            <div className="mb-5">
                <Link to="/admin/contacts/edit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Thêm mới</Link>
            </div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-collapse border-black">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Tiêu đề</th>
                            <th scope="col" className="px-6 py-3">Họ tên</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                            <th scope="col" className="px-6 py-3">Xóa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contactsList.length > 0 ? contactsList.map((item, index) =>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-black" key={index}>
                                <td className="px-6 py-4 ">
                                    <Link to={`/admin/contacts/edit/${item.id}`} className="text-blue-600/100">
                                        {item.subject}
                                    </Link>
                                    <p className="text-muted">{item.description}</p>
                                </td>
                                <td className="px-6 py-4">{item.fullName}</td>
                                <td className="px-6 py-4">{item.email}</td>
                                
                                {/* <td className="px-6 py-4">{item.showOnMenu ? 
                                    <button>1</button> : 
                                    <button>2</button> }</td> */}
                                <td className="px-6 py-4">
                                    <button onClick={(() => {
                                        var c = confirm('Bạn có muốn xóa liên hệ này không ?')
                                            ? deleteContact(item.id) 
                                            : console.log("Hủy");})}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                            <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                                    </button>
                                </td>
                            </tr>
                            ) :
                                <tr>
                                    <td colSpan={4}>
                                        <h4 className="">Không tìm thấy liên hệ nào</h4>
                                    </td>
                                </tr>
                        }
                    </tbody>
                </table>
        </div>
    ) 
}

export default Contacts;