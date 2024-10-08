"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Link from 'next/link'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import Footer from './Footer'
import PlaidLink from './PlaidLink'


const MobileNav = ({ user }: MobileNavProps) => {
    const [windowWidth, setWindowWidth] = useState<number | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWindowWidth(window.innerWidth);
        }
    }, []);
    const pathname = usePathname()
    return (
        <section className='w-full max-w-[264px]'>
            <Sheet>
                <SheetTrigger>
                    <Image src={"icons/hamburger.svg"}
                        width={30}
                        height={30}
                        alt='menu'
                        className='cursor-pointer' />
                </SheetTrigger>
                <SheetContent className='border-none bg-white'>

                    <Link href="/" className='flex cursor-pointer items-center gap-2'>
                        <Image src={"/icons/logo.svg"} width={34} height={34} alt='Silk Logo' />
                        <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Silk</h1>
                    </Link>
                    <div className='mobilenav-sheet'>
                        <SheetClose asChild>
                            <nav className='flex h-full flex-col gap-6 pt-16 text-white'>
                                {sidebarLinks.map((item) => {

                                    const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)
                                    return (
                                        <SheetClose asChild key={item.route}>


                                            <Link prefetch={true} href={item.route} key={item.label} className={cn('mobilenav-sheet_close w-full', { 'bg-bankGradient': isActive })}>

                                                <Image src={item.imgURL} alt={item.label} width={20}
                                                    height={20} className=
                                                    {cn({
                                                        'brightness-[3] invert-0': isActive
                                                    })} />

                                                <p className={cn('text-16 text-black-2 ', {
                                                    '!text-white': isActive
                                                })}>
                                                    {item.label}
                                                </p>
                                            </Link>
                                        </SheetClose>
                                    )
                                })}

                              <PlaidLink user={user} variant='ghost'/>
                            </nav>
                        </SheetClose>
                       <Footer type={windowWidth!=null && windowWidth < 768 ? 'mobile' : 'desktop'} user={user}/>
                    </div>

                </SheetContent>
            </Sheet>

        </section>
    )
}

export default MobileNav
