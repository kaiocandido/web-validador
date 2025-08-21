import { useEffect, useState } from "react";

// Se você já implementou gráficos/histórico, mantenha; senão pode comentar as partes

import Logo from "../../Assets/Onboarding-amico.svg";
import { api } from "../../Services/api";

const COLORS = ["#16a34a", "#dc2626"]; // verde/vermelho

export function Inicio() {
  const [stats, setStats] = useState({
    clients: 0,
    tokens: 0,
    validation: { valid: 0, invalid: 0 },
  });
  const [loadingStats, setLoadingStats] = useState(true);

  const [history, setHistory] = useState([]);
  const [loadingHist, setLoadingHist] = useState(true);
  const [historyEnabled, setHistoryEnabled] = useState(true); // se a rota não existir, desabilita

  useEffect(() => {
    // 1) carrega somente /stats (sempre)
    const loadStats = async () => {
      try {
        const { data } = await api.get("/stats");
        setStats({
          clients: data?.clients ?? 0,
          tokens: data?.tokens ?? 0,
          validation: {
            valid: data?.validation?.valid ?? 0,
            invalid: data?.validation?.invalid ?? 0,
          },
        });
      } catch (err) {
        console.error(
          "Erro ao carregar /stats:",
          err?.response?.data || err.message,
        );
      } finally {
        setLoadingStats(false);
      }
    };

    // 2) tenta carregar histórico; se 404/erro, só desabilita a seção sem quebrar os cards
    const loadHistory = async () => {
      try {
        const { data } = await api.get("/validation/history", {
          params: { limit: 10 },
        });
        setHistory(data?.data ?? []);
      } catch (err) {
        console.warn(
          "Histórico indisponível; ocultando seção.",
          err?.response?.status,
        );
        setHistoryEnabled(false);
      } finally {
        setLoadingHist(false);
      }
    };

    loadStats();
    loadHistory(); // opcional; não atrapalha os cards
  }, []);

  const pieData = [
    { name: "Válidos", value: stats.validation.valid },
    { name: "Inválidos", value: stats.validation.invalid },
  ];

  return (
    <main className="sm:ml-14 p-4">
      <header className="items-center justify-center flex flex-col mt-10">
        <h1 className="font-bold text-4xl">Seja bem-vindo</h1>
        <img src={Logo} alt="Logo" className="w-full h-100 flex p-16" />
      </header>

      {/* Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
                Total de Clientes
              </CardTitle>
              <User className="ml-auto w-4 h-4" />
            </div>
            <CardDescription>Clientes cadastrados.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-base sm:text-lg font-bold">
              {loadingStats ? "..." : stats.clients}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center">
              <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
                Total de Tokens
              </CardTitle>
              <Key className="ml-auto w-4 h-4" />
            </div>
            <CardDescription>Tokens gerados no sistema.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-base sm:text-lg font-bold">
              {loadingStats ? "..." : stats.tokens}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center">
              <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
                Códigos Válidos
              </CardTitle>
              <CheckCircle2 className="ml-auto w-4 h-4" />
            </div>
            <CardDescription>Dentro do prazo.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-base sm:text-lg font-bold text-green-600">
              {loadingStats ? "..." : stats.validation.valid}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center">
              <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
                Códigos Inválidos
              </CardTitle>
              <XCircle className="ml-auto w-4 h-4" />
            </div>
            <CardDescription>Expirados.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-base sm:text-lg font-bold text-red-600">
              {loadingStats ? "..." : stats.validation.invalid}
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Gráficos (com tooltip) */}
      <section className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Overview de Validação </CardTitle>
            <CardDescription>
              Passe o mouse para ver a quantidade.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius="80%"
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}`, "Quantidade"]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Overview de Validação </CardTitle>
            <CardDescription>
              Passe o mouse para ver a quantidade.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pieData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip formatter={(value) => [`${value}`, "Quantidade"]} />
                <Bar dataKey="value" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </section>

      {/* Histórico (mostra só se a rota existir) */}
      {historyEnabled && (
        <section className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Validações</CardTitle>
              <CardDescription>
                Últimas chaves verificadas (sucesso/erro).
              </CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2 text-left">Data</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Chave</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Motivo</th>
                  </tr>
                </thead>
                <tbody>
                  {loadingHist ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-6 text-center text-gray-500"
                      >
                        Carregando…
                      </td>
                    </tr>
                  ) : history.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-6 text-center text-gray-500"
                      >
                        Sem registros.
                      </td>
                    </tr>
                  ) : (
                    history.map((h) => (
                      <tr key={h.id} className="border-b">
                        <td className="px-4 py-2">
                          {new Date(h.created_at).toLocaleString()}
                        </td>
                        <td className="px-4 py-2">{h.email || "-"}</td>
                        <td className="px-4 py-2">
                          {h.key?.length > 3
                            ? `${h.key.slice(0, 3)}***`
                            : h.key}
                        </td>
                        <td className="px-4 py-2">
                          {h.success ? (
                            <span className="text-green-600 font-medium">
                              Válido
                            </span>
                          ) : (
                            <span className="text-red-600 font-medium">
                              Inválido
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-2">{h.reason || "-"}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </section>
      )}
    </main>
  );
}
