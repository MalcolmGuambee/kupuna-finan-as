import { cn } from "@/lib/utils";

interface Props {
  on: boolean;
  onToggle: () => void;
  label?: string;
}

export function MpesaToggle({ on, onToggle, label = "Sincronizar com M-Pesa" }: Props) {
  return (
    <button
      onClick={onToggle}
      role="switch"
      aria-checked={on}
      className="flex items-center gap-3 rounded-full border border-border bg-card px-3 py-1.5 shadow-card hover:bg-secondary transition-colors"
    >
      <span className="text-xs sm:text-sm font-medium text-foreground hidden sm:inline">{label}</span>
      <span className="text-xs font-medium sm:hidden">M-Pesa</span>
      <span
        className={cn(
          "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
          on ? "bg-success" : "bg-muted-foreground/30"
        )}
      >
        <span
          className={cn(
            "inline-block h-5 w-5 transform rounded-full bg-card shadow-sm transition-transform",
            on ? "translate-x-5" : "translate-x-0.5"
          )}
        />
      </span>
      <span className={cn("text-xs font-semibold w-7", on ? "text-success" : "text-muted-foreground")}>
        {on ? "ON" : "OFF"}
      </span>
    </button>
  );
}
