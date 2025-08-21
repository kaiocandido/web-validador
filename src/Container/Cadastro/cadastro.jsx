import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

import Logo from "../../Assets/Monitor-rafiki.svg";
import { api } from "../../Services/api";

export function Cadastro() {
  const schema = yup
    .object({
      name: yup.string().required("Nome é obrigatório"),
      email: yup
        .string()
        .email("Email inválido")
        .required("Email é obrigatório"),
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
      admin: yup.boolean(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  console.log(errors);

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
        {
          validateStatus: () => true,
        },
      );

      if (status === 201) {
        toast.success("Usuário cadastrado com sucesso!");
      } else if (status === 409 || status === 400) {
        toast.error("Email já cadastrado!");
      } else {
        throw new Error();
      }
      console.log(status);
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
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white border-2 p-8 rounded-lg shadow-lg w-180">
          <h2 className="text-2xl font-bold text-center mb-4">Cadastro</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Nome */}
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                name="name"
                type="text"
                {...register("name")}
                placeholder="Digite seu nome"
                required
              />
              <p>{errors?.name?.message}</p>
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                {...register("email")}
                placeholder="Digite seu email"
                required
              />
              <p>{errors?.email?.message}</p>
            </div>

            {/* CNPJ */}
            <div>
              <Label htmlFor="cnpj">CNPJ</Label>
              <Input
                id="cnpj"
                name="cnpj"
                type="text"
                {...register("cnpj")}
                placeholder="Digite seu CNPJ"
                required
              />
              <p>{errors?.cnpj?.message}</p>
            </div>

            {/* Número de telefone */}
            <div>
              <Label htmlFor="number_phone">Número de Telefone</Label>
              <Input
                id="number_phone"
                name="number_phone"
                type="text"
                {...register("number_phone")}
                placeholder="Digite seu telefone"
                required
              />
              <p>{errors?.number_phone?.message}</p>
            </div>

            {/* Nome da empresa */}
            <div>
              <Label htmlFor="enterpriseName">Nome da Empresa</Label>
              <Input
                id="enterpriseName"
                name="enterpriseName"
                type="text"
                {...register("enterpriseName")}
                placeholder="Digite o nome da sua empresa"
                required
              />
              <p>{errors?.enterpriseName?.message}</p>
            </div>

            {/* Senha */}
            <div>
              <Label htmlFor="password_hash">Senha</Label>
              <Input
                id="password_hash"
                name="password_hash"
                type="password"
                {...register("password")}
                placeholder="Digite sua senha"
                required
              />
              <p>{errors?.password?.message}</p>
            </div>
            {/* Confirmar Senha */}
            <div>
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                {...register("confirmPassword")}
                placeholder="Digite sua senha"
                required
              />
              <p>{errors?.confirmPassword?.message}</p>
            </div>

            {/* Checkbox para Admin 
            <div className="flex items-center">
                <input
                id="admin"
                name="admin"
                type="checkbox"
                className="mr-2"
                />
                <Label htmlFor="admin">Admin</Label>
            </div>
            */}

            {/* Botão de enviar */}
            <Button
              type="submit"
              className="w-full bg-blue-500 text-white hover:bg-blue-600"
            >
              Cadastrar
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
