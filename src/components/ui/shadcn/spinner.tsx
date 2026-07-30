import { cn } from "@/lib/utils/cn.ts"
import { Loader2Icon } from "lucide-react"
import { useLingui } from "@lingui/react/macro"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  const { t } = useLingui()
  return (
    <Loader2Icon role="status" aria-label={t`Loading`} className={cn("size-4 animate-spin", className)} {...props} />
  )
}

export { Spinner }
