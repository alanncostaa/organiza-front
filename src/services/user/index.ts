import { IUser } from "@/types/user";
import { api } from "../api";
import { toast } from "react-toastify";

export async function getUserData() {
    try {
        const response = await api.get('/user'); 
        return response.data;
    } catch (error) {
        throw new Error("Erro ao buscar dados do usuário: " + error);
    }
}

export async function updateUserData(userData: IUser) {
    if (!userData.id) {
    throw new Error("ID do usuário é obrigatório para atualização.");
  }

  const response = await api.put(`/user/${userData.id}`, userData);

  // Verificação segura
  if (!response || !response.data) {
    throw new Error("Resposta da API inválida.");
  }

  return response.data;
}

export async function getUserDataById(userId: string) {
    try {
        const response = await api.get(`/user/${userId}`); 
        return response.data;
    } catch (error) {
        throw new Error("Erro ao buscar dados do usuário por ID: " + error);
    }
}

export async function createUser(userData: IUser) {
    try {
        const response = await api.post('/user', userData); 
        toast.success("Usuário criado com sucesso!");
        return response.data;
    } catch (error) {
        throw new Error("Erro ao criar usuário: " + error);
    }
}