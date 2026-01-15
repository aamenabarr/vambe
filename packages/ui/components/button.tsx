import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import * as React from 'react'

import { cn } from '../lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'border border-input bg-background text-foreground hover:bg-accent disabled:bg-background/50',
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90 disabled:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'border border-primary bg-background text-primary hover:border-primary/90 hover:bg-primary/90 hover:text-primary-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: '!p-0 text-primary underline-offset-4 hover:underline',
        dashed: 'border border-dashed border-input bg-white',
      },
      size: {
        default: 'px-3 py-2',
        sm: 'rounded-md px-3',
        lg: 'rounded-md px-8',
        icon: 'size-9 p-[10px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  icon?: JSX.Element
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, loading, icon, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    const renderButton = () => {
      return (
        <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
          {loading ? (
            <div className="flex flex-row items-center">
              <Loader2 className="mr-2 size-4 animate-spin" />
              {children}
            </div>
          ) : (
            <div className="flex flex-row items-center gap-2">
              {icon}
              {children}
            </div>
          )}
        </Comp>
      )
    }

    const renderIconButton = () => {
      if (icon) {
        return (
          <Comp
            className={cn(buttonVariants({ variant, size: 'icon', className }))}
            ref={ref}
            {...props}
          >
            <>
              {loading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <div className="flex items-center">{icon}</div>
              )}
            </>
          </Comp>
        )
      }

      return renderButton()
    }

    return (
      <>
        <div className="sm:hidden">{renderIconButton()}</div>
        <div className="hidden sm:flex">{renderButton()}</div>
      </>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
