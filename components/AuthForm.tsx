"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { authFormSchema } from '@/lib/utils'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"


import { z } from "zod"
import CustomInput from './CustomInput'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { getLoggedInUser, signin, signup } from '@/lib/actions/user.actions'
import PlaidLink from './PlaidLink'
import useLoadingBar from '@/lib/hooks/useLoadingBar'
import LoadingBar from 'react-top-loading-bar'




const AuthForm = ({ type}:{type:string}) => {

  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const router=useRouter()

  const {progress,handleLinkClick,setProgress1}=useLoadingBar()
  
  const formSchema=authFormSchema(type);
  
        // 1. Define your form.
        const form = useForm<z.infer<typeof formSchema>>({
          resolver: zodResolver(formSchema),
          defaultValues: {
            email: "",
            password: "",
          },
        })
       
        // 2. Define a submit handler.
        const onSubmit = async (data: z.infer<typeof formSchema>) => {
          setIsLoading(true)
          try {
          // Sign up with appwrite and create plaid token
          if(type === 'sign-up'){
            const userData={
              firstName:data.firstName!,
              lastName:data.lastName!,
              address1:data.address1!,
              city:data.city!,
              state:data.state!,
              postalCode:data.postalCode!,
              dateOfBirth:data.dateOfBirth!,
              ssn:data.ssn!,
              email:data.email,
              password:data.password,
            }

            const newUser=await signup(userData);

            setUser(newUser)
           
        
          }
          if(type === 'sign-in'){
          
             const response = await signin({
              email: data.email,
              password: data.password,
             })

           
             if(response)  router.push('/')
             handleLinkClick()
              
              
          }

          } catch (error) {
            // Handle any errors that occur during submission.
            console.error(error)
            setIsLoading(false)
          } finally {
            setIsLoading(false)
          }
        }

  return (
    <section className='auth-form relative'>
      <LoadingBar
                color='#f11946'
                progress={progress}
                onLoaderFinished={() => setProgress1(0)}
            />
     
     <header className='flex flex-col md:gap-8'>
     <Link href="/" className='flex cursor-pointer absolute top-5 items-center gap-2 '>
                        <Image src={"/icons/logo.svg"} width={34} height={34} alt='Silk Logo' />
                        <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Silk</h1>
    </Link>
    <div className='flex flex-col gap-1 md:gap-3 mt-5'>
        <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
            {user ? 'Link Account':type === 'sign-in' ? 'Sign In' : 'Sign Up'}
            <p className='text-16 font-normal text-gray-600'>
              {user ? 'Link your account':type === 'sign-in' ? 'to continue' : 'to get started'}
            </p>
        </h1>
    </div>
     </header>
     {user ? (
        <div className='flex flex-col gap-4'>
         <PlaidLink user={user} variant='primary'/>
        </div>
     ): ( 
         <>
          <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

      {type==='sign-up' && (
        <>
        <div className='flex gap-4'>

          <CustomInput control={form.control} name="firstName" label="First Name" placeholder="Enter your First Name" type="text"/>
          <CustomInput control={form.control} name="lastName" label="Last Name" placeholder="Enter your Last Name" type="text"/>
        </div>
         

          <CustomInput control={form.control} name="address1" label="Address" placeholder="Enter your specific Address" type="text"/>
          <CustomInput control={form.control} name="city" label="City" placeholder="Enter your City" type="text"/>
        
          <div className='flex gap-4'>

          <CustomInput control={form.control} name="state" label="State" placeholder="Example: NY" type="text"/>
          <CustomInput control={form.control} name="postalCode" label="Postal Code" placeholder="Example: 12345" type="text"/>
          </div>
          <div className='flex gap-4'>

          <CustomInput control={form.control} name="dateOfBirth" label="Date of Birth" placeholder="yyyy-mm-dd" type="text"/>
          <CustomInput control={form.control} name="ssn" label="SSN" placeholder="Example: 1234" type="text"/>
          </div>
        </>
      )}

      <CustomInput control={form.control} name="email" label="Email" placeholder="Enter your Email" type="text"/>


      <CustomInput control={form.control} name="password" label="Password" placeholder="Enter your Password" type="password"/>
     
      
      <div className='flex flex-col gap-4'>
        <Button type="submit" className='form-btn' disabled={isLoading}>
          {isLoading ? (
           <>
            <Loader2 size={20} className='animate-spin' /> &nbsp;
            Loading...
           </>
          ): type === 'sign-in' ? 'Sign In' : 'Sign Up'}
        </Button>
        </div>
      </form>
    </Form>

    <footer className='flex justify-center gap-1'>
      <p className='text-14 font-medium text-gray-500'>
        {type === 'sign-in' ? 'Don’t have an account?' : 'Already have an account?'}
      </p>
      <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className='text-14 font-medium text-bankGradient'>
        {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
      </Link>
    </footer>
         </>
     )}
    </section>
  )
}

export default AuthForm
