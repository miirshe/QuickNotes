import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useState } from 'react';
import * as Yup from 'yup'
import { BiHide, BiShow } from "react-icons/bi"
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../context/redux/slices/UserSlices';
import toast from 'react-hot-toast';
const Register = () => {
  const navigate = useNavigate();
  const [registerUser] = useRegisterUserMutation();
  const [type, setType] = useState('password');
  const initialValues = {
    username: '',
    email: '',
    password: '',
  }
  const validationSchema = Yup.object({
    username: Yup.string().required('username is required'),
    email: Yup.string().email().required('email is required'),
    password: Yup.string().required('password is required')
      .matches(/[a-z]/, 'password at least one small letter is required')
      .matches(/[A-Z]/, 'password at least one capital letter is required')
      .matches(/[0-9]/, 'password at least one Number is required')
      .min(8, 'password must be less than 8 characters')
  })
  const handleSubmit = async (values) => {
    const { username, email, password } = values;
    console.log();
    registerUser({
      username: username,
      email: email,
      password: password
    })
      .then((res) => {
        const status = res.data.status;
        const message = res.data.message;
        if (status) {
          toast.success(message);
          navigate('/login')
        } else {
          toast.error(message);
        }
      })
      .catch(err => {
        console.log(err);
      })
  }
  return (
    <div className="w-full">
      <div className="w-[90%] md:w-[40%] lg:w-[30%] mx-auto p-2">
        <Formik
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}>
          <Form className='w-full shadow rounded p-4 mt-36 space-y-7 border border-[#004C42]'>
            <h1 className='text-xl tracking-widest font-medium w-full text-center text-[#004C42]'>Register</h1>
            <div className='w-full grid grid-cols-1 gap-3 space-y-3'>
              <Field className='w-full outline-[#004C42]  p-3 shadow rounded' type="text" name='username' placeholder='Enter Username' />
              <ErrorMessage component="div" className='text-red-500' name='username' />
            </div>
            <div className='w-full grid grid-cols-1 gap-3 space-y-3'>
              <Field className='w-full outline-[#004C42]  p-3 shadow rounded' type="text" name='email' placeholder='Enter Email Address' />
              <ErrorMessage component="div" className='text-red-500' name='email' />
            </div>
            <div className="w-full grid grid-cols-1 gap-3 space-y-3 relative">
              <Field type={type} className='w-full outline-[#004C42]  p-3 shadow rounded' placeholder="Enter your password.." name="password" />
              {
                type === 'password' ? <BiHide onClick={() => setType('text')} size={25} className="text-black cursor-pointer inline absolute top-1 right-4" /> : <BiShow onClick={() => setType('password')} size={25} className="inline cursor-pointer text-black  absolute top-1 right-4" />
              }
              <ErrorMessage component="div" className="text-red-500" name="password" />
            </div>
            <button className='w-full p-3 font-bold tracking-widest shadow rounded bg-[#004C42] text-white'>Register</button>
            <p className='text-center w-full'> Already  have an account ? <Link className='text-[#004C42] font-medium tracking-widest' to='/login'> Login</Link></p>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default Register