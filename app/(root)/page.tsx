import HeaderBox from '@/components/HeaderBox'
import React from 'react'
import RecentTransactions from '@/components/RecentTransactions'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import RightSidebar from '@/components/RightSidebar'
import { getLoggedInUser } from '@/lib/actions/user.actions'
import { getAccount, getAccounts } from '@/lib/actions/bank.actions'


const Home = async({searchParams:{id,page}}:SearchParamProps) => {
  
  const MemoizedRecentTransaction = React.memo(RecentTransactions);
  const MemoizedTotalBalanceBox=React.memo(TotalBalanceBox)
  const MemoizedRightSidebar=React.memo(RightSidebar)
  const MemoizedHeaderBox=React.memo(HeaderBox)

  
 
  const currentPage=Number(page as string) || 1 
  const loggedIn=await getLoggedInUser()
  const accounts=await getAccounts({
    userId:loggedIn?.$id
  })

  if(!accounts) return;

  const accountsData = accounts?.data;
  const appwriteItemId=(id as string) || accountsData[0]?.appwriteItemId

  const account=await getAccount({
    appwriteItemId
  })


    // const { loggedIn, accountsData, account, isLoading,appwriteItemId } = useFetchBankData();
  
    // const currentPage = Number(page) || 1;
  
    // if (isLoading) {
    //   return <div>Loading...</div>;
    // }
  




 
  return (
  
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
        <MemoizedHeaderBox
        type="greeting"
        title="Welcome"
        user={loggedIn?.firstName || "Guest"}
        subtext="Access and manage your account and transactions efficiently" />
      
       <MemoizedTotalBalanceBox 
        accounts={accountsData}
        totalBanks={accountsData.totalBanks}
        totalCurrentBalance={accounts?.totalCurrentBalance}
        />
       
        </header>
        
     
         <MemoizedRecentTransaction
          accounts={accountsData}
          transactions={account?.transactions}
          appwriteItemId={appwriteItemId}
          page={currentPage}
         />
     
      </div>
    
     <MemoizedRightSidebar
       user={loggedIn}
      transactions={account?.data.transactions}
      banks={accountsData?.slice(0,2)}
      />
   
    </section>
 
  )
}

export default Home