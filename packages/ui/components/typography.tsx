import { Slot } from '@radix-ui/react-slot'
import { VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '../lib/utils'

const typographyVariants = cva('text-foreground', {
  variants: {
    variant: {
      h1: 'text-2xl font-semibold',
      h2: 'text-lg font-semibold',
      h3: 'text-base font-semibold',
      h4: 'text-sm font-semibold',
      p: 'text-sm',
      label: 'text-sm font-medium text-muted-foreground',
      blockquote: 'mt-6 border-l-2 pl-6 italic',
      ul: 'my-6 ml-6 list-disc [&>li]:mt-2',
      inlineCode:
        'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
      lead: 'text-xl text-muted-foreground',
      large: 'text-lg font-semibold',
      small: 'text-sm font-medium leading-none',
      muted: 'text-sm text-muted-foreground',
    },
  },
  defaultVariants: {
    variant: 'p',
  },
})

type VariantPropType = VariantProps<typeof typographyVariants>

const variantElementMap: Record<NonNullable<VariantPropType['variant']>, string> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  p: 'p',
  label: 'label',
  blockquote: 'blockquote',
  inlineCode: 'code',
  large: 'div',
  small: 'small',
  lead: 'p',
  muted: 'p',
  ul: 'ul',
}

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof typographyVariants> {
  asChild?: boolean
  as?: string
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, as, asChild, ...props }, ref) => {
    const Comp = asChild
      ? Slot
      : (as ?? (variant ? variantElementMap[variant] : undefined) ?? 'div')

    return <Comp className={cn(typographyVariants({ variant, className }))} ref={ref} {...props} />
  },
)

Typography.displayName = 'Typography'

export { Typography, typographyVariants }

export const H1 = (props: TypographyProps) => <Typography variant="h1" {...props} />

export const H2 = (props: TypographyProps) => <Typography variant="h2" {...props} />

export const H3 = (props: TypographyProps) => <Typography variant="h3" {...props} />

export const H4 = (props: TypographyProps) => <Typography variant="h4" {...props} />

export const P = (props: TypographyProps) => <Typography variant="p" {...props} />

export const Label = (props: TypographyProps) => <Typography variant="label" {...props} />

export const Blockquote = (props: TypographyProps) => <Typography variant="blockquote" {...props} />

export const InlineCode = (props: TypographyProps) => <Typography variant="inlineCode" {...props} />

export const Lead = (props: TypographyProps) => <Typography variant="lead" {...props} />

export const Large = (props: TypographyProps) => <Typography variant="large" {...props} />

export const Small = (props: TypographyProps) => <Typography variant="small" {...props} />

export const Muted = (props: TypographyProps) => <Typography variant="muted" {...props} />

export const Ul = (props: TypographyProps) => <Typography variant="ul" {...props} />
