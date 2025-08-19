import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Check, Key, User } from "lucide-react";
import Logo from "../../Assets/Secure data-bro.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Separator } from "@/components/ui/separator";

export function Validacao() {
  return (
    <main className="sm:ml-14 p-4">
        <header className="items-center justify-center flex flex-col mt-10">
                <h1 className="font-bold text-4xl">Validação de Clientes</h1>
                <img src={Logo} alt="Logo" className="w-full h-100 flex p-16" />
        </header>
        <section className="grid grid-cols-2 lg:gid-cols-4 gap-4 mt-4">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-center ">
                    <CardTitle className="text-lg sm:text-xl text-gray-800 select-none ">
                        Gerar tokens
                    </CardTitle>
                    <Key className="ml-auto w-4 h-4"></Key>
                    </div>
                    <CardDescription>
                        Gerar token para validação do cliente.
                    </CardDescription>
                </CardHeader>
            
                <CardContent>
                    <div className="mt-4">
                    <Label htmlFor="email" className="font-bold">Informações do Cliente</Label>
                    <Input id="email" type="email" placeholder="E-mail" className="w-full mt-1" />
                    </div>
                    <Button className="mt-6 w-full bg-chart-3 w-full 
                    hover: cursor-pointer hover:opacity-80 transition-all duration-200">
                    Gerar</Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-center ">
                    <CardTitle className="text-lg sm:text-xl text-gray-800 select-none ">
                        Validar Cliente
                    </CardTitle>
                    <Check className="ml-auto w-4 h-4"></Check>
                    </div>
                    <CardDescription>
                        Validar o cliente com a chave gerada.
                    </CardDescription>
                </CardHeader>
  
                <CardContent>
                    <div className="mt-4">
                    <Label htmlFor="chave" className="font-bold">Chave</Label>
                    <Input id="chave" type="input" placeholder="Coloque a chave gerada" className="w-full mt-1" />
                    </div>
                    <Button className="mt-6 w-full bg-chart-3 w-full 
                    hover: cursor-pointer hover:opacity-80 transition-all duration-200">
                    Validar</Button>
                </CardContent>
            </Card>
                
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-center ">
                    <CardTitle className="text-lg sm:text-xl text-gray-800 select-none ">
                        Informações do Cliente
                    </CardTitle>
                    <User className="ml-auto w-4 h-4"></User>
                    </div>
                    <CardDescription>
                        Informações sobre o Cliente.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mt-4 items-center justify-center flex flex-col">
                        <Label htmlFor="resultado" className="font-bold">Resultado da Validação</Label>
                    </div>
                </CardContent>
                
            </Card>

        </section>
    </main>
  );
}  