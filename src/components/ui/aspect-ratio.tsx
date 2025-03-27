"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: number
}

export const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ className, ratio = 1, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          position: "relative",
          width: "100%",
          paddingBottom: `${(1 / ratio) * 100}%`,
          ...style,
        }}
        className={cn("", className)}
        {...props}
      >
        <div className="absolute inset-0">{props.children}</div>
      </div>
    )
  }
)

AspectRatio.displayName = "AspectRatio" 