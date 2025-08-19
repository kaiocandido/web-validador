import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Logo from "../../Assets/Innovation-amico (1).svg";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { api } from "../../Services/api";
import { toast } from "react-toastify";

export function Login() {

  const schema = yup.object({
    email: yup.string().email("Email inválido").required("Email é obrigatório"),
    password: yup.string().min(6, "A senha deve ter pelo menos 6 caracteres").required("Senha é obrigatória"),
  }).required();

  const { 
    register, 
    handleSubmit, 
    formState: { errors },
   } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async(data) => {
    const response = await toast.promise(
      api.post("/sessions", {
      email: data.email,
      password: data.password,  
      }),
      {
        pending: "Entrando...",
        success: "Login realizado com sucesso!",
        error: "Verifique suas credenciais e tente novamente.",
      }
    );
    console.log(response);
  };

  return (
    <main className="h-screen flex w-full">
      <div className="bg-primary-foreground w-full h-full flex p-16">
        <img src={Logo} alt="Logo" className="w-full h-full flex p-16" />
      </div>

      <section className="flex bg-background h-full max-w-3xl w-full p-4 items-center justify-center">
        <Card className="w-full max-w-md ">
          <CardHeader className="flex flex-col items-center justify-center text-center">
            <CardTitle className="text-4xl font-bold tracking-tighter mb-6">Entrar</CardTitle>
            <CardDescription>
              Use seu e-mail e senha para entrar na sua conta.
            </CardDescription>
          </CardHeader>

          {/* Formulário de login */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
              {/* Campo de e-mail */}
              <div className="mt-4">
                <Label htmlFor="email" className="font-bold">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  {...register("email")}
                  placeholder="Digite seu e-mail"
                  className="w-full mt-1"
                  required
                />
                <p className="mt-2">{errors?.email?.message}</p>
              </div>

              {/* Campo de senha */}
              <div className="mt-4">
                <Label htmlFor="password" className="font-bold">Senha</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  {...register("password")}
                  placeholder="Digite sua senha"
                  className="w-full mt-1"
                  required
                />
                <p className="mt-2">{errors?.password?.message}</p>
              </div>

              {/* Botão de enviar */}
              <Button
                type="submit"
                className="mt-6 w-full bg-chart-3 hover:cursor-pointer hover:opacity-80 transition-all duration-200"
              >
                Entrar
              </Button>
            </CardContent>
          </form>

          {/* Esqueci minha senha */}
          <div className="flex flex-col items-center w-full p-4">
            <Separator />
            <a className="text-sm text-muted-foreground mt-4 hover: cursor-pointer hover:opacity-80 transition-all duration-200">
              Esqueci minha senha?
            </a>
          </div>

          {/* Rodapé com termos de uso */}
          <CardFooter className="text-muted-foreground text-center text-sm">
            <p>
              Ao entrar em nossa plataforma você concorda com nossos Termos de Uso e Política de Privacidade
            </p>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
}
