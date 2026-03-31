import * as React from "react"
import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-[100px] w-full rounded-lg border border-[rgba(201,168,124,0.2)] bg-[rgba(17,21,32,0.8)] px-4 py-3 text-base text-[#F5EFE0] transition-colors outline-none placeholder:text-[#9A8B7A] focus-visible:border-[rgba(201,168,124,0.6)] focus-visible:ring-2 focus-visible:ring-[rgba(201,168,124,0.2)] disabled:opacity-50 md:text-sm resize-none",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
