import { z } from "zod";

export const zodTransactionType = z.enum([
  "SALARY",
  "OTHER",
  "BONUS",
  "GIFT",
  "INTEREST",
  "DIVIDENDS",
  "RENTAL_INCOME",
  "INVESTMENT_INCOME",
  "SALE_OF_ASSETS",
  "OTHER_INCOME",
  "FOOD",
  "TRANSPORT",
  "BILLS",
  "SHOPPING",
  "HEALTH",
  "ENTERTAINMENT",
  "DEBT_PAYMENT",
  "OTHER_EXPENSE",
]);
