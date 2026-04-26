import { useState } from "react";
import { Menu } from "lucide-react";
import { Sidebar, Section } from "@/components/ceteris/Sidebar";
import { MpesaToggle } from "@/components/ceteris/MpesaToggle";
import { Dashboard } from "@/components/ceteris/Dashboard";
import { CrisisManager } from "@/components/ceteris/CrisisManager";
import { Literacia, Negocios, Comunidade, MpesaPage } from "@/components/ceteris/Modules";

const titles: Record<Section, string> = {
  dashboard: "Painel Principal",
  crisis: "Gestor de Choques",
  literacia: "Literacia",
  negocios: "Negócios",
  comunidade: "Comunidade",
  mpesa: "M-Pesa Sync",
};

const Index = () => {
  const [section, setSection] = useState<Section>("dashboard");
  const [mpesa, setMpesa] = useState(true);
  const [points, setPoints] = useState(180);
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-soft text-foreground flex w-full">
      <Sidebar
        active={section}
        onChange={setSection}
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
              <h1 className="text-base sm:text-lg font-semibold truncate">{titles[section]}</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Bem-vindo de volta · Olá, Amina
              </p>
            </div>
            <MpesaToggle
              on={mpesa}
              onToggle={() => setMpesa((v) => !v)}
              label="M-Pesa Integration"
            />
          </div>
        </header>

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-6xl w-full mx-auto">
          {section === "dashboard" && <Dashboard go={setSection} points={points} />}
          {section === "crisis" && <CrisisManager />}
          {section === "literacia" && (
            <Literacia
              points={points}
              addPoints={(n) => setPoints((p) => Math.min(500, p + n))}
            />
          )}
          {section === "negocios" && <Negocios />}
          {section === "comunidade" && <Comunidade />}
          {section === "mpesa" && <MpesaPage on={mpesa} toggle={() => setMpesa((v) => !v)} />}
        </main>

        <footer className="border-t border-border bg-card/50 px-4 sm:px-6 lg:px-8 py-4 text-center text-xs text-muted-foreground">
          Ceteris Paribus: Empowering the Informal Economy.
        </footer>
      </div>
    </div>
  );
};

export default Index;
