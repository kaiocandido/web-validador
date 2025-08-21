// src/Container/SideBar/sideBar.jsx
import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Menu, Package, X, Home, Check, User, Settings2, LogOut } from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function SideBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = () => setMobileOpen(false);

  // Classes condicionais para NavLink (recebe { isActive })
  const linkClassesIconOnly = ({ isActive }) =>
    `flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors hover:text-foreground ${
      isActive ? 'text-foreground' : 'text-muted-foreground'
    }`;

  const linkClassesRow = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-muted ${
      isActive ? 'bg-muted text-foreground' : 'text-muted-foreground'
    }`;

  return (
    <div className="h-screen">
      {/* ======= MOBILE TOP BAR (xs) ======= */}
      <div className="sm:hidden sticky top-0 z-20 flex items-center gap-3 border-b bg-white px-4 py-3">
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Abrir menu"
          className="inline-flex items-center justify-center rounded-md border px-3 py-2"
        >
          <Menu className="h-5 w-5" />
        </button>
        <span className="font-semibold">Menu</span>
      </div>

      {/* ======= MOBILE DRAWER (xs) ======= */}
      {/* Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 sm:hidden"
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}
      {/* Panel */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 border-r bg-white p-4 transition-transform duration-200 sm:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-hidden={!mobileOpen}
        aria-label="Navegação móvel"
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Package className="h-4 w-4" />
          </div>
          <button
            onClick={closeMobile}
            aria-label="Fechar menu"
            className="inline-flex items-center justify-center rounded-md border px-3 py-2"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-1">
          <NavLink to="/" className={linkClassesRow} onClick={closeMobile}>
            <Home className="h-5 w-5" />
            <span>Início</span>
          </NavLink>

          <NavLink to="/validacao" className={linkClassesRow} onClick={closeMobile}>
            <Check className="h-5 w-5" />
            <span>Validação</span>
          </NavLink>

          <NavLink to="/clientes" className={linkClassesRow} onClick={closeMobile}>
            <User className="h-5 w-5" />
            <span>Clientes</span>
          </NavLink>

          <NavLink to="/cadastro" className={linkClassesRow} onClick={closeMobile}>
            <Settings2 className="h-5 w-5" />
            <span>Cadastro</span>
          </NavLink>
        </nav>

        <div className="mt-auto pt-4">
          <NavLink to="/login" className={linkClassesRow} onClick={closeMobile}>
            <LogOut className="h-5 w-5" />
            <span>Sair</span>
          </NavLink>
        </div>
      </aside>

      {/* ======= DESKTOP SIDEBAR (sm+) ======= */}
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 border-r bg-white sm:flex flex-col">
        <nav className="flex flex-col items-center gap-4 px-2 py-5">
          <TooltipProvider>
            <NavLink
              to="/"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
            >
              <Package className="h-4 w-4" />
              <span className="sr-only">Dashboard</span>
            </NavLink>

            <Tooltip>
              <TooltipTrigger asChild>
                <NavLink to="/" className={linkClassesIconOnly}>
                  <Home className="ml-2 mt-2 h-5 w-5" />
                  <span className="sr-only">Início</span>
                </NavLink>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-white text-black">
                Início
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <NavLink to="/validacao" className={linkClassesIconOnly}>
                  <Check className="ml-2 mt-2 h-5 w-5" />
                  <span className="sr-only">Validação</span>
                </NavLink>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-white text-black">
                Validação
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <NavLink to="/clientes" className={linkClassesIconOnly}>
                  <User className="ml-2 mt-2 h-5 w-5" />
                  <span className="sr-only">Clientes</span>
                </NavLink>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-white text-black">
                Clientes
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <NavLink to="/cadastro" className={linkClassesIconOnly}>
                  <Settings2 className="ml-2 mt-2 h-5 w-5" />
                  <span className="sr-only">Cadastro</span>
                </NavLink>
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
                <NavLink to="/login" className={linkClassesIconOnly}>
                  <LogOut className="h-5 w-5" />
                  <span className="sr-only">Sair</span>
                </NavLink>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-white text-black">
                Sair
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>

      {/* ======= MAIN CONTENT ======= */}
      <main className="sm:ml-14 h-full overflow-auto bg-gray-50 p-6">
        <Outlet />
      </main>
    </div>
  );
}
