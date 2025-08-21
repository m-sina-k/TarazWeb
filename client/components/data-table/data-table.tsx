"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
  RowSelectionState,
  OnChangeFn,
  Row,
} from "@tanstack/react-table";
import { useSpring, animated, config } from "@react-spring/web";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { LoadingSpinner } from "../common/loading-spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EmptyState } from "../common/empty-state";
import { ErrorState } from "../common/error-state";

const AnimatedTableRow = animated(TableRow);

function AnimatedTableRowWrapper<TData>({
  row,
  index,
}: {
  row: Row<TData>;
  index: number;
}) {
  const springs = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: config.gentle,
    delay: index * 20,
  });

  return (
    <AnimatedTableRow
      style={springs}
      data-state={row.getIsSelected() && "selected"}
      className={index % 2 === 0 ? "bg-background" : "bg-muted/30"}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </AnimatedTableRow>
  );
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  isError?: boolean;
  rowSelection?: RowSelectionState;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  getRowId?: (row: TData) => string;
  pageSize?: number;
  onPageSizeChange?: (pageSize: number) => void;
  serverSidePagination?: {
    totalCount: number;
    totalPages: number;
    pageNumber: number;
    onPageChange?: (page: number) => void;
  };
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  isError,
  rowSelection,
  onRowSelectionChange,
  getRowId,
  pageSize: externalPageSize,
  onPageSizeChange,
  serverSidePagination,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const isServerSide = !!serverSidePagination;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: isServerSide ? undefined : getPaginationRowModel(),
    manualPagination: isServerSide,
    pageCount: isServerSide ? serverSidePagination?.totalPages : undefined,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    enableRowSelection: true,
    getRowId,
    onRowSelectionChange,
    initialState: {
      pagination: {
        pageSize: externalPageSize || 10,
        pageIndex: isServerSide
          ? (serverSidePagination?.pageNumber ?? 1) - 1
          : 0,
      },
    },
    state: {
      sorting,
      columnVisibility,
      rowSelection: rowSelection || {},
      pagination: isServerSide
        ? {
            pageIndex: (serverSidePagination?.pageNumber ?? 1) - 1,
            pageSize: externalPageSize || 10,
          }
        : {
            pageIndex: 0,
            pageSize: externalPageSize || 10,
          },
    },
  });

  React.useEffect(() => {
    if (
      externalPageSize &&
      externalPageSize !== table.getState().pagination.pageSize
    ) {
      table.setPageSize(externalPageSize);
    }
  }, [externalPageSize, table]);

  const handlePreviousPage = React.useCallback(() => {
    if (isServerSide && serverSidePagination) {
      const currentPage = serverSidePagination.pageNumber ?? 1;
      if (currentPage > 1 && serverSidePagination.onPageChange) {
        serverSidePagination.onPageChange(currentPage - 1);
      }
    } else {
      table.previousPage();
    }
  }, [isServerSide, serverSidePagination, table]);

  const handleNextPage = React.useCallback(() => {
    if (isServerSide && serverSidePagination) {
      const currentPage = serverSidePagination.pageNumber ?? 1;
      const totalPages = serverSidePagination.totalPages ?? 1;
      if (currentPage < totalPages && serverSidePagination.onPageChange) {
        serverSidePagination.onPageChange(currentPage + 1);
      }
    } else {
      table.nextPage();
    }
  }, [isServerSide, serverSidePagination, table]);

  const currentPage =
    isServerSide && serverSidePagination
      ? serverSidePagination.pageNumber ?? 1
      : table.getState().pagination.pageIndex + 1;
  const totalPages =
    isServerSide && serverSidePagination
      ? serverSidePagination.totalPages ?? 1
      : table.getPageCount();
  const totalCount =
    isServerSide && serverSidePagination
      ? serverSidePagination.totalCount ?? 0
      : table.getRowCount();
  const currentPageItemCount = isServerSide
    ? data.length
    : table.getRowModel().rows.length;
  const canPreviousPage =
    isServerSide && serverSidePagination
      ? (serverSidePagination.pageNumber ?? 1) > 1
      : table.getCanPreviousPage();
  const canNextPage =
    isServerSide && serverSidePagination
      ? (serverSidePagination.pageNumber ?? 1) <
        (serverSidePagination.totalPages ?? 1)
      : table.getCanNextPage();

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sortDirection = header.column.getIsSorted();
                  const columnId = header.column.id;
                  const isSortableColumn =
                    canSort && (columnId === "amount" || columnId === "date");

                  return (
                    <TableHead
                      key={header.id}
                      className={
                        isSortableColumn
                          ? "cursor-pointer select-none"
                          : "text-base font-bold text-text"
                      }
                      onClick={
                        isSortableColumn
                          ? header.column.getToggleSortingHandler()
                          : undefined
                      }
                    >
                      {header.isPlaceholder ? null : (
                        <>
                          {isSortableColumn ? (
                            <div className="flex items-center justify-start gap-2 text-base font-bold text-text">
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                              <span className="mr-1">
                                {sortDirection === "asc" ? (
                                  <ArrowUp className="h-4 w-4" />
                                ) : sortDirection === "desc" ? (
                                  <ArrowDown className="h-4 w-4" />
                                ) : (
                                  <ArrowUpDown className="h-4 w-4 opacity-50" />
                                )}
                              </span>
                            </div>
                          ) : (
                            flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )
                          )}
                        </>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <LoadingSpinner size="lg" />
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <ErrorState />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table
                .getRowModel()
                .rows.map((row, index) => (
                  <AnimatedTableRowWrapper
                    key={row.id}
                    index={index}
                    row={row}
                  />
                ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <EmptyState />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between px-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {currentPageItemCount} مورد از {totalCount} مورد
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          {onPageSizeChange && (
            <div className="flex items-center space-x-2 space-x-reverse gap-2">
              <p className="text-sm font-medium">تعداد در هر صفحه:</p>
              <Select
                value={(externalPageSize || 10).toString()}
                onValueChange={(value) => {
                  const newPageSize = parseInt(value, 10);
                  onPageSizeChange(newPageSize);
                  if (!isServerSide) {
                    table.setPageSize(newPageSize);
                  }
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="flex items-center space-x-2 space-x-reverse">
            <p className="text-sm font-medium">صفحه</p>
            <p className="text-sm font-medium">
              {currentPage} از {totalPages}
            </p>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse gap-4">
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={handlePreviousPage}
              disabled={!canPreviousPage}
            >
              <span className="sr-only">صفحه قبل</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={handleNextPage}
              disabled={!canNextPage}
            >
              <span className="sr-only">صفحه بعد</span>
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
