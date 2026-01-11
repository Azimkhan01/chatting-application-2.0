import React from 'react'

function Reciever({name,message}) {

       const now = new Date();

const year = now.getFullYear();
const month = now.getMonth() + 1; // 0-based
const day = now.getDate();

const hours = now.getHours();
const minutes = now.getMinutes();
const seconds = now.getSeconds();

  return (
    <div className='m-2 rounded-md p-2 w-5/6 md:w-3/6 bg-green-200 self-end'>
            <div className='flex justify-between'>
                <p className='text-neutral-500 capitalize' >{name}</p>
                <p className='text-neutral-500 ' >{`${day}/${month}/${year} ${hours}:${minutes}:${seconds}`}</p>
            </div>
            <div>
                <p>{message}</p>
            </div>
        </div>
  )
}

export default Reciever