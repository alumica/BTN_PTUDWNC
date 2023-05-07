import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { addOrUpdateFood, getFoodById } from "../../../services/FoodRepository";
import { getMenus } from "../../../services/MenuRepository";
import { isInteger, decode, isEmptyOrSpaces } from "../../../utils/utils";
import { getUserById, addOrUpdateUser } from "../../../services/UserRepository";


const EditUser = () => {
    const [validated, setValidated] = useState(false);

    const initialState = {
        id: 0,
        fullName: '',
        email: '',
        userName: '',
        password: '',
        imageUrl: '',
        menu: {}
    },
        [user, setUser] = useState(initialState);
    
        
    let { id } = useParams();
    id = id ?? 0;

    useEffect(() => {
        document.title = 'Thêm/cập nhật người dùng';

        getUserById(id).then(data => {
            if (data)
                setUser({...data,});
            else
                setUser(initialState);
        });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (e.currentTarget.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
        } else {
            let form = new FormData(e.target);
            addOrUpdateUser(form).then(data => {
                if (data) {
                    alert('Đã lưu thành công!');
                    window.location = '/admin/users';
                }
                else
                    alert('Đã xảy ra lỗi');
            });
        }
    }

    if (id && !isInteger(id))
        return (<></>)
    return (
        <div>
            <form className="w-full max-w-sm"
                method='post'
                encType='multipart/form-data'
                onSubmit={handleSubmit}>
                <input type="hidden" name="id" value={user.id}/>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                            Họ và tên
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input name="fullName" title="Full Name" type="text" value={user.fullName || ''}
                            onChange={e => setUser({...user, fullName: e.target.value
                                })}
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" required />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                            Email
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input name="email" title="Email" type="email" value={user.email || ''}
                            onChange={e => setUser({...user, email: e.target.value
                                })}
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" required />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                            Tên người dùng
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input name="userName" title="User Name" type="text" value={user.userName || ''}
                            onChange={e => setUser({...user, userName: e.target.value
                                })}
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" required />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                            Mật khẩu
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input name="password" title="Password" type="text" value={user.password || ''}
                            onChange={e => setUser({...user, password: e.target.value
                                })}
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" required />
                    </div>
                </div>
                
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
                            Loại
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <select className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                                name='typeUser'
                                title='Type User'
                                value={user.typeUser}
                                required
                                onChange={e => setUser({
                                    ...user,
                                    typeUser: e.target.value
                                })}>
                            <option value=''>-- Chọn loại người dùng --</option>
                            <option value={false}>Bình thường</option>
                            <option value={true}>Quản trị viên</option>
                        </select>
                    </div>
                </div>

                {!isEmptyOrSpaces(user.imageUrl) && <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
                            Hình hiện tại
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <img src={user.imageUrl} alt={user.fullName}/>
                    </div>
                </div>
                }
                
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
                            Chọn hình ảnh
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input type='file'
                                name='imageFile'
                                title='Image File'
                                accept='image/*'
                                onChange={e => setUser({
                                    ...user,
                                    imageFile: e.target.files[0]
                                })} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"/>
                    </div>
                </div>

                <div className="md:flex md:items-center">
                    <div className="md:w-1/3"></div>
                    <div className="md:w-2/3">
                        <button type="submit" className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                            Thêm
                        </button>
                        <Link to='/admin/users' className="shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded ml-2">
                            Hủy và quay lại
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default EditUser;