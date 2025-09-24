import { cn } from '../../../utils/utils'

export const TextBox = ({
  text = 'Componente de texto',
  variant = 'body',
  className,
  ...props
}) => {
  const variants = {
    title: 'text-2xl font-semibold tracking-tight',
    subtitle: 'text-lg text-muted-foreground',
    body: 'text-base',
    muted: 'text-sm text-muted-foreground',
    caption: 'text-xs text-muted-foreground uppercase tracking-wide',
  }

  return (
    <div
      className={cn(variants[variant] ?? variants.body, className)}
      {...props}
    >
      {text}
    </div>
  )
}
