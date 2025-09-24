import { cn } from '../../utils/utils'

export function Skeleton({ className, variant = 'default', ...props }) {
  const variants = {
    default: 'h-4 w-full rounded-md',
    text: 'h-4 w-3/4 rounded-md',
    card: 'h-48 w-full rounded-xl',
    avatar: 'h-12 w-12 rounded-full',
    button: 'h-10 w-32 rounded-lg',
  }

  return (
    <div
      className={cn(
        'animate-pulse bg-muted/30 dark:bg-muted/20',
        variants[variant],
        className
      )}
      {...props}
    />
  )
}
