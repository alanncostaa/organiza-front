export interface ITransaction {
    id?: string;
    title: string;
    price: number;
    category: string;
    data: Date;
    type: "INCOME" | "OUTCOME";
    iduser: string;
}

export type ITotal = {
    totalIncome: number;
    totalOutcome: number;
    total: number;
}
