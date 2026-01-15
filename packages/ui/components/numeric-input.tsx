'use client'

import React from 'react'
import { NumericFormat, NumericFormatProps } from 'react-number-format'

import { cn } from '../lib/utils'

const NumericInput = React.forwardRef<HTMLInputElement, NumericFormatProps>(
  ({ className, ...props }, ref) => {
    return (
      <NumericFormat
        getInputRef={ref}
        allowNegative={false}
        isAllowed={props.isAllowed}
        onChange={props.onChange}
        onBlur={props.onBlur}
        defaultValue={props.defaultValue}
        value={props.value as string}
        onValueChange={props.onValueChange}
        className={cn(
          'bg-white flex h-10 w-full rounded-md border border-input px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        suffix={props.suffix}
        placeholder={props.placeholder}
        thousandSeparator={props.thousandSeparator}
        decimalScale={props.decimalScale}
        decimalSeparator={props.decimalSeparator}
        fixedDecimalScale={props.fixedDecimalScale}
        prefix={props.prefix}
        disabled={props.disabled}
      />
    )
  },
)

NumericInput.displayName = 'NumericInput'

export { NumericInput }
