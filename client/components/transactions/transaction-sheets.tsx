"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { TransactionForm } from "@/components/forms/transaction-form";
import type { Transaction } from "@/hooks/api/transactions/useGetAllTransactions";
import type { CreateTransactionRequest } from "@/hooks/api/transactions/useCreateTransaction";
import type { UpdateTransactionRequest } from "@/hooks/api/transactions/useUpdateTransaction";
import { PAYMENT_METHOD_REVERSE_MAP } from "@/constants/payment-methods";

interface TransactionSheetsProps {
  isAddOpen: boolean;
  onAddClose: () => void;
  editingTransaction: Transaction | null;
  onEditClose: () => void;
  onCreate: (
    data: CreateTransactionRequest | UpdateTransactionRequest
  ) => Promise<void>;
  onUpdate: (id: string, data: UpdateTransactionRequest) => Promise<void>;
  isCreating: boolean;
  isUpdating: boolean;
}

export function TransactionSheets({
  isAddOpen,
  onAddClose,
  editingTransaction,
  onEditClose,
  onCreate,
  onUpdate,
  isCreating,
  isUpdating,
}: TransactionSheetsProps) {
  return (
    <>
      {/* Add Transaction Sheet */}
      <Sheet open={isAddOpen} onOpenChange={(open) => !open && onAddClose()}>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>افزودن تراکنش</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <TransactionForm onSubmit={onCreate} isLoading={isCreating} />
          </div>
        </SheetContent>
      </Sheet>

      {/* Edit Transaction Sheet */}
      <Sheet
        open={!!editingTransaction}
        onOpenChange={(open) => !open && onEditClose()}
      >
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>ویرایش تراکنش</SheetTitle>
          </SheetHeader>
          {editingTransaction && (
            <div className="mt-6">
              <TransactionForm
                defaultValues={{
                  title: editingTransaction.title,
                  type: editingTransaction.type,
                  amount: editingTransaction.amount,
                  category: editingTransaction.category,
                  date: new Date(editingTransaction.date),
                  description: editingTransaction.description,
                  paymentMethod:
                    PAYMENT_METHOD_REVERSE_MAP[
                      editingTransaction.paymentMethod
                    ] || editingTransaction.paymentMethod,
                  isRecurring: editingTransaction.isRecurring,
                  recurringInterval:
                    editingTransaction.recurringInterval || undefined,
                }}
                onSubmit={async (data) => {
                  await onUpdate(editingTransaction._id, data);
                }}
                isLoading={isUpdating}
                submitLabel="به‌روزرسانی"
              />
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
