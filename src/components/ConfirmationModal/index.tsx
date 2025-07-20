import React from "react";

interface ConfirmationModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold">{message}</h2>
        <div className="mt-4 flex justify-between">
          <button onClick={onConfirm} className="bg-red-500 text-white px-4 py-2 rounded">Confirmar</button>
          <button onClick={onCancel} className="bg-gray-300 text-black px-4 py-2 rounded">Cancelar</button>
        </div>
      </div>
    </div>
  );
};