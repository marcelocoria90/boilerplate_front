import { cn } from "../../utils/utils"


export function Badge({ className, variant = "default", ...props }) {
  const variantClasses = {
    default: "bg-gray-200 text-gray-800",
    primary: "bg-blue-500 text-white",
    success: "bg-green-500 text-white",
    warning: "bg-yellow-500 text-white",
    danger: "bg-red-500 text-white",
  }

  return (
    <span
      className={cn("inline-flex items-center px-2 py-1 rounded-md text-sm font-medium", variantClasses[variant], className)}
      {...props}
    />
  )
}