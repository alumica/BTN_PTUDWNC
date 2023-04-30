import React from 'react'
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import { publicRoutes } from './routes';
import AdminLayout from './pages/Admin/Layout';
import * as AdminIndex from './pages/Admin/index';
import Contacts from './pages/Admin/Contact';
import Menus from './pages/Admin/Menu';
import Albums from './pages/Admin/Album';
import Users from './pages/Admin/User';
import Foods from './pages/Admin/Food';
import Edit from './pages/Admin/Food/Edit';
import Menu from './pages/Menu';
import * as MenuIndex from './pages/Menu/menu';

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
              <Route path='/admin/foods' element={<Foods/>}/>
              <Route path='/admin/foods/edit' element={<Edit/>}/>
              <Route path='/admin/foods/edit/:id' element={<Edit/>}/>
              <Route path='/admin/albums' element={<Albums/>}/>
              <Route path='/admin/contacts' element={<Contacts/>}/>
              <Route path='/admin/users' element={<Users/>}/>
            </Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App