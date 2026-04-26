import { LayoutDashboard, AlertTriangle, BookOpen, Briefcase, Users, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";

export type Section = "dashboard" | "crisis" | "literacia" | "negocios" | "comunidade" | "mpesa";

const items: { id: Section; label: string; icon: any }[] = [
  { id: "dashboard", label: "Painel", icon: LayoutDashboard },
  { id: "crisis", label: "Choques Económicos", icon: AlertTriangle },
  { id: "literacia", label: "Literacia", icon: BookOpen },
  { id: "negocios", label: "Negócios", icon: Briefcase },
  { id: "comunidade", label: "Comunidade", icon: Users },
  { id: "mpesa", label: "M-Pesa Sync", icon: Smartphone },
];

interface Props {
  active: Section;
  onChange: (s: Section) => void;
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ active, onChange, open, onClose }: Props) {
  return (
    <>
      {open && (
        <button
          aria-label="Fechar menu"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-foreground/40 md:hidden"
        />
      )}
      <aside
        className={cn(
          "fixed md:sticky top-0 z-40 h-screen w-64 shrink-0 bg-sidebar text-sidebar-foreground",
          "flex flex-col border-r border-sidebar-border transition-transform",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="px-6 py-6 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-sidebar-primary text-sidebar-primary-foreground grid place-items-center font-bold">
              CP
            </div>
            <div>
              <h1 className="font-semibold text-base leading-tight">Ceteris Paribus</h1>
              <p className="text-xs opacity-75">Kupuna Finance</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { onChange(item.id); onClose(); }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="px-6 py-4 text-xs opacity-75 border-t border-sidebar-border">
          Moçambique · MZN
        </div>
      </aside>
    </>
  );
}
