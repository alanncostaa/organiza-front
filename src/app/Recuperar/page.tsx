"use client";
import { useState } from "react";
import { useAuth } from "@/hooks/auth";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";


export default function Login() {
  const router = useRouter();

  const { mutateAsync: sendLink } = useAuth.SendRecoveryLink()


  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    

    try {
      await sendLink(email);
      
    } catch (error) {
        console.log(error)
      setErrorMessage("Email não encontrado!");
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
            Enviar Link de Recuperação
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                Enviar link
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