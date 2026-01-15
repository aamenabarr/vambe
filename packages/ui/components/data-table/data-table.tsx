'use client'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  VisibilityState,
  getFilteredRowModel,
  Row,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationSecondToPrevious,
  PaginationSubSequent,
} from '../pagination'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select'
import { Skeleton } from '../skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../table'
import { P } from '../typography'
import { SearchInput } from './search-input'

interface SearchProps {
  inputPlaceholder: string
  buttonPlaceholder: string
  valueToSearch: string
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  page: number
  pageSize: number
  total: number
  loading?: boolean
  searchProps?: SearchProps[]
  hidePagination?: boolean
  baseRedirectUrl?: string
}

export type DataTableColumnDef<TData> = ColumnDef<TData, unknown>

export function DataTable<TData, TValue>({
  columns,
  data,
  page,
  pageSize,
  total,
  loading,
  searchProps,
  hidePagination,
  baseRedirectUrl,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const pagesArray = Array.from({ length: Math.ceil(total / pageSize) }, (_, index) => index + 1)
  const pageIsFirst = page === 1
  const pageIsLast = page === pagesArray.length
  const nextPage = page + 1
  const previousPage = page - 1

  const onPageLinkClicked = (pageNumber: number) => {
    table.setPageIndex(pageNumber - 1)
  }

  const onRowClick = (row: Row<TData>) => {
    if (!baseRedirectUrl) {
      return
    }
    const originalRow = row.original as {
      id: string
    }

    window.location.href = `${baseRedirectUrl}/${originalRow.id}`
  }

  useEffect(() => {
    table.setPageSize(pageSize)
    table.setPageIndex(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize])

  return (
    <div className="flex w-full flex-col gap-4">
      {searchProps && (
        <div className="flex flex-row flex-wrap items-center gap-2">
          {searchProps.map((searchProp) => (
            <SearchInput
              key={searchProp.valueToSearch}
              table={table}
              buttonPlaceholder={searchProp.buttonPlaceholder}
              inputPlaceholder={searchProp.inputPlaceholder}
              valueToSearch={searchProp.valueToSearch}
            />
          ))}
        </div>
      )}
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {!loading ? (
              <>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      className={baseRedirectUrl && 'cursor-pointer'}
                      data-state={row.getIsSelected() && 'selected'}
                      onClick={() => onRowClick(row)}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      Sin resultados.
                    </TableCell>
                  </TableRow>
                )}
              </>
            ) : (
              <TableRow>
                <TableCell colSpan={1} className="h-24 text-center">
                  <Skeleton className="size-12 rounded-full" />
                </TableCell>
                {columns.slice(2).map((_, index) => (
                  <TableCell key={index} className="h-24 text-center">
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {!hidePagination && (
        <div className="flex flex-row items-center justify-end gap-8">
          <div className="flex flex-row items-center gap-2">
            <P>Filas por página</P>
            <Select
              value={pageSize.toString()}
              onValueChange={(value) => {
                window.location.href = `?page=${page}&pageSize=${value}`
              }}
            >
              <SelectTrigger className="gap-5">
                <SelectValue>{pageSize}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {[5, 10, 15].map((size) => (
                  <SelectItem key={size} value={size.toString()}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <P>
            Página {page} de {pagesArray.length}
          </P>
          <Pagination className="justify-end">
            <PaginationContent>
              <PaginationItem>
                <PaginationSecondToPrevious
                  href={`?page=${previousPage - 1}&pageSize=${pageSize}`}
                  onClick={() => onPageLinkClicked(previousPage - 1)}
                  disabled={pageIsFirst}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationPrevious
                  href={`?page=${previousPage}&pageSize=${pageSize}`}
                  onClick={() => onPageLinkClicked(previousPage)}
                  disabled={pageIsFirst}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href={`?page=${nextPage}&pageSize=${pageSize}`}
                  onClick={() => onPageLinkClicked(nextPage)}
                  disabled={pageIsLast}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationSubSequent
                  href={`?page=${nextPage + 1}&pageSize=${pageSize}`}
                  onClick={() => onPageLinkClicked(nextPage + 1)}
                  disabled={pageIsLast}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}
