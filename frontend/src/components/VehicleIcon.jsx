import React from 'react'

const icons = {
    car: 'ri-taxi-fill',
    moto: 'ri-motorbike-fill',
    motorcycle: 'ri-motorbike-fill',
    auto: 'ri-e-bike-2-fill'
}

const VehicleIcon = ({ type, className = 'h-12 w-12 text-2xl' }) => {
    return (
        <span className={`rounded-2xl bg-brand flex items-center justify-center text-ink shrink-0 ${className}`}>
            <i className={icons[ type ] || icons.car}></i>
        </span>
    )
}

export default VehicleIcon
