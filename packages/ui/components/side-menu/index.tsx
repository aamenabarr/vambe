import { FC } from 'react'

import { SideMenuContent, Content } from './content'

export interface SideMenuLayoutProps {
  content: Content[]
}

export const SideMenuLayout: FC<SideMenuLayoutProps> = ({ content }: SideMenuLayoutProps) => {
  return (
    <div className="flex size-full flex-col">
      <SideMenuContent content={content} />
    </div>
  )
}
