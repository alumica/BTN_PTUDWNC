import React from 'react'
import {Link} from 'react-router-dom'
import images from '../../assets/img'

function Signup() {
  return (
    <div className='flex flex-col h-screen items-center'>
      <div className='relative flex h-[80px] w-full items-center justify-between py-4'>
        <div className='translate-x-6'>Back button</div>
        <div className='-translate-x-6'>
          <Link to={'/login'}>
            Log in
          </Link>
        </div>
      </div>

      <div className='flex h-screen w-full min-w-[320px] max-w-[420px] flex-col items-center justify-between mb-2'>
        <div className='text-2xl font-bold'>Create an account</div>
        <div className=''>Sign up to get free voucher</div>

         {/* textbox */}
        <div className='w-full flex justify-between'>
          <div className='flex-1'>
            <label 
              htmlFor="text"
              className='text-xs font-bold text-zinc-500 ml-2'>
              First name
            </label>
            <input 
              type="text" 
              placeholder='Frist name' 
              className='border-2 border-black/50 p-2 rounded-xl text-black bg-transparent outline-none focus:outline '
            />
          </div>
          <div className='flex-1'>
            <label 
              htmlFor='text'
              className='text-xs font-bold text-zinc-500 ml-2'>
              Last name               
            </label>
            <input 
              type="text" 
              placeholder='Last name' 
              className='border-2 border-black/50 p-2 rounded-xl text-black bg-transparent outline-none focus:outline '
            />
          </div>
        </div>

        <div className='flex flex-col w-full gap-4'>
          <div className='flex flex-col flex-1'>
            <label 
              htmlFor="email"
              className='text-xs font-bold text-zinc-500 ml-2'
            >
              Email
            </label>
            <input 
            type="email" 
            placeholder='Email' 
            className='border-2 border-black/50 p-2 rounded-xl text-black bg-transparent outline-none focus:outline '
            />
          </div>

          <div className='flex flex-col flex-1'>
            <label 
              htmlFor="password"
              className='text-xs font-bold text-zinc-500 ml-2'
            >
              Password
            </label>
            <input 
            type="password" 
            placeholder='Password' 
            className='border-2 border-black/50 p-2 rounded-xl text-black bg-transparent outline-none focus:outline '
            />
            <div className='flex item-center justify-center ml-1'>
              <div className='w-full flex items-center'>
                <input
                  type='checkbox'
                  className='h-4 w-4 mr-2 rounded-full'
                />
                <p>Yes, i agree to the starley <Link className='underline'>Term of Service</Link></p>
              </div>
            </div>
          </div>

          {/* button */}
          <div className='w-full flex items-center justify-center border-2 border-black/50 rounded-md bg-black font-semibold text-white p-3 cursor-pointer '>
            <Link>Create an account</Link>
          </div>
          
        </div>

        <div className='w-full flex items-center justify-center relative py-2 my-1 '>
          <div className='w-full h-[1px] bg-black/50'></div>
          <div className='absolute text-black/90 bg-white px-1 text-lg '>or</div>
        </div>        

        <div className='w-full flex items-center justify-center border-2 border-black/50 rounded-md bg-white font-semibold text-[#060606] p-3 cursor-pointer '>
          <img src={images.googleicon} alt='' className='h-6 mr-2'/>
          Sign in with Google
        </div>

        <div className='w-full flex items-center justify-center border-2 border-black/50 rounded-md bg-white font-semibold text-[#060606] p-3 cursor-pointer '>
          <img src={images.facebookicon} alt='' className='h-6 mr-2'/>
          Sign in with Facebook
        </div>

      </div>
    </div>
  )
}

export default Signup