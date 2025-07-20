import { IUser } from "@/types/user";
import { useState } from "react";

interface IHeaderProps {
  openModal: () => void;
  openModalUser: () => void;
  userData?: IUser; // Tornando userData opcional
  onLogout: () => void;
}

export function Header({ openModal, openModalUser, userData, onLogout }: IHeaderProps) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => setDropdownOpen(prev => !prev);

  return (
    <header className="bg-header w-full h-[212px]">
      <div className="max-w-[1120px] mx-auto flex justify-between pt-8">
        <div className="flex items-center">
          {/* Logo */}
          <img src="/logo.png" width={172} height={40} alt="Logo Image" />
        </div>
        <div className="flex items-center space-x-4 "> 
          {/* Botão "Nova transação" e Bola cinza lado a lado */}
          <button
            onClick={openModal}
            className="bg-button text-white px-8 py-3 rounded-md hover:opacity-80"
          >
            Nova transação
          </button>
          <div className="relative">
            <button onClick={handleDropdownToggle} className="flex items-center hover:opacity-80">
              <div className="w-10 h-10 bg-gray-400 rounded-full mr-2"></div> {/* Bola cinza */}
              <div className="text-white">{userData?.nome}</div>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white p-3 shadow-lg rounded-lg">
                
                <button
                  onClick={openModalUser}
                  className="block text-black mb-2"
                >
                  Dados
                </button>
                <button
                  onClick={onLogout}
                  className="block text-red-600"
                >
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
