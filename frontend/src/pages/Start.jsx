import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo'

const features = [
  { icon: 'ri-motorbike-fill', label: 'Bike' },
  { icon: 'ri-e-bike-2-fill', label: 'Auto' },
  { icon: 'ri-taxi-fill', label: 'Cab' },
]

const Start = () => {
  return (
    <div className='h-screen relative overflow-hidden flex flex-col justify-between bg-brand'>
      <div className='absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/30'></div>
      <div className='absolute top-1/3 -left-28 h-64 w-64 rounded-full bg-brand-dark/50'></div>

      <div className='relative p-6 pt-8'>
        <Logo />
      </div>

      <div className='relative flex-1 flex flex-col items-center justify-center px-6 text-center fade-up'>
        <div className='flex gap-4'>
          {features.map(item => (
            <div key={item.label} className='flex flex-col items-center gap-2'>
              <span className='h-20 w-20 rounded-3xl bg-ink text-brand flex items-center justify-center text-4xl shadow-xl rotate-[-4deg] odd:rotate-3'>
                <i className={item.icon}></i>
              </span>
              <span className='text-sm font-bold text-ink'>{item.label}</span>
            </div>
          ))}
        </div>
        <h1 className='mt-10 text-4xl lg:text-5xl font-extrabold leading-tight text-ink'>Go anywhere,<br />in minutes.</h1>
        <p className='mt-3 text-ink/70 font-medium'>Fast, affordable rides with captains near you.</p>
      </div>

      <div className='relative bg-white rounded-t-3xl px-6 pt-6 pb-8 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] lg:w-[28rem] lg:self-center lg:rounded-3xl lg:mb-12 fade-up'>
        <h2 className='text-2xl font-extrabold'>Get started</h2>
        <p className='text-sm text-gray-500 mt-1'>Choose how you want to use RideGo.</p>
        <Link to='/login' className='flex items-center justify-center gap-2 w-full bg-brand text-ink font-bold py-3.5 rounded-xl mt-4 shadow active:scale-[0.98] transition'><i className="ri-user-3-fill"></i> Continue as Rider</Link>
        <Link to='/captain-login' className='flex items-center justify-center gap-2 w-full bg-ink text-white font-bold py-3.5 rounded-xl mt-3 active:scale-[0.98] transition'><i className="ri-steering-2-fill"></i> Continue as Captain</Link>
      </div>
    </div>
  )
}

export default Start
