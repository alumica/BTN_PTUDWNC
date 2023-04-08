import Products from "../pages/Products";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import About from "../pages/About";
import Signup from "../pages/Signup";
import Login from "../pages/Login";

const publicRoutes= [
    {path: "/", component: <Home/> },
    {path:"/home", component: <Home/>},
    {path:"/about", component: <About/>},
    {path:"/contact", component: <Contact/>},
    {path:"/products", component: <Products/>},
    {path:"/signup", component: <Signup/>},
    {path:"/login", component: <Login/>}
]

export {publicRoutes}