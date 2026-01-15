'use client'

import { Table } from '@tanstack/react-table'
import { PlusCircle, X } from 'lucide-react'
import { useState } from 'react'

import { Button } from '../button'
import { Input } from '../input'

export interface SearchInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table: Table<any>
  buttonPlaceholder: string
  inputPlaceholder: string
  valueToSearch: string
}

export const SearchInput = ({
  table,
  buttonPlaceholder,
  inputPlaceholder,
  valueToSearch,
}: SearchInputProps) => {
  const [isInputOpen, setIsInputOpen] = useState(false)

  const onCloseButtonClick = () => {
    setIsInputOpen(false)
    table.getColumn(valueToSearch)?.setFilterValue(undefined)
  }

  return (
    <>
      {isInputOpen ? (
        <div className="relative flex flex-row items-center gap-2">
          <Input
            key={`search-${valueToSearch}-filter`}
            placeholder={inputPlaceholder}
            value={(table.getColumn(valueToSearch)?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn(valueToSearch)?.setFilterValue(event.target.value)}
            className="w-60 bg-white"
          />
          <div className="absolute right-0">
            <Button
              variant="ghost"
              className="rounded-md border-r border-input bg-white"
              icon={<X className="size-4" />}
              onClick={() => onCloseButtonClick()}
              size="icon"
            />
          </div>
        </div>
      ) : (
        <Button
          variant="dashed"
          onClick={() => setIsInputOpen(true)}
          icon={<PlusCircle className="size-4" />}
        >
          {buttonPlaceholder}
        </Button>
      )}
    </>
  )
}
