import { createBrowserRouter } from "react-router-dom";
import { Login } from "../Container/Login/login.jsx";
import { Inicio } from "../Container/Inicio/inicio.jsx";
//import { SideBar } from './Container/SideBar/sideBar.jsx'
//import { Inicio } from './Container/Inicio/inicio.jsx'
//import  {PageValidacao } from './Container/PageValidacao/pageValidacao.jsx'
//import { Clientes } from './Container/Clientes/clientes.jsx'
//import { Cadastro } from './Container/Cadastro/cadastro.jsx'

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/",
        element: <Inicio />,
    }
])