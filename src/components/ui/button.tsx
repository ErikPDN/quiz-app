import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps, cx } from "class-variance-authority"

import { cn } from "@/lib/utils"
import clsx from "clsx"


const neoClasses = "w-full rounded-full px-3.5 py-5 border-2 relative z-10 text-lg font-bold hover:transform hover:translate-y-[-2px]"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        neo: cn(neoClasses, "bg-primary text-primary-foreground border-white"),
        neoOutline: cn(neoClasses, "bg-secondary text-white border-white/10"),
        neoCorrect: cn(neoClasses, "bg-green-500 text-primary-foreground border-green-600"),
        neoIncorrect: cn(neoClasses, "bg-red-500 text-primary-foreground border-red-600"),
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-14 rounded-full px-3.5 py-5",
        xl: "rounded-2xl h-16 px-6 py-3",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export const spanVariants = cva(
  ["absolute", "h-14", "bottom-[-7px]", "w-full", "left-0", "z-0"],
  {
    variants: {
      variant: {
        default: "hidden",
        destructive:
          "hidden",
        outline:
          "hidden",
        secondary:
          "hidden",
        ghost:
          "hidden",
        link: "hidden",
        neo: "border-white/30 bg-zinc-600",
        neoOutline: "bg-zinc-900 border-zinc-800",
        neoCorrect: "border-green-500 bg-green-600",
        neoIncorrect: "border-red-500 bg-red-600",
      },
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"
  const containerClasses = clsx({
    relative: variant === "neo" || variant === "neoOutline"
      || variant === "neoCorrect" || variant === "neoIncorrect"
  })

  const borderRound = clsx({
    "rounded-full": variant === "neo",
    "rounded-2xl": variant === "neoOutline" || variant === "neoCorrect" || variant === "neoIncorrect"
  })

  return (
    <div className={containerClasses}>
      <Comp
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
      <span className={cx(spanVariants({ variant }), borderRound)}></span>
    </div>
  )
}

export { Button, buttonVariants }
