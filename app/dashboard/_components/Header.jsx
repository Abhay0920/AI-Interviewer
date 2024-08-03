"use client"
import React from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'

function Header() {
  
  const path = usePathname();

  return (
    <div className='flex p-4 items-center justify-between bg-secondary shadow-md'>
       <Image src={'/logo.svg'} width={40} height={40} alt='logo'/>
       <ul className='flex gap-6' >
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
          ${path == '/dashboard' && 'text-primary font-bold'}
        `}>Dashboard</li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
          ${path == '/dashboard/questions' && 'text-primary font-bold'}
        `} >Question</li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
          ${path == '/dashboard/upgrade' && 'text-primary font-bold'}
        `}>upgrade</li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
          ${path == '/dashboard/works' && 'text-primary font-bold'}
        `}>How it works</li>
       </ul>
       <UserButton/>
    </div>
  )
}

export default Header