// src/Routes/index.jsx
import { createBrowserRouter } from "react-router-dom";

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
