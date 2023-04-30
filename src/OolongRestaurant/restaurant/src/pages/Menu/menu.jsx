import { Link, useParams } from 'react-router-dom';
import images from '../../assets/img';
import { useEffect, useState } from 'react';
import { getFoodsByMenuSlug, getMenus } from '../../services/MenuRepository';
import FoodList from "./food";


const MenuList = () => {
    const selected = "bg-white text-[#B1464A] flex flex-row justify-center items-center rounded-[30px]",
        normal = "bg-white/10 text-white flex flex-row justify-center items-center rounded-[30px] border backdrop-blur-[20px] border-solid border-white";
    
    // let id = type.id,
    //     name = type.name,
    //     urlSlug = type.urlSlug;
    const [menuList, setMenuList] = useState([]), 
        [foodList, setFoodList] = useState([]);
    const [slug, setSlug] = useState("");

    useEffect(() => {
        getMenus(100, 1).then(data => {
            if (data)
                setMenuList(data.items);
            else
                setMenuList([]);
        });
        
        getFoodsByMenuSlug(slug, 3, 1).then(data => {
            if (data)
                setFoodList(data.items);
            else
                setFoodList([]);
        });
    }, [slug]);

    return (
        <div className="bg-[#B1464A] min-w-[1440px] min-h-[1024px]">
            <div className="flex items-center font-menus text-white font-bold text-7xl leading-[108px] justify-center pt-[100px]">
                Popular Foods / 人気
            </div>
            <div className="flex flex-row justify-center items-center gap-[30px] pt-10">
                <div className={slug == "" ? selected : normal}>
                    <Link to={"/menus"}
                        onClick={() => {
                            setSlug("");
                        }}
                        className="px-[30px] py-[15px] font-normal text-base leading-[130%]">All</Link>
                </div>

                {menuList?.length > 0 && menuList.map((item, index) =>
                    <div className={item.urlSlug == slug ? selected : normal} key={index}>
                        <Link to={`/menus/${item.urlSlug}`}
                            onClick={() => {
                                setSlug(item.urlSlug);
                            }}
                            className="px-[30px] py-[15px] font-normal text-base leading-[130%]">{item.name}</Link>
                    </div>
                )}

                {/* <div className={type.urlSlug == "sushi" ? selected : normal}>
                    <Link to={`/menus/${type.urlSlug}`} className="px-[30px] py-[15px] font-normal text-base leading-[130%]">Sushi</Link>
                </div>
                <div className=" bg-white/10 text-white flex flex-row justify-center items-center rounded-[30px] border backdrop-blur-[20px] border-solid border-white">
                    <Link to={`/menus/`} className="px-[30px] py-[15px] font-normal text-base leading-[130%]">Ramen</Link>
                </div>
                <div className=" bg-white/10 text-white flex flex-row justify-center items-center rounded-[30px] border backdrop-blur-[20px] border-solid border-white">
                    <Link to={``} className="px-[30px] py-[15px] font-normal text-base leading-[130%]">Udon</Link>
                </div>
                <div className=" bg-white/10 text-white flex flex-row justify-center items-center rounded-[30px] border backdrop-blur-[20px] border-solid border-white">
                    <Link to={``} className="px-[30px] py-[15px] font-normal text-base leading-[130%]">Danggo</Link>
                </div>
                <div className=" bg-white/10 text-white flex flex-row justify-center items-center rounded-[30px] border backdrop-blur-[20px] border-solid border-white">
                    <Link to={``} className="px-[30px] py-[15px] font-normal text-base leading-[130%]">Other</Link>
                </div> */}

                
            </div>
            {/* Food */}
            <FoodList list={foodList}/>


            <div className='flex flex-row justify-center items-center mt-20'>
                <button className='w-[240px] flex flex-row justify-center items-center  bg-black/80 rounded-[50px] '>
                    <div className='font-normal text-2xl leading-[30px] text-white'>
                        Explore food
                    </div>
                    <div className='w-[60px] h-[60px] flex justify-center items-center'>
                        <img src={images.leftArrow} className=' -rotate-180'/>
                    </div>
                    
                </button>
            </div>
        </div>
    )
}

export default MenuList;