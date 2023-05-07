import { useEffect, useState } from "react";
import { addOrUpdateMenu, getMenuById } from "../../../services/MenuRepository";
import { decode, isInteger } from "../../../utils/utils";
import { Link, useParams } from "react-router-dom";

const EditMenu = () => {
    const [validated, setValidated] = useState(false);

    const initialState = {
        id: 0,
        name: '',
        description: '',
        urlSlug: '',
    },
        [menu, setMenu] = useState(initialState);
    
        
    let { id } = useParams();
    id = id ?? 0;

    useEffect(() => {
        document.title = 'Thêm/cập nhật thực đơn';

        getMenuById(id).then(data => {
            if (data)
                setMenu({...data,});
            else
                setMenu(initialState);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (e.currentTarget.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
        } else {
            let form = new FormData(e.target);
            addOrUpdateMenu(form).then(data => {
                if (data) {

                    alert('Đã lưu thành công!');
                    window.location = '/admin/menus';
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
                <input type="hidden" name="id" value={menu.id}/>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                            Tên thực đơn
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input name="name" title="Name" type="text" value={menu.name || ''}
                            onChange={e => setMenu({...menu, name: e.target.value
                                })}
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" required/>
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
                            Mô tả
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <textarea name="description" title="Description" value={decode(menu.description || '')}
                            onChange={e => setMenu({...menu, description: e.target.value
                                })}
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-password" type="text" required/>
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
                            Slug
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input name="urlSlug" title="Url Slug" value={menu.urlSlug || ''}
                            onChange={e => setMenu({...menu, urlSlug: e.target.value
                                })}
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-password" type="text"/>
                    </div>
                </div>
                
            

                <div className="md:flex md:items-center">
                    <div className="md:w-1/3"></div>
                    <div className="md:w-2/3">
                        <button type="submit" className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                            Thêm
                        </button>
                        <Link to='/admin/menus' className="shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded ml-2">
                            Hủy và quay lại
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default EditMenu;