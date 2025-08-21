import { createRoot } from "react-dom/client";
//import { SideBar } from './Container/SideBar/sideBar.jsx'
//import { Inicio } from './Container/Inicio/inicio.jsx'
//import  {PageValidacao } from './Container/PageValidacao/pageValidacao.jsx'
import "../src/index.css";
//import { Clientes } from './Container/Clientes/clientes.jsx'
//import { Cadastro } from './Container/Cadastro/cadastro.jsx'
import "react-toastify/dist/ReactToastify.css";

import { router } from "./Routes/index.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer autoClose={2000} theme="light" />
    <RouterProvider router={router} />
  </StrictMode>,
);
