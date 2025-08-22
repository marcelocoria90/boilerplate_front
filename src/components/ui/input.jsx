import { cn } from "../../utils/utils"

export function Input({ className, ...props }) {
  return (
    <input
      className={cn("px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500", className)}
      {...props}
    />
  )
}