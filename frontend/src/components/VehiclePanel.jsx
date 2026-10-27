import React from 'react'
import VehicleIcon from './VehicleIcon'

const options = [
    { type: 'moto', name: 'Bike', seats: 1, eta: '3 mins away', desc: 'Quickest way through traffic' },
    { type: 'auto', name: 'Auto', seats: 3, eta: '3 mins away', desc: 'Affordable auto rides' },
    { type: 'car', name: 'Cab', seats: 4, eta: '2 mins away', desc: 'Comfortable, compact rides' },
]

const VehiclePanel = (props) => {
    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setVehiclePanel(false)
            }}><i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-extrabold mb-4'>Choose a ride</h3>
            {options.map(option => (
                <div key={option.type} onClick={() => {
                    props.setConfirmRidePanel(true)
                    props.selectVehicle(option.type)
                }} className='flex border-2 border-gray-100 active:border-ink mb-2 rounded-2xl w-full p-3 items-center gap-3 cursor-pointer hover:border-brand hover:bg-brand-soft active:scale-[0.99] transition'>
                    <VehicleIcon type={option.type} className='h-12 w-12 text-2xl' />
                    <div className='flex-1 min-w-0'>
                        <h4 className='font-bold text-base'>{option.name} <span className='text-xs font-medium text-gray-600'><i className="ri-user-3-fill"></i> {option.seats}</span></h4>
                        <h5 className='inline-block bg-brand-soft text-xs font-semibold px-2 py-0.5 rounded-full my-0.5'><i className="ri-time-line"></i> {option.eta}</h5>
                        <p className='font-normal text-xs text-gray-600 truncate'>{option.desc}</p>
                    </div>
                    <h2 className='text-lg font-extrabold'>₹{props.fare[ option.type ]}</h2>
                </div>
            ))}
        </div>
    )
}

export default VehiclePanel
