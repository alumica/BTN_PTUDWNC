import React from 'react';
import NavbarHome from '../../components/Navbar';
import images from "../../assets/img"
import { Link } from 'react-router-dom';
import products from '../../assets/products'
import ProductSection from '../../components/Product/ProductSection';
import Trending from '../../components/Trending';
import Footer from '../../components/Footer';

const threeProducts = products.slice(0, 2);
function Home() {
  const divStyle="grid grid-cols-12 gap-6"
  return (
    <div>
      <div className={divStyle}>
        <div className='col-span-4'>
          <img src={images.bg1} alt="" className="object-cover h-screen w-full" />
        </div>
        <div className='col-span-8 col-start-6 justify-end'>
          <NavbarHome/>
          <div className='flex flex-col text-left  py-10 mt-10'>
            <div className="font-title text-6xl max-w-md ml-10 leading-tight">Feel the tasty of 
            <span className='inline'> Japanese foods</span>
            </div>
            <p className='ml-12 pl-6 mt-7 font-montserrat'>Feel the taste of most popular Japanese food from anywhere anytime </p>
          </div>
          <div className='ml-7 pl-6 mt-2'>
            <Link 
              to={""}
              className='border border-primary-black bg-primary-black text-primary-white rounded-full px-9 py-3 mr-5'
            >
              Order now
            </Link>
            <Link 
              to={""}
              className='border border-primary-black rounded-full px-9 py-3 ml-10'
            >
              Album food
            </Link>
          </div>
        </div>
      </div>
      {/* Japanese food culture */}
      <div className='grid grid-cols-12 gap-6'>
        <div className='col-span-4'>
          <img src={images.bg3} alt="" className="object-cover"/>
        </div>
        <div className="col-span-8 col-start-6 gap-7 flex h-full flex-col justify-center">
          <div className="text-lg font-montserrat text-primary-red ">Japanese food culture/日本の食文化</div>
          <div className="text-6xl font-title">Our mission is to bring true
            <span className='inline'> Japanese flavours to you.</span>
          </div>
          <div className="max-w-[600px] text-lg font-montserrat">
            We will continue to provide experience of Omotenashi, 
            the Japanese mindset of hospitality, with our shopping and dining for our customers.
          </div>
        </div>
      </div>

      {/* popular foods */}
      <div className='h-sreen bg-primary-red'>
        <ProductSection products={threeProducts} title={"Popular"} button={true}/>
      </div>

      {/* discover */}
      
      <div className="h-[1024px] grid grid-cols-12 relative ">
        <div className="col-span-6 bg-primary-white border-r-2">
          <div className='h-full flex flex-col border-left items-center justify-center'>
            <div className='text-left'>
              <div className='font-montserrat text-xl text-primary-red mb-8'>what’s treding/トレンド</div>
              <div className='font-title text-5xl mb-8'>Japanese foods</div>
              <Trending/>
            </div>    
          </div>
        </div>
        <div className="col-span-6 bg-primary-sunshine border-b-2">
          <div className='h-full flex flex-col border-left items-center justify-center'>
            <img src={images.sushiframe} alt='' className='object-center'/>
          </div>
        </div>
        <div className="absolute top-[43%] left-[44%] rounded-full px-10 py-16 text-xs text-primary-white font-montserrat bg-primary-black">DISCOVER</div>
        <div className="col-span-6 bg-primary-sunshine border-t-2">
          <div className='h-full flex flex-col border-left items-center justify-center'>
            <img src={images.teaframe} alt='' className='object-center'/>
          </div>
        </div>
        <div className="col-span-6 bg-primary-white border-l-2">
          <div className='h-full flex flex-col border-left items-center justify-center'>
            <div className='text-left'>
              <div className='font-montserrat text-xl text-primary-red mb-8'>what’s treding/トレンド</div>
              <div className='font-title text-5xl mb-8'>Japanese drinks</div>
              <div className='flex gap-12'>
                <Trending/>
              </div>
            </div>    
          </div>
        </div>
      </div>
      {/* footer */}
      <Footer/>
    </div>
  )
}

export default Home