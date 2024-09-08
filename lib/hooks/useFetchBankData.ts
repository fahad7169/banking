'use client'
import { useQuery } from 'react-query';
import { getAccounts, getAccount } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
// Function to fetch all required data
export const useFetchBankData = () => {
  // Fetch logged-in user
  const { data: loggedIn, isLoading: isUserLoading } = useQuery('loggedInUser', getLoggedInUser, {
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
  });

  // Fetch accounts based on logged-in user
  const { data: accounts, isLoading: isAccountsLoading } = useQuery(
    ['accounts', loggedIn?.$id],
    () => getAccounts({ userId: loggedIn?.$id }),
    {
      enabled: !!loggedIn, // Only run this query if loggedIn user exists
      staleTime: 5 * 60 * 1000,
    }
  );

  // Fetch account details based on selected account
  const accountId = accounts?.data?.[0]?.appwriteItemId;
  const { data: account, isLoading: isAccountLoading } = useQuery(
    ['account', accountId],
    () => getAccount({ appwriteItemId: accountId }),
    {
      enabled: !!accountId, // Only fetch account if accountId exists
      staleTime: 5 * 60 * 1000,
    }
  );

  // Return the data and loading states
  return {
    loggedIn,
    accountsData: accounts?.data,
    account,
    isLoading: isUserLoading || isAccountsLoading || isAccountLoading,
    appwriteItemId: accountId,
  };
};

