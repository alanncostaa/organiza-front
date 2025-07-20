import { createUser, getUserData, updateUserData, getUserDataById} from "@/services/user"; // Importe suas funções de serviço
import { IUser } from "@/types/user";
import { useMutation, useQuery, useQueryClient} from "@tanstack/react-query";


const QUERY_KEY = "qkUser";

type UserQueryResponse = IUser | null; 

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

const List = () => {
  return useQuery<UserQueryResponse>({
    queryKey: [QUERY_KEY],
    queryFn: getUserData,
  });
};

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
    queryKey: [QUERY_KEY, userId], 
    queryFn: () => getUserDataById(userId), 
  });
};


export const useUser = {
  Create,
  List,
  Update,
  GetById,
};