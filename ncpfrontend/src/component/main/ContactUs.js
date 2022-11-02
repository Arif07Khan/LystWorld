import { Formik } from 'formik';
import React from 'react'
import toast from 'react-hot-toast';
import app_config from '../../config';


const ContactUs = () => {

  const url=app_config.url;

const contactSubmit=async(formdata,{resetForm})=>{
  const response= await fetch(url+"/contactus/add",{
    method:"POST",
    body:JSON.stringify(formdata),
    headers:{
      "Content-Type":"application/json"
    }
  })
  if(response.status===200){
    toast.success("Message sent successfully")
    resetForm();
  }
  else{
    toast.error("Message not sent")
  }
  console.log(formdata) 
}

  return (
    <section id="contactus" className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Contact Us
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              We are always here to help you. Please feel free to contact us.
            </p>
          </div>
          <Formik
          initialValues={{ name: '', email: '', message: '',createdAt:new Date() }}
          onSubmit={contactSubmit}
          >
          {({ values, handleChange, handleSubmit, handleBlur }) => (
            <form onSubmit={handleSubmit}>
              <div className="lg:w-1/2 md:w-2/3 mx-auto">
                <div className="flex flex-wrap -m-2">
                  <div className="p-2 w-1/2">
                    <div className="relative">
                      <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                        Name
                      </label>
                      <input type="text" id="name" name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required/>
                    </div>
                  </div>
                  <div className="p-2 w-1/2">
                    <div className="relative">
                      <label htmlFor="email" className="leading-7 text-sm text-gray-600">
                        Email
                      </label>
                      <input type="email" id="email" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required />
                    </div>
                  </div>
                  <div className="p-2 w-full">
                    <div className="relative"> 
                      <label htmlFor="message" className="leading-7 text-sm text-gray-600">
                        Message
                      </label>
                      <textarea id="message" name="message" value={values.message} onChange={handleChange} onBlur={handleBlur} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" required></textarea>
                    </div>
                  </div>
                  <div className="p-2 w-full">
                    <button type="submit" className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                      Submit
                    </button>
                  </div>
                  </div>
                </div>
              </form>
            )}            
          </Formik>
      </div>
      </section>
  )
}

export default ContactUs