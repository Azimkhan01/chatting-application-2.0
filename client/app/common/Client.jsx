import Display from '@/components/common/Display'
import Input from '@/components/common/Input'
import Pop from '@/components/common/Pop'
import React from 'react'

function Client() {
  return (
    <section className='h-screen flex flex-col justify-between'>
        <Pop/>
        <Display/>
        <Input/>
       
    </section>
  )
}

export default Client