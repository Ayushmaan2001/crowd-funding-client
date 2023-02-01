import React from 'react'

const CountBox = ({title,value}) => {
  return (
    <div className='flex flex-col items-center w-[150px]'>
        <h4 className='font-epilogue font-bold text-[20px] text-white p-3 bg-[#1c1c24] rounded-t-[10px] w-full text-center truncate'>{title}</h4>
        <p className='font-epilogue font-normal text-[16px] text-[#808191] bg-[#28282e] px-3 py-2 w-full rounded-b-[10px] text-center'>{value}</p>
    </div>
  )
}

export default CountBox