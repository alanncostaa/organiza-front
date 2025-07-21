import { useForm } from "react-hook-form";
import { Input } from "../Form/Input";
import { IUser } from "@/types/user";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface IUserFormModalProps {
  formTitle: string;
  closeModal: () => void;
  saveUserData: (data: IUser) => void;
}

const schema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório").min(3, "Mínimo 3 letras"),
  email: yup.string().required("Email é obrigatório").email("Email inválido"),
  senha: yup.string().required("Senha é obrigatória").min(6, "Mínimo 6 caracteres"),
  telefone: yup.string().required("Telefone é obrigatório"),
  receita: yup
    .number()
    .typeError("Receita deve ser um número")
    .required("Receita é obrigatória")
    .min(0, "Receita não pode ser negativa"),
  meta: yup
    .number()
    .typeError("Meta deve ser um número")
    .required("Meta é obrigatória")
    .min(0, "Meta não pode ser negativa"),
  dt_nas: yup
    .string()
    .required("Data de nascimento é obrigatória")
});

type IUserFormData = {
  name: string;
  email: string;
  telefone: string;
  receita: number;
  meta: number;
  senha: string;
  dt_nas: string;
};

export function UserCreateFormModal({
  formTitle,
  closeModal,
  saveUserData,
  
}: IUserFormModalProps) {
  const { register, handleSubmit,formState: { errors }} = useForm<IUserFormData>({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data: IUserFormData) => {
    const createUser: IUser = {
      nome: data.name,
      email: data.email,
      senha: data.senha,
      telefone: data.telefone,
      receita: Number(data.receita),
      meta: Number(data.meta),
      d_nas: new Date(data.dt_nas).toISOString()
    };

    saveUserData(createUser);
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
              {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
              <Input type="text" placeholder="Email" {...register("email", { required: true })} />
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
              <Input type="password" placeholder="Senha" {...register("senha", { required: true })} />
              {errors.senha && <span className="text-red-500 text-sm">{errors.senha.message}</span>}
              <Input type="text" placeholder="Telefone" {...register("telefone")} />
              {errors.telefone && <span className="text-red-500 text-sm">{errors.telefone.message}</span>}
              <Input type="number" placeholder="Receita" {...register("receita", { valueAsNumber: true })} />
              {errors.receita && <span className="text-red-500 text-sm">{errors.receita.message}</span>}
              <Input type="number" placeholder="Meta" {...register("meta", { valueAsNumber: true })} />
              {errors.meta && <span className="text-red-500 text-sm">{errors.meta.message}</span>}
              <Input type="date" placeholder="Data de Nascimento" {...register("dt_nas", { required: true })} />
              {errors.dt_nas && <span className="text-red-500 text-sm">{errors.dt_nas.message}</span>}
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