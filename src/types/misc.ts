export type IncomeCategory =
  | "SALARY"
  | "OTHER"
  | "BONUS"
  | "GIFT"
  | "INTEREST"
  | "DIVIDENDS"
  | "RENTAL_INCOME"
  | "INVESTMENT_INCOME"
  | "SALE_OF_ASSETS"
  | "OTHER_INCOME";
export type ExpenseCategory =
  | "FOOD"
  | "TRANSPORT"
  | "BILLS"
  | "SHOPPING"
  | "HEALTH"
  | "ENTERTAINMENT"
  | "DEBT_PAYMENT"
  | "OTHER_EXPENSE";
export type TransactionType = IncomeCategory | ExpenseCategory;
