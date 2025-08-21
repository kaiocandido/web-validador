import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";

import Logo from "../../Assets/Innovation-amico (1).svg";
import { api } from "../../Services/api";

export function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const schema = yup
    .object({
      email: yup
        .string()
        .email("Email inválido")
        .required("Email é obrigatório"),
      password: yup
        .string()
        .min(6, "A senha deve ter pelo menos 6 caracteres")
        .required("Senha é obrigatória"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const response = await toast.promise(
      api.post("/sessions", {
        email: data.email,
        password: data.password,
      }),
      {
        pending: "Entrando...",
        success: {
          render() {
            setTimeout(() => {
              navigate("/");
            }, 2000);
            return "Login realizado com sucesso!";
          },
        },
        error: "Verifique suas credenciais e tente novamente.",
      },
    );
    console.log(response);
  };

  return (
    <main className="min-h-screen w-full bg-background">
      {/* MOBILE banner (apenas mobile) */}
      <div className="md:hidden w-full flex items-center justify-center p-8">
        <img src={Logo} alt="Logo" className="w-full max-w-sm h-auto" />
      </div>

      {/* GRID responsivo: 1 col no mobile, 2 cols no desktop */}
      <div className="mx-auto grid min-h-[calc(100vh-0px)] grid-cols-1 md:grid-cols-2">
        {/* COL ESQUERDA: banner (apenas desktop) */}
        <div className="hidden md:flex items-center justify-center bg-primary-foreground">
          <img src={Logo} alt="Logo" className="w-full h-auto p-16 max-w-2xl" />
        </div>

        {/* COL DIREITA: card do formulário */}
        <section className="flex h-full w-full items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="flex flex-col items-center justify-center text-center">
              <CardTitle className="text-4xl font-bold tracking-tighter mb-6">
                Entrar
              </CardTitle>
              <CardDescription>
                Use seu e-mail e senha para entrar na sua conta.
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <CardContent>
                {/* Email */}
                <div className="mt-2">
                  <Label htmlFor="email" className="font-bold">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Digite seu e-mail"
                    className="w-full mt-1"
                    {...register("email")}
                    required
                    aria-invalid={!!errors?.email}
                    aria-describedby={errors?.email ? "email-error" : undefined}
                  />
                  <p id="email-error" className="mt-2 text-sm text-red-600">
                    {errors?.email?.message}
                  </p>
                </div>

                {/* Senha + mostrar/ocultar */}
                <div className="mt-4">
                  <Label htmlFor="password" className="font-bold">
                    Senha
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Digite sua senha"
                      className="w-full pr-10"
                      {...register("password")}
                      required
                      aria-invalid={!!errors?.password}
                      aria-describedby={
                        errors?.password ? "password-error" : undefined
                      }
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute inset-y-0 right-2 flex items-center justify-center p-2 rounded-md hover:bg-muted"
                      aria-label={
                        showPassword ? "Ocultar senha" : "Mostrar senha"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <p id="password-error" className="mt-2 text-sm text-red-600">
                    {errors?.password?.message}
                  </p>
                </div>

                {/* Botão */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-6 w-full bg-chart-3 hover:cursor-pointer hover:opacity-80 transition-all duration-200"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Entrar"
                  )}
                </Button>
              </CardContent>
            </form>

            {/* Esqueci minha senha */}
            <div className="flex flex-col items-center w-full p-4">
              <Separator />
              <a className="text-sm text-muted-foreground mt-4 hover:cursor-pointer hover:opacity-80 transition-all duration-200">
                Esqueci minha senha?
              </a>
            </div>

            <CardFooter className="text-muted-foreground text-center text-sm">
              <p>
                Ao entrar em nossa plataforma você concorda com nossos Termos de
                Uso e Política de Privacidade
              </p>
            </CardFooter>
          </Card>
        </section>
      </div>
    </main>
  );
}
