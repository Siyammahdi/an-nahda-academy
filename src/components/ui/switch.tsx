import * as React from "react"
import { cn } from "@/lib/utils"

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
        <input
          type="checkbox"
          className="peer absolute h-full w-full cursor-pointer opacity-0"
          ref={ref}
          {...props}
        />
        <span className="pointer-events-none absolute h-full w-full rounded-full bg-input peer-checked:bg-primary" />
        <span className="pointer-events-none block h-4 w-4 translate-x-0 rounded-full bg-background shadow-lg transition-transform peer-checked:translate-x-4" />
      </div>
    )
  }
)
Switch.displayName = "Switch"

export { Switch } 