import Products from "../pages/Products";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Menu from "../pages/Menu";
import Albumfood from "../pages/Albumfood/Albumfood";
import About from "../pages/About/About";

const publicRoutes= [
    {path: "/", component: <Home/> },
    {path:"/home", component: <Home/>},
    {path:"/about", component: <About/>},
    {path:"/albumfood", component: <Albumfood/>},
    {path:"/contact", component: <Contact/>},
    {path:"/products", component: <Products/>},
    {path:"/signup", component: <Signup/>},
    {path:"/login", component: <Login/>},
    {path:"/menu", component: <Menu/>},    
]

export {publicRoutes}