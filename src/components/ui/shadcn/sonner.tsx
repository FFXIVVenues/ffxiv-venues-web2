"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      position="top-center"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          icon: '!text-popover-foreground !ml-2 !mr-3',
          toast: '!bg-popover !border-muted',
          title: '!text-popover-foreground !mb-1',
          description: '!text-muted-foreground',
          actionButton: '!bg-muted text-muted-foreground',
          cancelButton: '!bg-muted text-muted-foreground',
          closeButton: '!bg-muted text-muted-foreground',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
