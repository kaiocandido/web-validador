import { useState } from "react"; // Para controle de estado
import { Button } from "@/components/ui/button"; // Usando o botão personalizado
import { Input } from "@/components/ui/input"; // Usando o input personalizado
import { Label } from "@/components/ui/label"; // Usando o label personalizado
import Logo from "../../Assets/Monitor-rafiki.svg";

export function Cadastro() {
  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cnpj: "",
    number_phone: "",
    enterpriseName: "",
    password_hash: "",
    admin: false,
  });

  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Aqui você enviaria os dados para o backend
    // Você pode integrar com uma API ou lógica de backend aqui
  };

  return (
    <main className="sm:ml-14 p-4">
      <header className="items-center justify-center flex flex-col mt-10">
        <h1 className="font-bold text-4xl">Clientes</h1>
        <img src={Logo} alt="Logo" className="w-full h-100 flex p-16" />
      </header>
        <div className="flex justify-center items-center h-screen">
        <div className="bg-white border-2 p-8 rounded-lg shadow-lg w-180">
            <h2 className="text-2xl font-bold text-center mb-4">Cadastro</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nome */}
            <div>
                <Label htmlFor="name">Nome</Label>
                <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Digite seu nome"
                required
                />
            </div>

            {/* Email */}
            <div>
                <Label htmlFor="email">Email</Label>
                <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Digite seu email"
                required
                />
            </div>

            {/* CNPJ */}
            <div>
                <Label htmlFor="cnpj">CNPJ</Label>
                <Input
                id="cnpj"
                name="cnpj"
                type="text"
                value={formData.cnpj}
                onChange={handleChange}
                placeholder="Digite seu CNPJ"
                required
                />
            </div>

            {/* Número de telefone */}
            <div>
                <Label htmlFor="number_phone">Número de Telefone</Label>
                <Input
                id="number_phone"
                name="number_phone"
                type="text"
                value={formData.number_phone}
                onChange={handleChange}
                placeholder="Digite seu telefone"
                required
                />
            </div>

            {/* Nome da empresa */}
            <div>
                <Label htmlFor="enterpriseName">Nome da Empresa</Label>
                <Input
                id="enterpriseName"
                name="enterpriseName"
                type="text"
                value={formData.enterpriseName}
                onChange={handleChange}
                placeholder="Digite o nome da sua empresa"
                required
                />
            </div>

            {/* Senha */}
            <div>
                <Label htmlFor="password_hash">Senha</Label>
                <Input
                id="password_hash"
                name="password_hash"
                type="password"
                value={formData.password_hash}
                onChange={handleChange}
                placeholder="Digite sua senha"
                required
                />
            </div>

            {/* Checkbox para Admin */}
            <div className="flex items-center">
                <input
                id="admin"
                name="admin"
                type="checkbox"
                checked={formData.admin}
                onChange={handleChange}
                className="mr-2"
                />
                <Label htmlFor="admin">Admin</Label>
            </div>

            {/* Botão de enviar */}
            <Button type="submit" className="w-full bg-blue-500 text-white hover:bg-blue-600">
                Criar Conta
            </Button>
            </form>
        </div>
        </div>
    </main>

  );
}
