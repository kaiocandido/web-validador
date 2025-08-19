import { useState } from 'react';
import { Button } from '../../components/ui/button'; // Usando o botão do ShadCN/UI
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'; // Usando o Card do ShadCN/UI
import Logo from "../../Assets/Monitor-rafiki.svg";

// Exemplo de dados de clientes (20 clientes)
const initialClients = [
  { id: 1, name: 'João Silva', email: 'joao@example.com', empresa: 'Empresa A', telefone: '1234-5678' },
  { id: 2, name: 'Maria Oliveira', email: 'maria@example.com', empresa: 'Empresa B', telefone: '2345-6789' },
  { id: 3, name: 'Carlos Santos', email: 'carlos@example.com', empresa: 'Empresa C', telefone: '3456-7890' },
  { id: 4, name: 'Ana Souza', email: 'ana@example.com', empresa: 'Empresa D', telefone: '4567-8901' },
  { id: 5, name: 'Lucas Costa', email: 'lucas@example.com', empresa: 'Empresa E', telefone: '5678-9012' },
  { id: 6, name: 'Fernanda Lima', email: 'fernanda@example.com', empresa: 'Empresa F', telefone: '6789-0123' },
  { id: 7, name: 'Gustavo Pereira', email: 'gustavo@example.com', empresa: 'Empresa G', telefone: '7890-1234' },
  { id: 8, name: 'Patricia Rocha', email: 'patricia@example.com', empresa: 'Empresa H', telefone: '8901-2345' },
  { id: 9, name: 'Ricardo Silva', email: 'ricardo@example.com', empresa: 'Empresa I', telefone: '9012-3456' },
  { id: 10, name: 'Eduardo Martins', email: 'eduardo@example.com', empresa: 'Empresa J', telefone: '0123-4567' },
  { id: 11, name: 'Juliana Lima', email: 'juliana@example.com', empresa: 'Empresa K', telefone: '2345-6789' },
  { id: 12, name: 'Vitor Oliveira', email: 'vitor@example.com', empresa: 'Empresa L', telefone: '3456-7890' },
  { id: 13, name: 'Bianca Souza', email: 'bianca@example.com', empresa: 'Empresa M', telefone: '4567-8901' },
  { id: 14, name: 'Roberta Costa', email: 'roberta@example.com', empresa: 'Empresa N', telefone: '5678-9012' },
  { id: 15, name: 'Carlos Henrique', email: 'carlos.henrique@example.com', empresa: 'Empresa O', telefone: '6789-0123' },
  { id: 16, name: 'Juliana Martins', email: 'juliana.martins@example.com', empresa: 'Empresa P', telefone: '7890-1234' },
  { id: 17, name: 'Marcelo Silva', email: 'marcelo.silva@example.com', empresa: 'Empresa Q', telefone: '8901-2345' },
  { id: 18, name: 'Luciana Ribeiro', email: 'luciana.ribeiro@example.com', empresa: 'Empresa R', telefone: '9012-3456' },
  { id: 19, name: 'Rafael Oliveira', email: 'rafael.oliveira@example.com', empresa: 'Empresa S', telefone: '0123-4567' },
  { id: 20, name: 'Jéssica Santos', email: 'jessica.santos@example.com', empresa: 'Empresa T', telefone: '2345-6789' }
];

export function Clientes() {
  const [clients, setClients] = useState(initialClients);
  const [currentPage, setCurrentPage] = useState(1); // Página atual
  const [searchTerm, setSearchTerm] = useState(''); // Estado para armazenar o filtro de pesquisa

  const itemsPerPage = 5; // Número de itens por página

  // Função para excluir cliente
  const handleDelete = (id) => {
    setClients(clients.filter(client => client.id !== id)); // Remove o cliente da lista
  };

  // Função para filtrar os clientes com base no nome, telefone ou empresa
  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) || // Filtra por nome
    client.telefone.includes(searchTerm) || // Filtra por telefone
    client.empresa.toLowerCase().includes(searchTerm.toLowerCase()) || // Filtra por empresa
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) // Filtra por email
  );

  // Paginação: Calculando a parte da lista que será exibida na página atual
  const indexOfLastClient = currentPage * itemsPerPage; // Índice do último cliente na página
  const indexOfFirstClient = indexOfLastClient - itemsPerPage; // Índice do primeiro cliente na página
  const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient); // Slice para pegar os clientes da página atual

  // Função para mudar a página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Cálculo do número total de páginas
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);

  return (
    <main className="sm:ml-14 p-4">
      <header className="items-center justify-center flex flex-col mt-10">
        <h1 className="font-bold text-4xl">Clientes</h1>
        <img src={Logo} alt="Logo" className="w-full h-100 flex p-16" />
      </header>
      
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Lista de Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Filtro de pesquisa */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Buscar por nome, telefone, empresa ou e-mail"
                className="border p-2 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Tabela de Clientes */}
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
                {currentClients.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-2 text-center text-gray-500">
                      Nenhum cliente encontrado.
                    </td>
                  </tr>
                ) : (
                  currentClients.map((client) => (
                    <tr key={client.id} className="border-b">
                      <td className="px-4 py-2">{client.name}</td>
                      <td className="px-4 py-2">{client.email}</td>
                      <td className="px-4 py-2">{client.empresa}</td>
                      <td className="px-4 py-2">{client.telefone}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Paginação */}
            <div className="mt-4 flex justify-center">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => paginate(currentPage - 1)}
              >
                Anterior
              </Button>
              {Array.from({ length: totalPages }, (_, index) => (
                <Button
                  key={index + 1}
                  variant={index + 1 === currentPage ? 'filled' : 'outline'}
                  size="sm"
                  className="mx-1"
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => paginate(currentPage + 1)}
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
