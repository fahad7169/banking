import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import { redirect } from "next/navigation";
import { memo } from "react";
import { getLoggedInUser } from "@/lib/actions/user.actions";

export default async function RootLayout({
  children, 
}: {
  children: React.ReactNode; 
}) {
  
  
  const MemoizedMobileNav=memo(MobileNav);
 
  const loggedInUser=await getLoggedInUser()
 
  if(!loggedInUser) redirect('/sign-in')
 

  if(!loggedInUser) redirect('/sign-in')
  return (
    <main className="flex w-full h-screen font-inter">
         
         <Sidebar user={loggedInUser}/>
         <div className="flex size-full flex-col">
            <div className="root-layout">
              <Image src={"/icons/logo.svg"} width={30} height={30} alt="logo"/>
              <div>
                <MemoizedMobileNav user={loggedInUser}/>
              </div>
            </div>
        {children}
         </div>
    </main>
  );
}
