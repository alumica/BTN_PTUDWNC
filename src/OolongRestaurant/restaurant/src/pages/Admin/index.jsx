import { faBook, faCutlery, faEnvelope, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { getTotalContact, getTotalFood, getTotalMenu, getTotalUser } from "../../services/DashboardRepository";




const Index = () => {
    const [totalFood, setTotalFood] = useState(0),
        [totalMenu, setTotalMenu] = useState(0),
        [totalContact, setTotalContact] = useState(0),
        [totalUser, setTotalUser] = useState(0);

    useEffect(() => {
        document.title = 'Bảng điều khiển';
        getTotalFood().then(data => {
            if (data)
                setTotalFood(data);
            else
                setTotalFood(0);
        });

        getTotalMenu().then(data => {
            if (data)
                setTotalMenu(data);
            else
                setTotalMenu(0);
        });

        getTotalContact().then(data => {
            if (data)
                setTotalContact(data);
            else
                setTotalContact(0);
        });

        getTotalUser().then(data => {
            if (data)
                setTotalUser(data);
            else
                setTotalUser(0);
        });
    }, []);

    return (
        <div className="flex flex-row items-center"> 
        <div className="max-w-sm p-6 mr-3 basis-1/4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <FontAwesomeIcon className="w-10 h-10 mb-2 text-gray-500 dark:text-gray-400" icon={faCutlery}></FontAwesomeIcon>
            <h5 className="mb-2 text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">{totalFood}</h5>
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">Số món ăn</p>
        </div>
        <div className="max-w-sm p-6 mr-3 basis-1/4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <FontAwesomeIcon className="w-10 h-10 mb-2 text-gray-500 dark:text-gray-400" icon={faBook}></FontAwesomeIcon>
            <h5 className="mb-2 text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">{totalMenu}</h5>
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">Số thực đơn</p>
        </div>
        <div className="max-w-sm p-6 mr-3 basis-1/4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <FontAwesomeIcon className="w-10 h-10 mb-2 text-gray-500 dark:text-gray-400" icon={faEnvelope}></FontAwesomeIcon>
            <h5 className="mb-2 text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">{totalContact}</h5>
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">Số người liên hệ</p>
        </div>
        <div className="max-w-sm p-6 mr-3 basis-1/4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <FontAwesomeIcon className="w-10 h-10 mb-2 text-gray-500 dark:text-gray-400" icon={faUsers}></FontAwesomeIcon>
            <h5 className="mb-2 text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">{totalUser}</h5>
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">Số người dùng</p>
        </div>
        
        </div>
    );
}

export default Index;