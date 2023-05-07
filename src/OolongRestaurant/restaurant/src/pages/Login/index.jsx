import React from 'react'
import { Link } from 'react-router-dom'
import images from '../../assets/img'
import Navbar from '../../components/Navbar'
import BackButton from '../../components/BackButton'

function Login() {
  return (
    <div className='flex flex-col h-screen items-center px-6'>
      <div className="relative flex w-full h-[80px] px-6 items-center justify-between">
        <BackButton/>
        <div className=''>
          <Link 
            to={"/signup"}
            className='font-semibold text-lg font-montserrat'
          >
            SIGN UP
          </Link>
        </div>
      </div>
      {/*  */}
      <div className='flex flex-col h-[calc(100vh-80px)] w-full items-center justify-evenly'>
        <div className="font-bold text-2xl font-montserrat">Create an account</div>
        <div className='flex flex-row items-center'>
          <div className='w-full'>
            <div className="flex-1">
              <label
                htmlFor="email"
                className="text-xs font-bold text-primary-black"
              >
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                className="mb-4 w-full border-b border-primary-gray/50  bg-inherit pt-3 pb-5 focus:border-primary-black focus:outline-none"
                placeholder="name@example.com"
              />
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className="text-xs font-bold text-primary-black"
              >
                PASSWORD
              </label>
              <input
                type="password"
                className="mb-8 w-full border-b border-primary-gray/50 bg-inherit pr-8 pt-3 pb-5 focus:border-primary-black focus:outline-none"
                placeholder="Password"
              />
            </div>
            <button className="w-full bg-primary-black py-4 text-sm font-semibold text-primary-white duration-300 ease-in-out hover:opacity-80">
              LOG IN
            </button>
          </div>
          {/* OR */}
          <div className="h-full flex-col items-center flex my-1">
            <div className="h-full w-[1px] bg-primary-black"></div>
            <div className="px-8 py-2 text-xs font-bold text-primary-blac">OR</div>
            <div className="h-full w-[1px] bg-primary-black"></div>
          </div>
          {/* button */}
          <div className='items-center w-full'>
          <Link className="flex w-full justify-between border border-black p-5">
              <img
                src={images.googleicon}
                alt=""
                className="h-[20px] w-[20px] object-cover"
              />
              <div className="text-sm font-medium">Continue with Google</div>
              <div className=""></div>
            </Link>
            <Link className="mt-4 flex w-full justify-between border border-black p-5">
              <img
                src={images.facebookicon}
                alt=""
                className="h-[20px] w-[20px] object-cover"
              />
              <div className="text-sm font-medium">Continue with Facebook</div>
              <div className=""></div>
            </Link>
            <Link className="mt-4 flex w-full justify-between border border-black p-5">
              <img 
                src={images.appleicon} 
                alt="" 
                className="h-[20px] w-[20px] object-cover" 
              />
              <div className="text-sm font-medium">Continue with Email</div>
              <div className=""></div>
            </Link>
          </div>
        </div>   
      </div>  
    </div>
  )
}

export default Login