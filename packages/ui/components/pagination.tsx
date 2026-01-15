import { ChevronLeft, ChevronRight, ChevronsLeft, MoreHorizontal } from 'lucide-react'
import * as React from 'react'

import { cn } from '../lib/utils'
import { ButtonProps, buttonVariants } from './button'

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn('flex justify-center', className)}
    {...props}
  />
)
Pagination.displayName = 'Pagination'

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<'ul'>>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn('flex flex-row gap-3 items-center', className)} {...props} />
  ),
)
PaginationContent.displayName = 'PaginationContent'

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<'li'>>(
  ({ className, ...props }, ref) => <li ref={ref} className={cn('', className)} {...props} />,
)
PaginationItem.displayName = 'PaginationItem'

type PaginationLinkProps = {
  isActive?: boolean
  disabled?: boolean
  variant?: 'default' | 'outline' | 'ghost'
} & Pick<ButtonProps, 'size'> &
  React.ComponentProps<'a'>

const PaginationLink = ({
  className,
  isActive,
  disabled,
  size = 'icon',
  variant = 'default',
  ...props
}: PaginationLinkProps) => {
  const disabledClassName = 'cursor-not-allowed opacity-50'

  return (
    <a
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        buttonVariants({
          variant,
          size,
        }),
        disabled ? disabledClassName : '',
        className,
      )}
      {...props}
    />
  )
}
PaginationLink.displayName = 'PaginationLink'

const PaginationSecondToPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Subanterior"
    variant="outline"
    className={cn('gap-1 pl-2.5', className)}
    {...props}
  >
    <ChevronsLeft className="size-4" />
  </PaginationLink>
)
PaginationSecondToPrevious.displayName = 'PaginationSecondToPrevious'

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Anterior"
    variant="outline"
    className={cn('gap-1 pl-2.5', className)}
    {...props}
  >
    <ChevronLeft className="size-4" />
  </PaginationLink>
)
PaginationPrevious.displayName = 'PaginationPrevious'

const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Siguiente"
    variant="outline"
    className={cn('gap-1 pr-2.5', className)}
    {...props}
  >
    <ChevronRight className="size-4" />
  </PaginationLink>
)
PaginationNext.displayName = 'PaginationNext'

const PaginationSubSequent = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Subsiguiente"
    variant="outline"
    className={cn('gap-1 pr-2.5', className)}
    {...props}
  >
    <ChevronRight className="size-4" />
  </PaginationLink>
)
PaginationSubSequent.displayName = 'PaginationSubSequent'

const PaginationEllipsis = ({ ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="No more pages" size="default" {...props}>
    <MoreHorizontal className="size-4" />
  </PaginationLink>
)
PaginationEllipsis.displayName = 'PaginationEllipsis'

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationSecondToPrevious,
  PaginationSubSequent,
}
