"use client"

import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "btn-champagne",
        outline:
          "border-[rgba(201,168,124,0.25)] bg-transparent text-[#F5EFE0] hover:border-[rgba(201,168,124,0.5)] hover:bg-[rgba(201,168,124,0.06)]",
        secondary:
          "bg-[#111520] text-[#F5EFE0] border-[rgba(201,168,124,0.12)] hover:bg-[#171c2a]",
        ghost:
          "hover:bg-[rgba(201,168,124,0.08)] text-[#F5EFE0]",
        destructive:
          "bg-red-500/10 text-red-400 hover:bg-red-500/20",
        link:
          "text-[#C9A87C] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 gap-2 px-5",
        sm:      "h-8 gap-1.5 px-3 text-xs rounded-md",
        lg:      "h-12 gap-2.5 px-7 text-base",
        xl:      "h-14 gap-3 px-9 text-lg rounded-xl",
        icon:    "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
