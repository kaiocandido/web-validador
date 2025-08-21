// src/Container/Cadastro/cadastro.jsx
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Logo from "../../Assets/Monitor-rafiki.svg";
import { api } from "../../Services/api";

const schema = yup
  .object({
    name: yup.string().required("Nome é obrigatório"),
    email: yup.string().email("Email inválido").required("Email é obrigatório"),
    cnpj: yup.string().required("CNPJ é obrigatório"),
    number_phone: yup.string().required("Número de telefone é obrigatório"),
    enterpriseName: yup.string().required("Nome da empresa é obrigatório"),
    password: yup
      .string()
      .min(6, "A senha deve ter pelo menos 6 caracteres")
      .required("Senha é obrigatória"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "As senhas devem ser iguais")
      .required("Confirmação de senha é obrigatória"),
    admin: yup.boolean().default(false),
  })
  .required();

export function Cadastro() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { admin: false },
  });

  const onSubmit = async (data) => {
    try {
      const { status } = await api.post(
        "/users",
        {
          name: data.name,
          email: data.email,
          number_phone: data.number_phone,
          cnpj: data.cnpj,
          enterpriseName: data.enterpriseName,
          password: data.password,
        },
        { validateStatus: () => true },
      );

      if (status === 201) {
        toast.success("Usuário cadastrado com sucesso!");
        reset(); // limpa o formulário
      } else if (status === 409 || status === 400) {
        toast.error("Email já cadastrado!");
      } else {
        throw new Error();
      }
    } catch (error) {
      toast.error("Erro ao cadastrar usuário. Tente novamente.");
    }
  };

  return (
    <main className="sm:ml-14 p-4">
      <header className="items-center justify-center flex flex-col mt-10">
        <h1 className="font-bold text-4xl">Cadastro de Clientes</h1>
        <img src={Logo} alt="Logo" className="w-full h-100 flex p-16" />
      </header>

      <div className="flex justify-center items-center py-10">
        <div className="bg-white border p-8 rounded-lg shadow-lg w-full max-w-xl">
          <h2 className="text-2xl font-bold text-center mb-4">Cadastro</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            {/* Nome */}
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                type="text"
                placeholder="Digite seu nome"
                {...register("name")}
                aria-invalid={!!errors?.name}
                aria-describedby={errors?.name ? "name-error" : undefined}
              />
              <p id="name-error" className="text-sm text-red-600">
                {errors?.name?.message}
              </p>
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Digite seu email"
                {...register("email")}
                aria-invalid={!!errors?.email}
                aria-describedby={errors?.email ? "email-error" : undefined}
              />
              <p id="email-error" className="text-sm text-red-600">
                {errors?.email?.message}
              </p>
            </div>

            {/* CNPJ */}
            <div>
              <Label htmlFor="cnpj">CNPJ</Label>
              <Input
                id="cnpj"
                type="text"
                placeholder="Digite seu CNPJ"
                {...register("cnpj")}
                aria-invalid={!!errors?.cnpj}
                aria-describedby={errors?.cnpj ? "cnpj-error" : undefined}
              />
              <p id="cnpj-error" className="text-sm text-red-600">
                {errors?.cnpj?.message}
              </p>
            </div>

            {/* Número de telefone */}
            <div>
              <Label htmlFor="number_phone">Número de Telefone</Label>
              <Input
                id="number_phone"
                type="text"
                placeholder="Digite seu telefone"
                {...register("number_phone")}
                aria-invalid={!!errors?.number_phone}
                aria-describedby={
                  errors?.number_phone ? "number_phone-error" : undefined
                }
              />
              <p id="number_phone-error" className="text-sm text-red-600">
                {errors?.number_phone?.message}
              </p>
            </div>

            {/* Nome da empresa */}
            <div>
              <Label htmlFor="enterpriseName">Nome da Empresa</Label>
              <Input
                id="enterpriseName"
                type="text"
                placeholder="Digite o nome da sua empresa"
                {...register("enterpriseName")}
                aria-invalid={!!errors?.enterpriseName}
                aria-describedby={
                  errors?.enterpriseName ? "enterpriseName-error" : undefined
                }
              />
              <p id="enterpriseName-error" className="text-sm text-red-600">
                {errors?.enterpriseName?.message}
              </p>
            </div>

            {/* Senha */}
            <div>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                {...register("password")}
                aria-invalid={!!errors?.password}
                aria-describedby={errors?.password ? "password-error" : undefined}
              />
              <p id="password-error" className="text-sm text-red-600">
                {errors?.password?.message}
              </p>
            </div>

            {/* Confirmar Senha */}
            <div>
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Repita sua senha"
                {...register("confirmPassword")}
                aria-invalid={!!errors?.confirmPassword}
                aria-describedby={
                  errors?.confirmPassword ? "confirmPassword-error" : undefined
                }
              />
              <p id="confirmPassword-error" className="text-sm text-red-600">
                {errors?.confirmPassword?.message}
              </p>
            </div>

            {/* Botão de enviar */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-500 text-white hover:bg-blue-600"
            >
              {isSubmitting ? "Cadastrando..." : "Cadastrar"}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
