"use client";

// Disable static generation since this page uses useSearchParams
export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table/data-table";
import { Plus } from "lucide-react";
import { useTransactionsPage } from "@/hooks/business-logic/useTransactionsPage";
import { TransactionsFilters } from "@/components/transactions/transactions-filters";
import { TransactionSheets } from "@/components/transactions/transaction-sheets";
import { DeleteConfirmationDialog } from "@/components/transactions/delete-confirmation-dialog";
import { Card } from "@/components/ui/card";

function TransactionsPageContent() {
  const {
    keyword,
    setKeyword,
    type,
    setType,
    recurringStatus,
    setRecurringStatus,
    pageSize,
    setPageSize,
    setPage,
    transactions,
    isLoading,
    isError,
    pagination,
    selectedRows,
    rowSelection,
    handleRowSelectionChange,
    columns,
    isAddOpen,
    setIsAddOpen,
    editingTransaction,
    setEditingTransaction,
    bulkDeleteMutation,
    deleteMutation,
    handleBulkDeleteClick,
    handleBulkDeleteConfirm,
    handleDeleteConfirm,
    handleCreate,
    handleUpdate,
    createMutation,
    updateMutation,
    deleteDialogOpen,
    setDeleteDialogOpen,
    bulkDeleteDialogOpen,
    setBulkDeleteDialogOpen,
  } = useTransactionsPage();

  return (
    <PageLayout
      title="تراکنش‌ها"
      subtitle="مدیریت و مشاهده تمام تراکنش‌های مالی"
      actions={
        <>
          {selectedRows.length > 0 && (
            <Button
              variant="destructive"
              onClick={handleBulkDeleteClick}
              disabled={bulkDeleteMutation.isPending}
            >
              حذف {selectedRows.length} مورد
            </Button>
          )}
          <Button onClick={() => setIsAddOpen(true)}>
            <Plus className="ml-2 h-4 w-4" />
            افزودن تراکنش
          </Button>
        </>
      }
    >
      <Card className="space-y-4 p-6">
        <TransactionsFilters
          keyword={keyword}
          onKeywordChange={setKeyword}
          type={type}
          onTypeChange={setType}
          recurringStatus={recurringStatus}
          onRecurringStatusChange={setRecurringStatus}
        />

        <DataTable
          columns={columns}
          data={transactions}
          isLoading={isLoading}
          isError={isError}
          rowSelection={rowSelection}
          onRowSelectionChange={handleRowSelectionChange}
          getRowId={(row) => row._id}
          pageSize={pageSize || 10}
          onPageSizeChange={(newPageSize) => {
            setPageSize(newPageSize);
          }}
          serverSidePagination={
            pagination
              ? {
                  totalCount: pagination.totalCount,
                  totalPages: pagination.totalPages,
                  pageNumber: pagination.pageNumber,
                  onPageChange: setPage,
                }
              : undefined
          }
        />
      </Card>

      <TransactionSheets
        isAddOpen={isAddOpen}
        onAddClose={() => setIsAddOpen(false)}
        editingTransaction={editingTransaction}
        onEditClose={() => setEditingTransaction(null)}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        isCreating={createMutation.isPending}
        isUpdating={updateMutation.isPending}
      />

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        title="حذف تراکنش"
        description="آیا از حذف این تراکنش اطمینان دارید؟"
        isDeleting={deleteMutation.isPending}
      />

      <DeleteConfirmationDialog
        open={bulkDeleteDialogOpen}
        onOpenChange={setBulkDeleteDialogOpen}
        onConfirm={handleBulkDeleteConfirm}
        title="حذف چند تراکنش"
        description={`آیا از حذف ${selectedRows.length} تراکنش اطمینان دارید؟`}
        isDeleting={bulkDeleteMutation.isPending}
      />
    </PageLayout>
  );
}

export default function TransactionsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TransactionsPageContent />
    </Suspense>
  );
}
