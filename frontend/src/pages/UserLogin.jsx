import React, { useState, useContext } from 'react'
import Logo from '../components/Logo'
import { Link } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserLogin = () => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ userData, setUserData ] = useState({})

  const { user, setUser } = useContext(UserDataContext)
  const navigate = useNavigate()



  const submitHandler = async (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)

    if (response.status === 200) {
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
    }


    setEmail('')
    setPassword('')
  }

  return (
    <div className='auth-page p-7 h-screen flex flex-col justify-between'>
      <div>
        <Logo className='mb-6' />
        <h1 className='text-3xl font-extrabold leading-tight'>Welcome back</h1>
        <p className='text-gray-500 mb-8 mt-1'>Log in to book your next ride.</p>

        <form onSubmit={(e) => {
          submitHandler(e)
        }}>
          <h3 className='text-sm font-semibold text-gray-700 mb-2'>What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            className='bg-[#f3f3f3] mb-7 rounded-xl px-4 py-3 border border-transparent w-full text-lg placeholder:text-base'
            type="email"
            placeholder='email@example.com'
          />

          <h3 className='text-sm font-semibold text-gray-700 mb-2'>Enter Password</h3>

          <input
            className='bg-[#f3f3f3] mb-7 rounded-xl px-4 py-3 border border-transparent w-full text-lg placeholder:text-base'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            required type="password"
            placeholder='password'
          />

          <button
            className='bg-brand text-ink font-bold mb-3 rounded-xl px-4 py-3 shadow active:scale-[0.98] transition w-full text-lg placeholder:text-base'
          >Login</button>

        </form>
        <p className='text-center'>New here? <Link to='/signup' className='text-ink font-semibold underline decoration-brand decoration-2'>Create new Account</Link></p>
      </div>
      <div>
        <Link
          to='/captain-login'
          className='bg-ink flex items-center justify-center text-white font-semibold mb-5 rounded-xl px-4 py-2 w-full text-lg placeholder:text-base'
        >Sign in as Captain</Link>
      </div>
    </div>
  )
}

export default UserLogin