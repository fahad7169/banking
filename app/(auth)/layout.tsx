import Image from "next/image";
import { getLoggedInUser } from '@/lib/actions/user.actions'
import { redirect } from "next/navigation";


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedInUser=await getLoggedInUser()
  // if(loggedInUser) redirect('/')
  return (
   
   <main className="flex min-h-screen w-full justify-between font-inter">
    {children}
    <div className="auth-asset">
        <div>
            <Image
             src={"/icons/auth-image.svg"} 
             width={500} 
             height={500} alt="logo"/>
        </div>
    </div>
   </main>
  );
}
