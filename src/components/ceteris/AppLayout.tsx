import { ReactNode, useState } from "react";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Sidebar, Section } from "@/components/ceteris/Sidebar";
import { MpesaToggle } from "@/components/ceteris/MpesaToggle";
import { useAppState } from "@/context/AppState";

interface Props {
  title: string;
  activeSection?: Section;
  children: ReactNode;
}

export function AppLayout({ title, activeSection, children }: Props) {
  const { section, setSection, mpesa, toggleMpesa } = useAppState();
  const [navOpen, setNavOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-soft text-foreground flex w-full">
      <Sidebar
        active={activeSection ?? section}
        onChange={(s) => {
          setSection(s);
          navigate("/");
        }}
        open={navOpen}
        onClose={() => setNavOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-20 bg-background/80 backdrop-blur border-b border-border">
          <div className="flex items-center gap-3 px-4 sm:px-6 lg:px-8 h-16">
            <button
              onClick={() => setNavOpen(true)}
              className="md:hidden p-2 -ml-2 rounded-md hover:bg-secondary"
              aria-label="Abrir menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="text-base sm:text-lg font-semibold truncate">{title}</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Bem-vindo de volta · Olá, Amina
              </p>
            </div>
            <MpesaToggle on={mpesa} onToggle={toggleMpesa} label="M-Pesa Integration" />
          </div>
        </header>

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-6xl w-full mx-auto">
          {children}
        </main>

        <footer className="border-t border-border bg-card/50 px-4 sm:px-6 lg:px-8 py-4 text-center text-xs text-muted-foreground">
          Ceteris Paribus: Empowering the Informal Economy.
        </footer>
      </div>
    </div>
  );
}
