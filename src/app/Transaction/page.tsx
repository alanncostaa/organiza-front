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


export default function Transaction() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUserOpen, setIsModalUserOpen] = useState(false);
  const { data: transactions , isLoading } = useTransaction.ListAll();
  const { mutateAsync: addTransaction } = useTransaction.Create();
  const { mutateAsync: updateUser } = useUser.Update();

  const router = useRouter();
  const [user, setUser] = useState<{ id: string } | null>(null);

  useEffect(() => {
    const logged = getLoggedUser();
    if (logged) {
      setUser({ id: logged.sub });
    } else {
      router.push('/Login'); // se não tiver token, redireciona
    }
  }, []);


  const { data: userData, isLoading: userLoading, isError: userError } = useUser.GetById(user?.id || '');
  console.log(userError)

  const openModal = () => setIsModalOpen(true);
  const openModalUser = () => setIsModalUserOpen(true);

  const handleCloseModal = () => setIsModalOpen(false);
  const handleCloseModalUser = () => setIsModalUserOpen(false);

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

  const handleAddModal = (newTransaction: ITransaction) => {
    addTransaction(newTransaction);
  }

  const totalTransactions: ITotal = useMemo(() => {
    if (!transactions || transactions.length === 0) {
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
  if (isLoading) return <div>Loading...</div>;
  if (userLoading) return <div>Loading...</div>;
  return (
    <div>
      <ToastContainer />
      <Header openModalUser={openModalUser} userData={userData} onLogout={handleOnLogout} openModal={openModal} />
      <BodyContainer>
        <CardContainer totals={totalTransactions} />
        <Table data={transactions} />
        {isModalUserOpen && userData && (<UserFormModal saveUserData={handleSaveChange} closeModal={handleCloseModalUser} formTitle="Editar dados" userData={userData}/>)}
        { isModalOpen && <FormModal closeModal={handleCloseModal} formTitle="Adicionar Transação" addTransaction={handleAddModal} /> }
      </BodyContainer>
    </div>
  );
}
