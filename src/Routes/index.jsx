// src/Routes/index.jsx
import { createBrowserRouter } from "react-router-dom";
import { SideBar } from "../Container/SideBar/sideBar.jsx";
import { Inicio } from "../Container/Inicio/inicio.jsx";
import { PageValidacao } from "../Container/PageValidacao/pageValidacao.jsx";
import { Clientes } from "../Container/Clientes/clientes.jsx";
import { Cadastro } from "../Container/Cadastro/cadastro.jsx";
import { Login } from "../Container/Login/login.jsx";


export const router = createBrowserRouter([
  // sem sidebar
  { path: "/login", element: <Login /> },

  // com sidebar (grupo de rotas com Outlet)
  {
    element: <SideBar />,
    children: [
      { index: true, element: <Inicio /> }, // "/"
      { path: "cadastro", element: <Cadastro /> },
      { path: "clientes", element: <Clientes /> },
      { path: "validacao", element: <PageValidacao /> },
      // { path: "teste", element: <AlgumaCoisa /> },
    ],
  },
]);
