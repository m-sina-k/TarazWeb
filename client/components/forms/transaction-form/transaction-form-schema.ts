import * as z from "zod";

export const transactionFormSchema = z
  .object({
    title: z
      .string({
        required_error: "این فیلد الزامی است",
      })
      .min(1, "عنوان الزامی است"),
    type: z.enum(["INCOME", "EXPENSE"], {
      required_error: "نوع تراکنش را انتخاب کنید",
    }),
    amount: z
      .number({
        required_error: "این فیلد الزامی است",
      })
      .positive("مبلغ باید مثبت باشد")
      .min(1),
    category: z
      .string({
        required_error: "این فیلد الزامی است",
      })
      .min(1, "دسته‌بندی الزامی است"),
    date: z.date({
      required_error: "تاریخ الزامی است",
    }),
    description: z.string().optional(),
    paymentMethod: z
      .string({
        required_error: "این فیلد الزامی است",
      })
      .min(1, "روش پرداخت الزامی است"),
    isRecurring: z.boolean(),
    recurringInterval: z
      .enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"])
      .nullable()
      .optional(),
  })
  .refine(
    (data) => {
      if (data.isRecurring) {
        return (
          data.recurringInterval !== null &&
          data.recurringInterval !== undefined
        );
      }
      return true;
    },
    {
      message: "بازه تکرار الزامی است",
      path: ["recurringInterval"],
    }
  );

export type TransactionFormValues = z.infer<typeof transactionFormSchema>;
