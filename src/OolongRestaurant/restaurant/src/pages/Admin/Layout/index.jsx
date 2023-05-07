import { Outlet } from 'react-router-dom';  
import Navbar from '../../../components/Admin/Navbar';


const AdminLayout = () => {
  return (
    <div className='w-full text-base'>
      <Navbar/>
      <div className="container py-3 mx-auto w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;