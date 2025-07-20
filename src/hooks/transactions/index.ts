import { createTransaction, getTransactions, getTransactionsByUser, deleteTransaction, updateTransaction } from "@/services/transactions"
import { ITransaction } from "@/types/transaction"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const QUERY_KEY = 'qkTransaction'

const Create = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
    }
  })
}

const GetTransactionByUser = (userId: string) => {
  return useQuery<ITransaction, Error>({
    queryKey: [QUERY_KEY, userId], 
    queryFn: () => getTransactionsByUser(userId)
  });
};

const ListAll = () => {
  return useQuery({ queryKey: [QUERY_KEY], queryFn: getTransactions})
}

const Update = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
};


const Delete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
};

export const useTransaction = {
    Create,
    ListAll,
    GetTransactionByUser,
    Update,
    Delete
}

