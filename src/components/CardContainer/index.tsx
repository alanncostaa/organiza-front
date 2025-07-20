import { ITotal } from "@/types/transaction";
import { Card } from "../Card";

export interface ICardContainerProps {
  totals: ITotal;
}

export function CardContainer({ totals }: ICardContainerProps) {
  const { totalIncome, totalOutcome, total } = totals;

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center mt-[-2] mb-[-8] m-8">
      <Card title="Entradas" value={totalIncome} type="income" />
      <Card title="Saídas" value={totalOutcome} type="outcome" />
      <Card title="Total" value={total} type="total" />
    </div>
  );
}
