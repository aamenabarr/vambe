'use client'

import * as SwitchPrimitives from '@radix-ui/react-switch'
import * as React from 'react'
import { FC } from 'react'

import { cn } from '../lib/utils'
import { Label } from './label'

const DefaultSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <div className="flex flex-row">
    <SwitchPrimitives.Root
      className={cn(
        'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
        className,
      )}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          'pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0',
        )}
      />
    </SwitchPrimitives.Root>
  </div>
))
DefaultSwitch.displayName = SwitchPrimitives.Root.displayName

export interface SwitchProps {
  id?: string
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  horizontal?: boolean
}

export const Switch: FC<SwitchProps> = ({
  id,
  checked,
  onCheckedChange,
  placeholder,
  className,
  disabled,
  horizontal,
}: SwitchProps) => {
  const getClassName = () => {
    if (horizontal) {
      return 'flex flex-row gap-2 justify-end'
    }

    return ''
  }

  return (
    <div className={getClassName()}>
      <DefaultSwitch
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className={cn('', className)}
        disabled={disabled}
      />
      {id && (
        <div className={cn(!horizontal ? 'text-center w-full' : '')}>
          <Label htmlFor={id}>{placeholder}</Label>
        </div>
      )}
    </div>
  )
}
