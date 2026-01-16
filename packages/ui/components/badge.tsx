import { cva, type VariantProps } from 'class-variance-authority'
import { X } from 'lucide-react'
import * as React from 'react'

import { cn } from 'ui/lib/utils'

const badgeVariants = cva(
  'inline-flex w-fit items-center rounded-md border px-2 py-1 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border border-slate-400 bg-slate-50 text-slate-600',
        primary: 'bg-primary text-primary-foreground',
        secondary: 'border-transparent bg-secondary text-secondary-foreground',
        destructive: 'border-transparent bg-destructive text-destructive-foreground',
        outline: 'text-foreground',
        muted: 'border-transparent bg-muted text-muted-foreground ring-1 ring-muted-foreground',
        ghost: 'border-border bg-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
  onDelete?: () => void
}

function Badge({ className, variant, children, onDelete, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {children}
      {onDelete && (
        <button
          type="button"
          className="ml-1 flex size-[12px] items-center justify-center rounded-full hover:text-foreground"
          onClick={onDelete}
        >
          <X />
        </button>
      )}
    </div>
  )
}

export { Badge, badgeVariants }
