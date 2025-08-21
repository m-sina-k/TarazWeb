"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2, Copy, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatJalaliDate } from "@/utils/date";
import { PAYMENT_METHOD_REVERSE_MAP } from "@/constants/payment-methods";
import type { Transaction } from "@/hooks/api/transactions/useGetAllTransactions";

interface CreateColumnsParams {
  onRowSelect: (id: string, selected: boolean) => void;
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
}

export function createTransactionsColumns({
  onRowSelect,
  onEdit,
  onDelete,
  onDuplicate,
}: CreateColumnsParams): ColumnDef<Transaction>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <div className="pr-4">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            className="cursor-pointer"
            aria-label="Select all"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="pr-4">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => {
              row.toggleSelected(!!value);
              const id = row.original._id;
              onRowSelect(id, !!value);
            }}
            aria-label="Select row"
            className="cursor-pointer"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: "عنوان",
      enableSorting: false,
    },
    {
      accessorKey: "type",
      header: "نوع",
      cell: ({ row }) => {
        const type = row.getValue("type") as string;
        return (
          <Badge variant={type === "INCOME" ? "default" : "destructive"}>
            {type === "INCOME" ? "درآمد" : "هزینه"}
          </Badge>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "amount",
      header: "مبلغ",
      cell: ({ row }) => {
        const amount = row.getValue("amount") as number;
        return new Intl.NumberFormat("fa-IR").format(amount) + " تومان";
      },
      enableSorting: true,
    },
    {
      accessorKey: "category",
      header: "دسته‌بندی",
      enableSorting: false,
    },
    {
      accessorKey: "date",
      header: "تاریخ",
      cell: ({ row }) => {
        const date = row.getValue("date") as string;
        return formatJalaliDate(date);
      },
      enableSorting: true,
    },
    {
      accessorKey: "paymentMethod",
      header: "روش پرداخت",
      cell: ({ row }) => {
        const method = row.getValue("paymentMethod") as string;
        return PAYMENT_METHOD_REVERSE_MAP[method] || method;
      },
      enableSorting: false,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const transaction = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem
                onClick={() => onEdit(transaction)}
                className="flex gap-2"
              >
                <Edit className="mr-2 h-4 w-4" />
                ویرایش
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDuplicate(transaction._id)}
                className="flex gap-2"
              >
                <Copy className="mr-2 h-4 w-4" />
                کپی
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(transaction._id)}
                className="text-destructive flex gap-2"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                حذف
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
