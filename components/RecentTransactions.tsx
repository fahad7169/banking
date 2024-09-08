'use client'
import React, { useCallback, useState } from 'react'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BankTabItem } from './BankTabItem'
import BankInfo from './BankInfo'
import TransactionTable from './TransactionTable'
import { Pagination } from './Pagination'

const RecentTransactions = ({
    accounts,
    transactions=[],
    appwriteItemId,
    page=1
}:RecentTransactionsProps) => {

  const MemoizedPagination=React.memo(Pagination);
  const MemoizedTransactionTable=React.memo(TransactionTable)
  const MemoizedBankInfo=React.memo(BankInfo)

const [totalPages, setTotalPages] = useState(0)
const [currentTransactions, setCurrentTransactions] = useState(transactions)
useCallback(() => {
  const rowsPerPage = 10;
  const totalPages= Math.ceil(transactions.length / rowsPerPage);
  setTotalPages(totalPages)

  const indexOfLastTransaction = page * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
  setCurrentTransactions(currentTransactions)
  
},[page])
  return (
    <section className='recent-transactions'>
        <header className='flex items-center justify-between'>
          <h2 className='recent-transactions-label'>
            Recent Transactions
          </h2>
          <Link href={`/transactions-history/?id=${appwriteItemId}`} className='view-all-btn'>
          View all
          </Link>
        </header>
        <Tabs defaultValue={appwriteItemId} className="w-full">
  <TabsList className='recent-transactions-tablist'>
   {accounts?.map((account:Account)=>(
    <TabsTrigger key={account.id} value={account.appwriteItemId}>
     <BankTabItem
     key={account.id}
     account={account}
     appwriteItemId={appwriteItemId}
     />
    </TabsTrigger>
   ))}
  </TabsList>
  {accounts?.map((account:Account)=>(
    <TabsContent key={account.id} value={account.appwriteItemId}
    className='space-y-4'>
        <MemoizedBankInfo
        account={account}
        appwriteItemId={appwriteItemId}
        type="full"
        />
      <MemoizedTransactionTable
      transactions={currentTransactions}/>

      {totalPages > 1 && (
        <div className='my-4 w-full'>
            
          <MemoizedPagination 
          totalPages={totalPages}
          page={page}
          />
        </div>
      )}
        </TabsContent>
  ))}
  
</Tabs>

    </section>
  )
}

export default RecentTransactions