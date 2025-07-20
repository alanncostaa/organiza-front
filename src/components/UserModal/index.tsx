import { useForm } from "react-hook-form";
import { Input } from "../Form/Input";
import { IUser } from "@/types/user";

interface IUserFormModalProps {
  formTitle: string;
  closeModal: () => void;
  saveUserData: (data: IUser) => void;
  userData: IUser;
}

// Tipo local do formulário (diferente de IUser do backend)
type IUserFormData = {
  name: string;
  email: string;
  telefone: string;
  receita: number;
  meta: number;
  dt_nas: string;
};

const formatDate = (date: string | Date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export function UserFormModal({
  formTitle,
  closeModal,
  saveUserData,
  userData
}: IUserFormModalProps) {
  const { register, handleSubmit } = useForm<IUserFormData>({
    defaultValues: {
      name: userData?.nome || "",
      email: userData?.email || "",
      telefone: userData?.telefone || "",
      receita: userData?.receita || 0,
      meta: userData?.meta || 0,
      dt_nas: formatDate(userData?.d_nas || new Date())
    }
  });

  const onSubmit = (data: IUserFormData) => {
    const updatedUser: IUser = {
      id: userData.id,
      nome: data.name,
      email: data.email,
      telefone: data.telefone,
      receita: Number(data.receita),
      meta: Number(data.meta),
      d_nas: new Date(data.dt_nas).toISOString()
    };

    saveUserData(updatedUser);
    closeModal();
  };

  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 opacity-75 transition-opacity" aria-hidden="true"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-modal text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <button
              type="button"
              className="absolute top-0 right-0 mt-4 mr-4 text-gray-400 hover:text-gray-600"
              onClick={closeModal}
              aria-label="Fechar"
            >
              <span className="text-2xl">&times;</span>
            </button>
            <div className="bg-modal px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <h1 className="font-semibold leading-9 text-title text-2xl" id="modal-title">
                {formTitle}
              </h1>
            </div>
            <form className="flex flex-col gap-4 px-12 mt-4 mb-6" onSubmit={handleSubmit(onSubmit)}>
              <Input type="text" placeholder="Nome" {...register("name", { required: true })} />
              <Input type="text" placeholder="Email" {...register("email", { required: true })} />
              <Input type="text" placeholder="Telefone" {...register("telefone")} />
              <Input type="number" placeholder="Receita" {...register("receita", { valueAsNumber: true })} />
              <Input type="number" placeholder="Meta" {...register("meta", { valueAsNumber: true })} />
              <Input type="date" placeholder="Data de Nascimento" {...register("dt_nas", { required: true })} />
              <div className="bg-modal px-12 py-3 flex sm:flex-row-reverse w-full mb-11">
                <button
                  type="submit"
                  className="mt-3 w-full justify-center rounded-md bg-income text-white px-3 py-5 text-normal font-semibold shadow-sm hover:opacity-80 sm:mt-0"
                >
                  Confirmar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}