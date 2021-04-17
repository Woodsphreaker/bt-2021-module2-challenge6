interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Transaction {
  type: 'income' | 'outcome';
  value: number;
}

const calculateBalance = (transactions: Transaction[]): Balance => {
  return transactions.reduce(
    (acc, { type, value }): Balance => {
      acc[type] += value;
      const { income, outcome } = acc;
      acc.total = income - outcome;

      return acc;
    },
    {
      income: 0,
      outcome: 0,
      total: 0,
    },
  );
};

export default calculateBalance;
