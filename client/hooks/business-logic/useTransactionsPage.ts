import { useState, useMemo, useCallback } from "react";
import { useQueryState } from "nuqs";
import { parseAsString, parseAsInteger } from "nuqs";
import type { RowSelectionState, OnChangeFn } from "@tanstack/react-table";
import {
  useGetAllTransactions,
  type Transaction,
} from "@/hooks/api/transactions/useGetAllTransactions";
import {
  useCreateTransaction,
  type CreateTransactionRequest,
} from "@/hooks/api/transactions/useCreateTransaction";
import {
  useUpdateTransaction,
  type UpdateTransactionRequest,
} from "@/hooks/api/transactions/useUpdateTransaction";
import { useDeleteTransaction } from "@/hooks/api/transactions/useDeleteTransaction";
import { useDuplicateTransaction } from "@/hooks/api/transactions/useDuplicateTransaction";
import { useBulkDeleteTransactions } from "@/hooks/api/transactions/useBulkDeleteTransactions";
import { createTransactionsColumns } from "@/components/transactions/transactions-table-columns";

const keywordParam = parseAsString.withDefault("");
const typeParam = parseAsString;
const recurringParam = parseAsString;
const pageParam = parseAsInteger.withDefault(1);
const pageSizeParam = parseAsInteger.withDefault(10);
const addParam = parseAsString;

export function useTransactionsPage() {
  const [keyword, setKeyword] = useQueryState("keyword", keywordParam);
  const [type, setType] = useQueryState("type", typeParam);
  const [recurringStatus, setRecurringStatus] = useQueryState(
    "recurringStatus",
    recurringParam
  );
  const [page, setPage] = useQueryState("page", pageParam);
  const [pageSize, setPageSizeState] = useQueryState("pageSize", pageSizeParam);
  const [add, setAdd] = useQueryState("add", addParam);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const setPageSize = useCallback(
    (newPageSize: number) => {
      setPageSizeState(newPageSize);
      setPage(1);
    },
    [setPageSizeState, setPage]
  );

  const isAddOpen = add === "true";
  const setIsAddOpen = useCallback(
    (open: boolean) => {
      setAdd(open ? "true" : null);
    },
    [setAdd]
  );
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<string | null>(
    null
  );

  const filters = useMemo(
    () => ({
      keyword: keyword || undefined,
      type: type as "INCOME" | "EXPENSE" | undefined,
      recurringStatus: recurringStatus as
        | "RECURRING"
        | "NON_RECURRING"
        | undefined,
    }),
    [keyword, type, recurringStatus]
  );

  const { data, isLoading, isError } = useGetAllTransactions(filters, {
    pageSize: pageSize || 10,
    pageNumber: page || 1,
  });

  const createMutation = useCreateTransaction();
  const updateMutation = useUpdateTransaction();
  const deleteMutation = useDeleteTransaction();
  const duplicateMutation = useDuplicateTransaction();
  const bulkDeleteMutation = useBulkDeleteTransactions();

  const transactions = data?.items || [];
  const pagination = data?.pagination;

  const handleDeleteClick = useCallback((id: string) => {
    setTransactionToDelete(id);
    setDeleteDialogOpen(true);
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    if (transactionToDelete) {
      await deleteMutation.mutateAsync(transactionToDelete);
      setTransactionToDelete(null);
    }
  }, [transactionToDelete, deleteMutation]);

  const handleBulkDeleteClick = useCallback(() => {
    if (selectedRows.length === 0) return;
    setBulkDeleteDialogOpen(true);
  }, [selectedRows]);

  const handleBulkDeleteConfirm = useCallback(async () => {
    if (selectedRows.length > 0) {
      await bulkDeleteMutation.mutateAsync({ transactionIds: selectedRows });
      setSelectedRows([]);
    }
  }, [selectedRows, bulkDeleteMutation]);

  const handleDuplicate = useCallback(
    async (id: string) => {
      await duplicateMutation.mutateAsync(id);
    },
    [duplicateMutation]
  );

  const handleCreate = useCallback(
    async (data: CreateTransactionRequest | UpdateTransactionRequest) => {
      await createMutation.mutateAsync(data as CreateTransactionRequest);
      setIsAddOpen(false);
    },
    [createMutation, setIsAddOpen]
  );

  const handleUpdate = useCallback(
    async (id: string, data: UpdateTransactionRequest) => {
      await updateMutation.mutateAsync({ id, data });
      setEditingTransaction(null);
    },
    [updateMutation]
  );

  const handleRowSelect = useCallback((id: string, selected: boolean) => {
    setSelectedRows((prev) => {
      if (selected) {
        return prev.includes(id) ? prev : [...prev, id];
      } else {
        return prev.filter((item) => item !== id);
      }
    });
  }, []);

  const rowSelection = useMemo<RowSelectionState>(() => {
    return selectedRows.reduce((acc, id) => {
      acc[id] = true;
      return acc;
    }, {} as RowSelectionState);
  }, [selectedRows]);

  const handleRowSelectionChange = useCallback<OnChangeFn<RowSelectionState>>(
    (
      updaterOrValue:
        | RowSelectionState
        | ((old: RowSelectionState) => RowSelectionState)
    ) => {
      const selection =
        typeof updaterOrValue === "function"
          ? updaterOrValue(rowSelection)
          : updaterOrValue;
      const selectedIds = Object.keys(selection).filter((id) => selection[id]);
      setSelectedRows(selectedIds);
    },
    [rowSelection, setSelectedRows]
  );

  const columns = useMemo(
    () =>
      createTransactionsColumns({
        onRowSelect: handleRowSelect,
        onEdit: setEditingTransaction,
        onDelete: handleDeleteClick,
        onDuplicate: handleDuplicate,
      }),
    [handleRowSelect, setEditingTransaction, handleDeleteClick, handleDuplicate]
  );

  return {
    keyword,
    setKeyword,
    type,
    setType,
    recurringStatus,
    setRecurringStatus,
    page,
    setPage,
    pageSize,
    setPageSize,

    transactions,
    isLoading,
    isError,
    pagination,

    selectedRows,
    setSelectedRows,
    handleRowSelect,
    rowSelection,
    handleRowSelectionChange,
    columns,

    isAddOpen,
    setIsAddOpen,
    editingTransaction,
    setEditingTransaction,

    createMutation,
    updateMutation,
    deleteMutation,
    duplicateMutation,
    bulkDeleteMutation,

    handleDeleteClick,
    handleDeleteConfirm,
    handleBulkDeleteClick,
    handleBulkDeleteConfirm,
    handleDuplicate,
    handleCreate,
    handleUpdate,

    deleteDialogOpen,
    setDeleteDialogOpen,
    bulkDeleteDialogOpen,
    setBulkDeleteDialogOpen,
    transactionToDelete,
  };
}
