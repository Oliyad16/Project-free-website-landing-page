import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-11 w-full min-w-0 rounded-lg border border-[rgba(201,168,124,0.2)] bg-[rgba(17,21,32,0.8)] px-4 py-2 text-base text-[#F5EFE0] transition-colors outline-none placeholder:text-[#9A8B7A] focus-visible:border-[rgba(201,168,124,0.6)] focus-visible:ring-2 focus-visible:ring-[rgba(201,168,124,0.2)] disabled:pointer-events-none disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Input }
