import { IUser } from "@/types/user";
import { useState } from "react";

interface IHeaderProps {
  openModal: () => void;
  openModalUser: () => void;
  userData?: IUser;
  onLogout: () => void;
}

export function Header({ openModal, openModalUser, userData, onLogout }: IHeaderProps) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => setDropdownOpen(prev => !prev);

  return (
    <header className="bg-green-800 w-full h-[212px]">
      <div className="max-w-[1120px] mx-auto flex justify-between pt-8 px-4 sm:px-0">
        {/* Logo - Reduzido em 30% no celular */}
        <div className="flex items-center">
          <img 
            src="/logo.png" 
            alt="Logo Image" 
            className="w-[120px] sm:w-[172px] h-auto" 
          />
        </div>
        <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-2">
          <button
            onClick={openModal}
            className="bg-green-300 text-green-800 px-4 py-2 rounded-md hover:opacity-80 w-full sm:w-auto sm:px-6 sm:py-3" 
          >
            Nova transação
          </button>
          
          <div className="relative">
            <button onClick={handleDropdownToggle} className="flex items-center hover:opacity-80">
              <div className="w-5 h-5 bg-gray-400 rounded-full mr-2 sm:w-9 sm:h-9"></div> 
              <div className="text-white text-xs sm:text-sm">{userData?.nome}</div> 
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
