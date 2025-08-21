// src/Container/Clientes/clientes.jsx

import { useEffect, useState } from "react";

import Logo from "../../Assets/Monitor-rafiki.svg";
import { api } from "../../Services/api";

const ITEMS_PER_PAGE = 5;

export function Clientes() {
  const [clients, setClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // debounce simples
  const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchTerm), 400);
    return () => clearTimeout(t);
  }, [searchTerm]);

  const fetchUsers = async (page = 1, search = "") => {
    setLoading(true);
    try {
      const { data } = await api.get("/users", {
        params: { page, limit: ITEMS_PER_PAGE, search },
      });
      setClients(data?.data || []);
      setTotalPages(data?.meta?.totalPages || 1);
    } catch (err) {
      console.error(err);
      setClients([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage, debouncedSearch);
  }, [currentPage, debouncedSearch]);

  return (
    <main className="sm:ml-14 p-4">
      <header className="items-center justify-center flex flex-col mt-6 md:mt-10">
        <h1 className="font-bold text-3xl md:text-4xl text-center">Clientes</h1>
        {/* Esconde o banner no mobile para ganhar espaço */}
        <img
          src={Logo}
          alt="Logo"
          className="hidden md:flex w-full h-100 p-16"
        />
      </header>

      <div className="p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl font-bold">
              Lista de Clientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Busca com botão limpar */}
            <div className="mb-4 relative">
              <Input
                type="text"
                placeholder="Buscar por nome, telefone, empresa ou e-mail"
                value={searchTerm}
                onChange={(e) => {
                  setCurrentPage(1);
                  setSearchTerm(e.target.value);
                }}
                className="pr-10"
              />
              {searchTerm && (
                <button
                  type="button"
                  aria-label="Limpar busca"
                  onClick={() => {
                    setSearchTerm("");
                    setCurrentPage(1);
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-muted"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Tabela (desktop) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2 text-left">Nome</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Empresa</th>
                    <th className="px-4 py-2 text-left">Telefone</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-4 py-6 text-center text-gray-500"
                      >
                        Carregando...
                      </td>
                    </tr>
                  ) : clients.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-4 py-6 text-center text-gray-500"
                      >
                        Nenhum cliente encontrado.
                      </td>
                    </tr>
                  ) : (
                    clients.map((c) => (
                      <tr key={c.id} className="border-b">
                        <td className="px-4 py-2">{c.name}</td>
                        <td className="px-4 py-2">{c.email}</td>
                        <td className="px-4 py-2">{c.enterpriseName || "-"}</td>
                        <td className="px-4 py-2">{c.number_phone || "-"}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Cards (mobile) */}
            <div className="md:hidden space-y-3">
              {loading ? (
                <div className="text-center text-gray-500 py-6">
                  Carregando...
                </div>
              ) : clients.length === 0 ? (
                <div className="text-center text-gray-500 py-6">
                  Nenhum cliente encontrado.
                </div>
              ) : (
                clients.map((c) => (
                  <div key={c.id} className="rounded-lg border bg-white p-3">
                    <div className="font-medium text-base">{c.name}</div>
                    <div className="text-sm text-muted-foreground break-all">
                      {c.email}
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground block">
                          Empresa
                        </span>
                        <span className="font-medium">
                          {c.enterpriseName || "-"}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block">
                          Telefone
                        </span>
                        <span className="font-medium">
                          {c.number_phone || "-"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Paginação */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                Anterior
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Button
                  key={p}
                  variant={p === currentPage ? "default" : "outline"}
                  size="sm"
                  className="min-w-10"
                  onClick={() => setCurrentPage(p)}
                >
                  {p}
                </Button>
              ))}

              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                Próxima
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
