import React, { useState } from 'react'
import Logo from '../components/Logo'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CapatainContext'

const Captainlogin = () => {

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const { captain, setCaptain } = React.useContext(CaptainDataContext)
  const navigate = useNavigate()



  const submitHandler = async (e) => {
    e.preventDefault();
    const captain = {
      email: email,
      password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain)

    if (response.status === 200) {
      const data = response.data

      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')

    }

    setEmail('')
    setPassword('')
  }
  return (
    <div className='auth-page p-7 h-screen flex flex-col justify-between'>
      <div>
        <Logo className='mb-6' />
        <span className='inline-block bg-brand text-ink text-xs font-bold px-3 py-1 rounded-full mb-3'>CAPTAIN</span>
        <h1 className='text-3xl font-extrabold leading-tight'>Captain login</h1>
        <p className='text-gray-500 mb-8 mt-1'>Go online and start earning.</p>

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
        <p className='text-center'>Join a fleet? <Link to='/captain-signup' className='text-ink font-semibold underline decoration-brand decoration-2'>Register as a Captain</Link></p>
      </div>
      <div>
        <Link
          to='/login'
          className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded-xl px-4 py-2 w-full text-lg placeholder:text-base'
        >Sign in as User</Link>
      </div>
    </div>
  )
}

export default Captainlogin