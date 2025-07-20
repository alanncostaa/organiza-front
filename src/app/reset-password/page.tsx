"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/auth";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";


export default function Login() {
  const router = useRouter();

  const { mutateAsync: resetPass } = useAuth.ResetPassword()


  const [senha1, setSenha1] = useState("");
  const [senha2, setSenha2] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [token, setToken] = useState<string | null>(null); 
    useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl); 
    }
  }, []); 

  const handleSubmit = async (e: React.FormEvent) => {
    console.log(token)
    e.preventDefault();
    setErrorMessage(""); 

    if (senha1 !== senha2) {
      setErrorMessage("As senhas não conferem!");
      return;
    }

    if (!token) {
      setErrorMessage("Token de recuperação inválido!");
      return;
    }

    try {
    
      await resetPass({ token, newPassword: senha1 });
    } catch (error) {
      console.error(error);
      setErrorMessage("Erro ao redefinir a senha!");
    }
  };

  const handleLoginRedirect = () => {
    router.push("/Login");
  };

  return (
    <>
    <ToastContainer />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Altere sua Senha
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Senha:
              </label>
              <div className="mt-2">
                <input
                  id="senha1"
                  name="senha1"
                  type="password"
                  required
                  value={senha1}
                  onChange={(e) => setSenha1(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                />
              </div>
            </div>

        
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Confirme sua senha:
              </label>
              <div className="mt-2">
                <input
                  id="senha2"
                  name="emai2"
                  type="password"
                  required
                  value={senha2}
                  onChange={(e) => setSenha2(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                />
              </div>
            </div>

        
            {errorMessage && (
              <p className="text-red-500 text-sm mt-1 text-center">{errorMessage}</p>
            )}

            <div>
              <button
                type="submit"
                
                className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:opacity-60"
              >
                Salvar
              </button>
              
            </div>
            <div>
              <button
                type="button"
                onClick={handleLoginRedirect}
                className="flex w-full justify-center rounded-md border-2 border-green-600 px-3 py-1.5 text-sm/6 font-semibold text-green-600 shadow-xs hover:bg-green-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:opacity-60"
              >
                Login
              </button>
            </div>
          </form>

          
        </div>
      </div>
    </>
  );
}