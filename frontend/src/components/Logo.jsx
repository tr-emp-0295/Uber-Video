import React from 'react'

const Logo = ({ className = '' }) => {
    return (
        <div className={`inline-flex items-center gap-2 ${className}`}>
            <span className='h-9 w-9 rounded-xl bg-brand flex items-center justify-center shadow'>
                <i className="ri-motorbike-fill text-xl text-ink"></i>
            </span>
            <span className='text-2xl font-extrabold tracking-tight text-ink'>RideGo</span>
        </div>
    )
}

export default Logo
