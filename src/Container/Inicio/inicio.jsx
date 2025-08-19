import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Key, User } from "lucide-react";
import { Chart } from "../../Pages/Chart/chart.jsx";
import Logo from "../../Assets/Onboarding-amico.svg";

export function Inicio() {
  return (
    <main className="sm:ml-14 p-4">
      <header className="items-center justify-center flex flex-col mt-10">
        <h1 className="font-bold text-4xl"> Seja bem vindo</h1>
        <img src={Logo} alt="Logo" className="w-full h-100 flex p-16" />
      </header>
      <section className="grid grid-cols-2 lg:gid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-center ">
              <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
                Total De Clientes
              </CardTitle>
              <User className="ml-auto w-4 h-4"></User>
            </div>
            <CardDescription>
              Total de clientes cadastrados no sistema.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-base sm:text-lg font-bold">200</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-center ">
              <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
                Total De Tokens
              </CardTitle>
              <Key className="ml-auto w-4 h-4"></Key>
            </div>
            <CardDescription>
              Total de tokens gerados no sistema.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-base sm:text-lg font-bold">500</p>
          </CardContent>
        </Card>


      </section>

      <section className="mt-4 flex flex-col md-flex-row gap-4">
        <Chart/>
      </section>
    </main>
  );
}
