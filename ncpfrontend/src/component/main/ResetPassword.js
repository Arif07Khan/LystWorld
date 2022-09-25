import React from 'react'
import { Formik } from 'formik';

const ResetPassword = () => {
const ResetPass = (formdata) => { 
  console.log(formdata);
 }
  return (
    <div className='container mt-5 w-50 '>
      <div className='card'>
        <Formik initialValues={{
          email:"",
          otp:'',
          createpassword:"",
          confirmpassword:"",
        }} onSubmit={ResetPass}>
          {({ values,handleChange,handleSubmit })=>(
          <form onSubmit={handleSubmit} className='form-control rounded-5'>
            <h2 className='text-center mt-2'>ResetPassword</h2>
            <div className='d-flex align-item-center justify-content-center mt-2'>
            <label className='mt-3' htmlFor='email'>Email:&nbsp;</label>
            <input className='form-control' type="text" value={values.email} onChange={handleChange} id="email" placeholder='Enter Your Registered Email'/>
            <button className='btn btn-danger'>Send OTP</button>
            </div>
            <div className='d-flex mt-2'>
            <label className='mt-1' htmlFor='otp'>OTP:&nbsp;</label>
            <input  type="" value={values.otp} onChange={handleChange} id="otp" placeholder='OTP'/>
            <button className='btn btn-danger'>Confirm</button>
            </div>
            <div className='d-flex align-item-center justify-content-center mt-2'>
            <label className='mt-1' htmlFor='createpassword'>CreatePassword:&nbsp;</label>
            <input className='form-control' type="password" value={values.createpassword} onChange={handleChange} id="createpassword" placeholder='Create Your Password'/>
            </div>
            <div className='d-flex align-item-center justify-content-center mt-2'>
            <label className='mt-1' htmlFor='confirmpassword'>ConfirmPassword:&nbsp;</label>
            <input className='form-control' type="password" value={values.confirmpassword} onChange={handleChange} id="confirmpassword" placeholder='Re-Enter Password'/>
            </div>
            <div className='d-flex align-item-center justify-content-center mt-2'>
            <button className='btn btn-primary mt-3 mb-2 '>Change Password</button>
            </div>
          </form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default ResetPassword;