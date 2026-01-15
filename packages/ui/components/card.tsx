export interface CardProps {
  children: React.ReactNode
}

export const Card = ({ children }: CardProps) => {
  return (
    <div className="flex w-full flex-col gap-6 rounded-lg border border-border bg-white p-6">
      {children}
    </div>
  )
}
