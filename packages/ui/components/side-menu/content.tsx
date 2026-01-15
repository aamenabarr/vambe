'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { FC, ReactNode } from 'react'

import { Button } from '../button'

export interface Content {
  icon: JSX.Element
  name: string
  href: string
}

export interface SideMenuContentProps {
  collapsibleIcon?: ReactNode
  unCollapsibleIcon?: ReactNode
  className?: string
  content: Content[]
}

export const SideMenuContent: FC<SideMenuContentProps> = ({ content }: SideMenuContentProps) => {
  const pathname = usePathname()

  const setIconAccordingToPathname = (href: string) => {
    if (pathname.includes(href)) {
      return 'stroke-white h-4 w-4'
    }

    return 'stroke-muted-foreground h-4 w-4'
  }

  const renderContent = (content: Content, index: number) => {
    const { icon, name, href } = content

    const iconElement = React.cloneElement(icon, {
      className: setIconAccordingToPathname(href),
    })

    return (
      <Link key={`side-menu-content-${name}-${index}`} href={href}>
        <Button
          variant={pathname.includes(href) ? 'primary' : 'ghost'}
          size="icon"
          icon={iconElement}
        />
      </Link>
    )
  }

  return (
    <>
      <div className="flex w-full flex-col gap-4 p-2">
        {content.map((content, index) => renderContent(content, index))}
      </div>
    </>
  )
}
