// src/Container/PageValidacao/pageValidacao.jsx (ajuste o caminho se o seu for outro)
import { useState } from "react";
import { toast } from "react-toastify";

// UI (shadcn)
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

// Ícones
import {
  Key,
  Check,
  User,
  Loader2,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import Logo from "../../Assets/Secure data-bro.svg";
import { api } from "../../Services/api";

export function Validacao() {
  const [email, setEmail] = useState("");
  const [chave, setChave] = useState("");
  const [loadingGerar, setLoadingGerar] = useState(false);
  const [loadingValidar, setLoadingValidar] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalOk, setModalOk] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  const handleGerar = async () => {
    if (!email) return toast.info("Informe o e-mail.");
    setLoadingGerar(true);
    try {
      // endpoint singular conforme seu backend
      await api.post("/token/generate", { email });
      toast.success("Chave gerada e enviada por e-mail!");
    } catch (err) {
      const msg = err?.response?.data?.error || "Erro ao gerar chave.";
      toast.error(msg);
    } finally {
      setLoadingGerar(false);
    }
  };

  const handleValidar = async () => {
    if (!chave) return toast.info("Informe a chave.");
    setLoadingValidar(true);
    try {
      // backend não exige auth
      const { data } = await api.post("/token/validate", { key: chave });
      setUserInfo(data.user || null);
      setModalOk(true);
      setModalMsg("Validação realizada com sucesso.");
      setModalOpen(true);
    } catch (err) {
      const msg = err?.response?.data?.error || "Chave inválida ou expirada.";
      setUserInfo(null);
      setModalOk(false);
      setModalMsg(msg);
      setModalOpen(true);
    } finally {
      setLoadingValidar(false);
    }
  };

  return (
    <main className="sm:ml-14 p-4">
      <header className="items-center justify-center flex flex-col mt-10">
        <h1 className="font-bold text-4xl">Validação de Clientes</h1>
        <img src={Logo} alt="Logo" className="w-full h-100 flex p-16" />
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {/* Gerar tokens */}
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
                Gerar tokens
              </CardTitle>
              <Key className="ml-auto w-4 h-4" />
            </div>
            <CardDescription>
              Gerar token para validação do cliente.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mt-4">
              <Label htmlFor="email" className="font-bold">
                Informações do Cliente
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="E-mail"
                className="w-full mt-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button
              onClick={handleGerar}
              disabled={loadingGerar}
              className="mt-6 w-full bg-chart-3 hover:cursor-pointer hover:opacity-80 transition-all duration-200"
            >
              {loadingGerar ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Gerar"
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Validar cliente */}
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
                Validar Cliente
              </CardTitle>
              <Check className="ml-auto w-4 h-4" />
            </div>
            <CardDescription>
              Validar o cliente com a chave gerada.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="mt-4">
              <Label htmlFor="chave" className="font-bold">
                Chave
              </Label>
              <Input
                id="chave"
                type="text"
                placeholder="Coloque a chave gerada"
                className="w-full mt-1"
                value={chave}
                onChange={(e) => setChave(e.target.value)}
              />
            </div>
            <Button
              onClick={handleValidar}
              disabled={loadingValidar}
              className="mt-6 w-full bg-chart-3 hover:cursor-pointer hover:opacity-80 transition-all duration-200"
            >
              {loadingValidar ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Validar"
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Painel placeholder */}
        <Card className="md:col-span-2 lg:col-span-2">
          <CardHeader>
            <div className="flex items-center">
              <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
                Informações do Cliente
              </CardTitle>
              <User className="ml-auto w-4 h-4" />
            </div>
            <CardDescription>O resultado aparecerá assim que validado</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mt-4 items-center justify-center flex flex-col text-muted-foreground">
              <Label className="font-bold">Aguardando validação…</Label>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <div className="flex items-center gap-2">
              {modalOk ? (
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600" />
              )}
              <DialogTitle>
                {modalOk ? "Cliente válido" : "Chave inválida"}
              </DialogTitle>
            </div>
            <DialogDescription>
              {modalOk ? "Validação realizada com sucesso." : modalMsg}
            </DialogDescription>
          </DialogHeader>

          {modalOk && userInfo && (
            <>
              <Separator className="my-2" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Nome</span>
                  <p className="font-medium">{userInfo.name || "-"}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">E-mail</span>
                  <p className="font-medium">{userInfo.email || "-"}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Telefone</span>
                  <p className="font-medium">{userInfo.number_phone || "-"}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">CNPJ</span>
                  <p className="font-medium">{userInfo.cnpj || "-"}</p>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-muted-foreground">Empresa</span>
                  <p className="font-medium">
                    {userInfo.enterpriseName || userInfo.enterprise_name || "-"}
                  </p>
                </div>
              </div>
            </>
          )}

          <DialogFooter className="mt-4">
            <Button onClick={() => setModalOpen(false)}>Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}

export default Validacao;
