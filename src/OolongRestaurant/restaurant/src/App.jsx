import React from 'react';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import { publicRoutes } from './routes';
import AdminLayout from './pages/Admin/Layout';
import * as AdminIndex from './pages/Admin/index';
import Contacts from './pages/Admin/Contact';
import EditContact from './pages/Admin/Contact/edit';
import Menus from './pages/Admin/Menu';
import EditMenu from './pages/Admin/Menu/edit';
import Albums from './pages/Admin/Album';
import Users from './pages/Admin/User';
import Foods from './pages/Admin/Food';
import EditFood from './pages/Admin/Food/edit';
import Menu from './pages/Menu';
import * as MenuIndex from './pages/Menu/menu';
import EditUser from './pages/Admin/User/edit';

function App() {
  return (
    <>
      <Router>
        <div>
          <Routes>
            {publicRoutes.map((route,index)=>{
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={route.component}
                />
              )
            })};
            <Route path='/menus' element={<Menu/>}>
              {/* <Route path='/menus' element={<AdminIndex.default/>}/> */}
              <Route path='/menus/:slug' element={<Menu/>}/>
            </Route>
            <Route path='/admin' element={<AdminLayout/>}>
              <Route path='/admin' element={<AdminIndex.default/>}/>
              <Route path='/admin/menus' element={<Menus/>}/>
              <Route path='/admin/menus/edit' element={<EditMenu/>}/>
              <Route path='/admin/menus/edit/:id' element={<EditMenu/>}/>
              <Route path='/admin/foods' element={<Foods/>}/>
              <Route path='/admin/foods/edit' element={<EditFood/>}/>
              <Route path='/admin/foods/edit/:id' element={<EditFood/>}/>
              <Route path='/admin/albums' element={<Albums/>}/>
              <Route path='/admin/contacts' element={<Contacts/>}/>
              <Route path='/admin/contacts/edit' element={<EditContact/>}/>
              <Route path='/admin/contacts/edit/:id' element={<EditContact/>}/>
              <Route path='/admin/users' element={<Users/>}/>
              <Route path='/admin/users/edit' element={<EditUser/>}/>
              <Route path='/admin/users/edit/:id' element={<EditUser/>}/>
            </Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App