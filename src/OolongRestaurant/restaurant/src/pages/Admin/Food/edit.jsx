import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { addOrUpdateFood, getFoodById } from "../../../services/FoodRepository";
import { getMenus } from "../../../services/MenuRepository";
import { isInteger, decode, isEmptyOrSpaces } from "../../../utils/utils";


const EditFood = () => {
    const [validated, setValidated] = useState(false);

    const initialState = {
        id: 0,
        name: '',
        description: '',
        imageUrl: '',
        menu: {}
    },
        [food, setFood] = useState(initialState),
        [menuList, setMenuList] = useState([]);
    
        
    let { id } = useParams();
    id = id ?? 0;

    useEffect(() => {
        document.title = 'Thêm/cập nhật món ăn';

        getFoodById(id).then(data => {
            if (data)
                setFood({...data,});
            else
                setFood(initialState);
        });

        getMenus().then(data => {
            if (data)
                setMenuList(data.items);
            else
                setMenuList([]);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (e.currentTarget.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
        } else {
            let form = new FormData(e.target);
            addOrUpdateFood(form).then(data => {
                if (data) {
                    alert('Đã lưu thành công!');
                    window.location = '/admin/foods';
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
                <input type="hidden" name="id" value={food.id}/>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                            Tên món ăn
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input name="name" title="Name" type="text" value={food.name || ''}
                            onChange={e => setFood({...food, name: e.target.value
                                })}
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" required />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
                            Mô tả
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <textarea name="description" title="Description" value={decode(food.description || '')}
                            onChange={e => setFood({...food, description: e.target.value
                                })}
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-password" type="text" required />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
                            Giá
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input name="price" title="Price" value={food.price || ''}
                            onChange={e => setFood({...food, price: e.target.value
                                })}
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-password" type="number" required/>
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
                            Thực đơn
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <select className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                                name='menuId'
                                title='Menu Id'
                                value={food.menu?.id}
                                required
                                onChange={e => setFood({
                                    ...food,
                                    menu: e.target.value
                                })}>
                            <option value=''>-- Chọn thực đơn --</option>
                            {menuList?.length > 0 &&
                                    menuList.map((item, index) =>
                                        <option key={index} value={item.id}>{item.name}</option>)}
                        </select>
                    </div>
                </div>

                {!isEmptyOrSpaces(food.imageUrl) && <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
                            Hình hiện tại
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <img src={food.imageUrl} alt={food.name}/>
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
                                onChange={e => setFood({
                                    ...food,
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
                        <Link to='/admin/foods' className="shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded ml-2">
                            Hủy và quay lại
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default EditFood;