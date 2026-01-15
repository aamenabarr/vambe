import { Column } from '@tanstack/react-table'
import { ChevronsUpDown } from 'lucide-react'
import { FC } from 'react'

import { Button } from 'ui'

export interface SortingButtonProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  column: Column<any, unknown>
  placeholder: string
}

export const SortingButton: FC<SortingButtonProps> = ({
  column,
  placeholder,
}: SortingButtonProps) => {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      className="gap-1 p-0"
    >
      {placeholder}
      <ChevronsUpDown className="size-4" />
    </Button>
  )
}
