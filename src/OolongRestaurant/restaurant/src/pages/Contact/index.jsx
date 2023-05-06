import React, { useEffect, useState } from 'react'
import { addOrUpdateContact } from '../../services/ContactRepository';

function Contact() {
  const initialState = {
    id: 0,
    email: '',
    fullName: '',
    subject: '',
    description: ''
  },
    [contact, setContact] = useState(initialState);

  useEffect(() => {
    document.title = 'Contact'
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    let form = new FormData(e.target);
        addOrUpdateContact(form).then(data => {
            if (data) {
              alert('Thanks!');
              window.location.reload();
            }
            else
                alert('Đã xảy ra lỗi');
        });
  }

  return (
    <div>
      <section className="bg-primary-red">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
      <h2 className="mb-4 tracking-tight font-extrabold font-playfair text-6xl text-center text-white">Contact Us</h2>
      
      <form action="#" className="space-y-8" method='post'encType='multipart/form-data' onSubmit={handleSubmit}>
          <input type='hidden' name='id' value={contact.id}/>
          <div>
              <label htmlFor="email" className="block mb-2 text-base font-medium text-white">Email</label>
              <input name='email' onChange={e => setContact({...contact, email: e.target.value})} type="email" id="email" className=" shadow-base p-3 bg-white/10 border border-white text-white text-base rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="" required />
          </div>
          <div>
              <label htmlFor="fullName" className="block mb-2 text-base font-medium text-white">Full Name</label>
              <input name='fullName' onChange={e => setContact({...contact, fullName: e.target.value})} type="text" id="fullName" className=" shadow-base p-3 bg-white/10 border border-white text-white text-base rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="" required />
          </div>
          <div>
              <label htmlFor="subject" className="block mb-2 text-base font-medium text-white">Subject</label>
              <input name='subject' onChange={e => setContact({...contact, subject: e.target.value})} type="text" id="subject" className="block p-3 w-full text-base text-white bg-white/10 rounded-lg border border-gray-300 shadow-base focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="" required />
          </div>
          <div className="sm:col-span-2">
              <label htmlFor="message" className="block mb-2 text-base font-medium text-white dark:text-gray-400">Your message</label>
              <textarea name='description' onChange={e => setContact({...contact, description: e.target.value})} id="message" rows="6" className="block p-2.5 w-full text-base text-white bg-white/10 rounded-lg shadow-base border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder=""></textarea>
          </div>
          <button type="submit" className="py-3 px-5 text-base font-medium text-center bg-primary-black text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send message</button>
      </form>
  </div>
</section>
    </div>
  )
}

export default Contact;