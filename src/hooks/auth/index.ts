import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "@/services/auth";

const QUERY_KEY = "qkAuth";

interface LoginInput {
  email: string;
  senha: string;
}

interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    nome: string;
    email: string;
    telefone: string;
    meta: number;
    receita: number;
    d_nas: string;
  };
}

const SignIn = () => {
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, Error, LoginInput>({
    mutationFn: ({ email, senha }) => loginUser(email, senha),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
    onError: (error) => {
      console.error("Erro ao fazer login:", error.message);
    },
  });
};

const SignOut = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      localStorage.removeItem("access_token");
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: [QUERY_KEY] });
    },
  });
};

export const useAuth = {
  SignIn,
  SignOut,
};