import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { addOrUpdateContact, getContactById } from "../../../services/ContactRepository";
import { decode, isInteger } from "../../../utils/utils";


const EditContact = () => {
    const [validated, setValidated] = useState(false);

    const initialState = {
        id: 0,
        fullName: '',
        email: '',
        subject: '',
        description: '',
    },
        [contact, setContact] = useState(initialState);
        
    let { id } = useParams();
    id = id ?? 0;

    useEffect(() => {
        document.title = 'Thêm/cập nhật liên hệ';

        getContactById(id).then(data => {
            if (data)
                setContact({...data,});
            else
                setContact(initialState);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (e.currentTarget.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
        } else {
            let form = new FormData(e.target);
            addOrUpdateContact(form).then(data => {
                if (data) {
                    alert('Đã lưu thành công!');
                    window.location = '/admin/contacts';
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
                <input type="hidden" name="id" value={contact.id}/>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                            Tiêu đề
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input name="subject" title="Subject" type="text" value={contact.subject || ''}
                            onChange={e => setContact({...contact, subject: e.target.value
                                })}
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" required />
                    </div>
                </div>
                <div className="md:flex md:items-top mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
                            Nội dung
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <textarea rows={7} name="description" title="Description" value={decode(contact.description || '')}
                            onChange={e => setContact({...contact, description: e.target.value
                                })}
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-password" type="text" required />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                            Họ tên
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input name="fullName" title="Full Name" type="text" value={contact.fullName || ''}
                            onChange={e => setContact({...contact, fullName: e.target.value
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
                        <input name="email" title="Email" type="email" value={contact.email || ''}
                            onChange={e => setContact({...contact, email: e.target.value
                                })}
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" required />
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

export default EditContact;