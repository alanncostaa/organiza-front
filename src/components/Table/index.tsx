import { ITransaction } from "@/types/transaction";
import { formatCurrency, formatDate } from "@/utils";

export interface ITableProps {
  data: ITransaction[];
  actions: { label: string; onClick: (transaction: ITransaction) => void }[];
}

export function Table({ data, actions }: ITableProps) {
  return (
    <>
      <div className="overflow-x-auto">
        <div className="mt-16">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="sm:hidden text-center text-lg font-semibold text-gray-700 mb-4">
              Transações
            </div>

            <div className="hidden sm:grid grid-cols-4 gap-4 mb-4">
              <div className="font-medium text-sm text-gray-600">Título</div>
              <div className="font-medium text-sm text-gray-600">Preço</div>
              <div className="font-medium text-sm text-gray-600">Categoria</div>
              <div className="font-medium text-sm text-gray-600">Data</div>
            </div>

            <div className="space-y-4 mt-4">
              {data.map((transaction) => (
                <div
                  key={transaction.id}
                  className="bg-gray-100 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center"
                >
                  {/* Dados da transação */}
                  <div className="text-title font-semibold">{transaction.title}</div>
                  <div
                    className={`text-right font-semibold ${transaction.type === "INCOME" ? "text-green-500" : "text-red-500"}`}
                  >
                    {formatCurrency(transaction.price)}
                  </div>
                  <div className="text-sm text-gray-500">{transaction.category}</div>
                  <div className="text-sm text-gray-500">
                    {transaction.data ? formatDate(new Date(transaction.data)) : ""}
                  </div>

                  <div className="flex gap-2 mt-2 sm:mt-0">
                    {actions.map((action, idx) => {
                      const isEdit = action.label.toLowerCase() === "editar";
                      const isDelete = action.label.toLowerCase() === "excluir";

                      return (
                        <button
                          key={idx}
                          onClick={() => action.onClick(transaction)}
                          className={`text-sm font-medium px-3 py-1 rounded-md shadow-sm transition
                            ${isEdit ? "bg-green-500 text-white hover:bg-green-700" : ""}
                            ${isDelete ? "bg-red-500 text-white hover:bg-red-700" : ""}`}
                        >
                          {action.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
