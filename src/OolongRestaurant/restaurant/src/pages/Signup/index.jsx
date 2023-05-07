import React from 'react'
import {Link} from 'react-router-dom'
import images from '../../assets/img'
import BackButton from '../../components/BackButton'

function Signup() {
  return (
    <div className='flex flex-col h-screen items-center'>
      <div className="relative flex w-full h-[80px] px-6 items-center justify-between">
        <BackButton/>
        <div className=''>
          <Link 
            to={"/login"}
            className='font-semibold text-lg font-montserrat'
          >
            Login
          </Link>
        </div>
      </div>

      <div className='flex h-screen w-full min-w-[320px] max-w-[420px] flex-col items-center justify-between mb-4 font-montserrat'>
        <div className='text-2xl font-bold font-montserrat mb-4'>Create an account</div>
         {/* textbox */}
        <div className='w-full flex justify-between gap-2'>
          <div className='flex-1'>
            <label 
              htmlFor="text"
              className='text-xs font-bold text-primary-black'>
              Username
            </label>
            <input 
              type="text" 
              placeholder='Username' 
              className='mb-4 w-full border-b border-primary-gray/50  bg-inherit pt-2 pb-2 focus:border-primary-black focus:outline-none'
            />
          </div>
        </div>

        <div className='flex flex-col w-full gap-4'>
          <div className='flex flex-col flex-1'>
            <label 
              htmlFor="email"
              className='text-xs font-bold text-primary-black'
            >
              Email
            </label>
            <input 
            type="email" 
            placeholder='Email' 
            className='mb-2 w-full border-b border-primary-gray/50  bg-inherit pt-2 pb-2 focus:border-primary-black focus:outline-none'
            />
          </div>

          <div className='flex flex-col flex-1'>
            <label 
              htmlFor="password"
              className='text-xs font-bold text-primary-black'
            >
              Password
            </label>
            <input 
            type="password" 
            placeholder='Password' 
            className='mb-3 w-full border-b border-primary-gray/50  bg-inherit pt-2 pb-2 focus:border-primary-black focus:outline-none '
            />
            <div className='flex item-center justify-center'>
              <div className='w-full flex items-center'>
                <input
                  type='checkbox'
                  className='h-4 w-4 mr-1 rounded-full'
                />
                <p>Yes, i agree to the starley <Link className='underline'>Term of Service</Link></p>
              </div>
            </div>
          </div>

          {/* button */}
          <div className='w-full flex items-center justify-center border-2 border-primary-black/50 rounded-md bg-primary-black font-semibold text-primary-white p-3 cursor-pointer '>
            <Link>Create an account</Link>
          </div>
        </div>

        <div className='w-full flex items-center justify-center relative py-2 my-1 '>
          <div className='w-full h-[1px] bg-primary-black/50'></div>
          <div className='absolute text-black/90 bg-primary-white px-1 text-lg '>or</div>
        </div>        

        <div className='w-full flex items-center justify-center border-2 border-primary-black rounded-md bg-white font-semibold text-[#060606] p-3 cursor-pointer mb-2'>
          <img src={images.googleicon} alt='' className='h-6 mr-2'/>
          Sign in with Google
        </div>

        <div className='w-full flex items-center justify-center border-2 border-primary-black rounded-md bg-white font-semibold text-[#060606] p-3 cursor-pointer '>
          <img src={images.facebookicon} alt='' className='h-6 mr-2'/>
          Sign in with Facebook
        </div>

      </div>
    </div>
  )
}

export default Signup