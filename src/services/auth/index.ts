import { AxiosError } from 'axios';
import { api } from '../api';
import { toast } from 'react-toastify';

export async function loginUser(email: string, senha: string) {
  try {
    const response = await api.post('/auth/login', { email, senha });

    const { access_token } = response.data;
    localStorage.setItem('access_token', access_token); 
    const token = response.data.access_token;
  localStorage.setItem('token', token);
    toast.success('Login realizado com sucesso!');
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      
      const errorMessage = error.response?.data?.message || 'Erro desconhecido';
      toast.error('Erro ao realizar o login: ' + errorMessage);
    } else {
      toast.error('Erro desconhecido');
    }

    throw new Error('Erro ao realizar o login: ' + error);
  }
}

export async function getCurrentUser() {
  const response = await api.get("/auth/me");
  return response.data;
}