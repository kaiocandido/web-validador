import { Check, Home, LogOut, Package, Settings2, User } from "lucide-react";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { Tooltip } from "@/components/ui/tooltip";

export function SideBar({ children }) {
  return (
    <div className="flex w-full">
      {/* Desktop Sidebar */}
      <aside className=" inset-y-0 left-0 z-10 hidden w-14 border-r sidebar-primary-foreground sm:flex flex-col">
        <nav className="flex flex-col items-center gap-4 px-2 py-5">
          <TooltipProvider>
            <a href="#" className="flex h-9 w-9 shrink-0 items-center justify-center bg-primary text-primary-foreground rounded-full">
              <Package className="h-4 w-4" />
              <span className="sr-only">Dashboard avatar</span>
            </a>

            <Tooltip>
              <TooltipTrigger asChild>
                <a href="#" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground hover:cursor-pointer">
                  <Home className="h-5 w-5" />
                  <span className="sr-only ">Inicio</span>
                </a>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-white text-black">
                Inicio
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <a href="#" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground hover:cursor-pointer">
                  <Check className="h-5 w-5" />
                  <span className="sr-only ">Validação</span>
                </a>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-white text-black">
                Validação
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <a href="#" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground hover:cursor-pointer">
                  <User className="h-5 w-5" />
                  <span className="sr-only ">Clientes</span>
                </a>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-white text-black">
                Clientes
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <a href="#" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground hover:cursor-pointer">
                  <Settings2 className="h-5 w-5" />
                  <span className="sr-only ">Cadastro</span>
                </a>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-white text-black">
                Cadastro
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>

        <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a href="#" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground hover:cursor-pointer">
                  <LogOut className="h-5 w-5" />
                  <span className="sr-only ">Sair</span>
                </a>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-white text-black">
                Sair
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>

      {/* Conteúdo Principal */}
      <div className="flex-1 ml-14 p-6">
        {children}
      </div>
    </div>
  );
}
