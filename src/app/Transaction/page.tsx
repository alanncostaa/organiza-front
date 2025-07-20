"use client";
import { BodyContainer } from "@/components/BodyContainer";
import { CardContainer } from "@/components/CardContainer";
import { FormModal } from "@/components/FormModal";
import { Header } from "@/components/Header";
import { Table } from "@/components/Table";
import { UserFormModal } from "@/components/UserModal";
import { useTransaction } from "@/hooks/transactions";
import { useUser } from "@/hooks/user";
import { ITotal, ITransaction } from "@/types/transaction";
import { IUser } from "@/types/user";
import { useMemo, useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { getLoggedUser } from '@/utils/auth';
import { useRouter } from 'next/navigation';
import { ConfirmationModal } from "@/components/ConfirmationModal";


export default function Transaction() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUserOpen, setIsModalUserOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const [selectedTransaction, setSelectedTransaction] = useState<ITransaction | null>(null);

  const { mutateAsync: addTransaction } = useTransaction.Create();
  const { mutateAsync: updateUser } = useUser.Update();

  const router = useRouter();
  const [user, setUser] = useState<{ id: string } | null>(null);
  const { data: transactions , isLoading } = useTransaction.GetTransactionByUser(user?.id || '')

  const { mutateAsync: deleteTransaction } = useTransaction.Delete(); // Mutação para excluir a transação
  const { mutateAsync: updateTransaction } = useTransaction.Update();


  useEffect(() => {
    const logged = getLoggedUser();
    if (logged) {
      setUser({ id: logged.sub });
    } else {
      router.push('/Login'); 
    }
  }, []);


  const { data: userData, isLoading: userLoading, isError: userError } = useUser.GetById(user?.id || '');
  console.log(userError)

  const openModal = () => setIsModalOpen(true);
  const openModalUser = () => setIsModalUserOpen(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };
  const handleCloseModalUser = () => setIsModalUserOpen(false);

   const handleCloseConfirmationModal = () => setIsConfirmationModalOpen(false);

  const handleOnLogout = () => {
    localStorage.removeItem('token');
    router.push('/Login');
  }

 const handleSaveChange = (newUser: IUser) => {
  const formattedUser: IUser = {
    ...newUser,
    d_nas: new Date(newUser.d_nas).toISOString()
  };
  console.log(formattedUser.senha)
  updateUser(formattedUser);
};

  

  const totalTransactions: ITotal = useMemo(() => {
  if (!Array.isArray(transactions) || transactions.length === 0) {
    console.log(transactions)
    return { totalIncome: 0, totalOutcome: 0, total: 0 };
  }
  
    return transactions.reduce(
      (acc: ITotal, { type, price }: ITransaction) => {
        if (type === 'INCOME') {
          acc.totalIncome += price;
          acc.total += price;
        } else if (type === 'OUTCOME') {
          acc.totalOutcome += price;
          acc.total -= price;
        }
        return acc;
      },
      { totalIncome: 0, totalOutcome: 0, total: 0 }
    );
  }, [transactions]);

  const handleEdit = (transaction: ITransaction) => {
    setSelectedTransaction(transaction);
    openModal();
  };

  const handleDelete = (transaction: ITransaction) => {
    setSelectedTransaction(transaction);
    setIsConfirmationModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedTransaction && selectedTransaction.id) {
      await deleteTransaction(selectedTransaction.id);
      setIsConfirmationModalOpen(false);
    }
  };

  const handleUpdateTransaction = async (updatedTransaction: ITransaction) => {
    console.log(updatedTransaction)
    if (selectedTransaction) {
      await updateTransaction({ ...updatedTransaction, id: selectedTransaction.id });
      setIsModalOpen(false);
      setSelectedTransaction(null);
    }
  };

  const handleAddTransaction = async (newTransaction: ITransaction) => {
    const formattedTransaction: ITransaction = {
      ...newTransaction,
      iduser: userData?.id || ""
    };
    await addTransaction(formattedTransaction);
    setIsModalOpen(false); 
  };

  if (isLoading) return <div>Loading...</div>;
  if (userLoading) return <div>Loading...</div>;
  return (
    <div>
      <div className="min-h-screen bg-gray-50">
      <ToastContainer />
      <Header openModalUser={openModalUser} userData={userData} onLogout={handleOnLogout} openModal={openModal} />
      <BodyContainer>
        <CardContainer totals={totalTransactions} />
        {Array.isArray(transactions) && transactions.length > 0 ? (
          <Table
            data={transactions}
            actions={[
              {
                label: "Editar",
                onClick: handleEdit,
              },
              {
                label: "Excluir",
                onClick: handleDelete,
              },
            ]}
          />
        ) : (
          <div>Sem Transações</div>
        )}
        {isModalUserOpen && userData && <UserFormModal saveUserData={handleSaveChange} closeModal={handleCloseModalUser} formTitle="Editar dados" userData={userData} />}
        {isModalOpen && (
          <FormModal
            closeModal={handleCloseModal}
            formTitle={selectedTransaction ? "Editar Transação" : "Nova Transação"}
            initialData={selectedTransaction || {iduser: "", title: "", type: "INCOME", category: "", price: 0, data: new Date() }}
            onSave={selectedTransaction ? handleUpdateTransaction : handleAddTransaction}
          />
        )}
        {isConfirmationModalOpen && (
          <ConfirmationModal
            message="Tem certeza que deseja excluir esta transação?"
            onConfirm={handleConfirmDelete}
            onCancel={handleCloseConfirmationModal}
          />
        )}
      </BodyContainer>
      </div>
    </div>
  );
}
