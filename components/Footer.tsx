import React from 'react'
import Image from 'next/image'
import { logoutAccount } from '@/lib/actions/user.actions'
import { useRouter } from 'next/navigation'
import LoadingBar from 'react-top-loading-bar'
import useLoadingBar from '@/lib/hooks/useLoadingBar'

const Footer = ({user, type='desktop'}:FooterProps) => {
    const router=useRouter()
    const {progress,handleLinkClick,setProgress1}=useLoadingBar()
  const handlLogout=async()=>{
       handleLinkClick()
      const loggedOut=await logoutAccount()
      if(loggedOut) router.push("/sign-in")
  }
    return (
    <footer className='footer'>
        <LoadingBar
                color='#f11946'
                progress={progress}
                onLoaderFinished={() => setProgress1(0)}
            />
        <div className={type === 'mobile' ? 'footer_name-mobile' : 'footer_name'}>
            <p className='text-xl font-bold text-gray-700'>
                {user?.firstName[0]}
            </p>
        </div>

        <div className={type === 'mobile' ? 'footer_email-mobile' : 'footer_email'}>
        <h1 className='text-14 truncate text-gray-700'>
            {user?.firstName}
        </h1>
        <p className='text-14 font-normal truncate text-gray-600'>
            {user?.email}
        </p>
        </div>
        <div className='footer_image' onClick={handlLogout}>
            <Image src="/icons/logout.svg" fill alt="plus" />
        </div>
    </footer>
  )
}

export default Footer