import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Menu from './componentes/Menu'
import Home from './componentes/telas/Home'
import Sobre from "./componentes/telas/Sobre";
import Login from "./componentes/telas/Login"
import PrivateRoute from "./componentes/PrivateRoute"
import Lancamento from "./componentes/telas/Lancamentos/Lancamento";
import TipoFinanceiroPagina from "./componentes/telas/FilTipoFinanceiro";
import Cadastro from "./componentes/telas/Usuarios/Cadastro";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },

  {
    path: "/cadastro",
    element: <Cadastro />
  },

  {
    path: "/app",

    element: (
      <PrivateRoute>

        <Lancamento>
          <Menu />
        </Lancamento>

      </PrivateRoute>
    ),

    children: [

      {
        index: true,
        element: <Home />
      },

      {
        path: "sobre",
        element: <Sobre />
      },

      {
        path: "tiposfinanceiros",
        element: <TipoFinanceiroPagina />
      }
    ]
  }
]);

function App() {

  return <RouterProvider router={router} />;
}

export default App;