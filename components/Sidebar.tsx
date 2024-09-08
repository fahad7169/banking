"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Footer from './Footer'
import PlaidLink from './PlaidLink'
import LoadingBar from 'react-top-loading-bar'
import useLoadingBar from '@/lib/hooks/useLoadingBar'
const Sidebar = ({user}:SiderbarProps )=> {
  
   const {progress,handleLinkClick,setProgress1}=useLoadingBar()
    const pathname = usePathname();  // Get the current pathname

   
  
  return (
    <section className='sidebar'>
      <LoadingBar
                color='#f11946'
                progress={progress}
                onLoaderFinished={() => setProgress1(0)}
            />
     <nav className='flex flex-col gap-4'>
      <Link href="/" className='mb-12 flex cursor-pointer items-center gap-2'>
      <Image src="/icons/logo.svg" width={34} height={34} alt='Horizon Logo' className='size-[24px] max-sl:size-14'/>
      <h1 className='sidebar-logo'>Horizon</h1>
      </Link>
      {sidebarLinks.map((item)=>{
        const isActive=pathname===item.route || pathname.startsWith(`${item.route}/`)
        return(
            <Link prefetch={true} onClick={handleLinkClick} href={item.route} key={item.label} className={cn('sidebar-link',{'bg-bankGradient':isActive})}>
                <div className='relative size-6'>
                    <Image src={item.imgURL} alt={item.label} fill className={cn({
                        'brightness-[3] invert-0':isActive 
                    })}/>
                </div>
                <p className={cn('sidebar-label',{
                    '!text-white':isActive
                })}>
                    {item.label}
                    </p>
            </Link>
        )
      })}
      <PlaidLink user={user}/>
     </nav>
     <Footer user={user} type="mobile"/>
    </section>
  )
}

export default Sidebar
