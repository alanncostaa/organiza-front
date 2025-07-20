import { createUser, getUserData, updateUserData, getUserDataById} from "@/services/user"; // Importe suas funções de serviço
import { IUser } from "@/types/user";
import { useMutation, useQuery, useQueryClient} from "@tanstack/react-query";


// Defina a chave de consulta (QUERY_KEY) para o usuário
const QUERY_KEY = "qkUser";

// Tipagem para o retorno da consulta de dados do usuário
type UserQueryResponse = IUser | null; // Aqui você define o tipo de retorno esperado para o usuário

// Função para criar um usuário
const Create = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
    onError: (error: Error) => {
      console.error("Erro ao criar usuário:", error);
    },
  });
};

// Função para listar (obter) os dados do usuário
const List = () => {
  return useQuery<UserQueryResponse>({
    queryKey: [QUERY_KEY],
    queryFn: getUserData,
  });
};

// Função para atualizar os dados do usuário
const Update = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
    onError: (error: Error) => {
      console.error("Erro ao atualizar dados do usuário:", error);
    },
  });
};

const GetById = (userId: string) => {
  return useQuery<IUser, Error>({
    queryKey: [QUERY_KEY, userId], // A chave agora inclui o userId para tornar a consulta única por usuário
    queryFn: () => getUserDataById(userId), // Usando a função que faz a consulta com ID
  });
};

// Expondo as funções de criação, listagem e atualização do usuário
export const useUser = {
  Create,
  List,
  Update,
  GetById,
};