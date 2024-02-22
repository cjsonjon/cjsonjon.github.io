import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Write from "./pages/Write";
import Home from "./pages/Home";
import Single from "./pages/Single";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./css/style.scss"

import Banner from "./pages/Banner";
import Hiring from "./pages/Hiring";
import Contact from "./pages/Contact";
import Video from "./pages/Video";
import ProdServ from "./pages/ProdServ";


const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/post/:id",
        element: <Single />,
      },

      {
        path: "/write",
        element: <Write />,
      },
      {
        path: "/banner",
        element: <Banner />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/hiring",
        element: <Hiring />,
      },
      {
        path: "/video",
        element: <Video />,
      },
      {
        path: "/prodserv",
        element: <ProdServ />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
