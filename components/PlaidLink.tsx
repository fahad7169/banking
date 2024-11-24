import React, { useCallback,useEffect,useState } from 'react'
import { Button } from './ui/button'
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from 'react-plaid-link'
import { useRouter } from 'next/navigation'
import { createLinkToken, exchangePublicToken } from '@/lib/actions/user.actions'
import Image from 'next/image'
import useLoadingBar from '@/lib/hooks/useLoadingBar'
import LoadingBar from 'react-top-loading-bar'

const PlaidLink = ({user, variant}: PlaidLinkProps) => {
    const [token, setToken] = useState('')
    const router=useRouter();

    const {progress,handleLinkClick,setProgress1}=useLoadingBar()

    useEffect(() => {
        const getLinkToken = async () => {
            const data=await createLinkToken(user);

            setToken(data?.link_token)
    }
    getLinkToken()
}, [user])
  const onSuccess = useCallback<PlaidLinkOnSuccess> (async (public_token :string) => {

      await exchangePublicToken({
        publicToken: public_token, 
        user,
    })

    router.push('/')
    handleLinkClick
  },[user])
      
    const config: PlaidLinkOptions = {
      token,
      onSuccess
  }

  const {open,ready} = usePlaidLink(config)


    return (
   <>
   <div>
   <LoadingBar
                color='#f11946'
                progress={progress}
                onLoaderFinished={() => setProgress1(0)}
            />
   </div>
   {variant === "primary" ? (
    <Button
    onClick={() => open()}
    disabled={!ready}
     className='sidebar-link bottom-24 text-black-2/[0.9]'>
        Connect Bank
    </Button>
   ):variant === "ghost" ? (
    <Button variant={"ghost"} onClick={() => open()} className='sidebar-link absolute bottom-32'>
         <Image 
    src={"/icons/connect-bank.svg"}
    alt='Connect Bank'
    width={20}
    height={20}
    />
      <p className='text-16 text-black-2/[0.9]'>
        Connect Bank
      </p>
    </Button>
   ): (<Button onClick={() => open()} className='sidebar-link bottom-24'>
    <Image 
    src={"/icons/connect-bank.svg"}
    alt='Connect Bank'
    width={24}
    height={24}
    />
      <p className='text-[16px] text-black-2/[0.9] max-xl:hidden'>
        Connect Bank
      </p>
    </Button>)}
   </>
  )
}

export default PlaidLink
