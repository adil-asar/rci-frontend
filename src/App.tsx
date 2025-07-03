import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import FormPage from "./components/FormPage";
import Contact from "./components/Contact";
import OrderForm from "./components/OrderForm";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import SuccessLogin from "./components/SuccessLogin";
import AdminDashboard from "./components/AdminDashboard";
import NotFound404 from "./components/NotFound404";
import { Toaster } from "@/components/ui/sonner";
import { Theme, ThemeContext } from "./components/global/Context";

const Layout = () => {
  const handleLogout = async () => {
    try {
      localStorage.removeItem("rci-user");
      localStorage.removeItem("rci-token");
      window.location.href = "/signin";
    } catch (error) {
      console.error(error);
    }
  };

 

  return (
    <>
      <Toaster richColors position="top-right" />
      <div className="home scroll-smooth">
        <Navbar handleLogout={handleLogout}  />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

function App() {
  const [theme, setTheme] = useState<Theme>("dark");
  // const token = localStorage.getItem('rci-token');
  // const userData = localStorage.getItem('rci-user');
  // const user = userData ? userData : null;

  const routes = createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/services/:id" element={<FormPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/ordernow/:id" element={<OrderForm />} />
        <Route path="/404NotFound" element={<NotFound404 />} />

        <Route path="/admin" element={<AdminDashboard />} />
      </Route>

      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/success-login" element={<SuccessLogin />} />
    </Route>
  );

  const router = createBrowserRouter(routes);

  return (
    <ThemeContext.Provider value={{ setTheme, theme }}>
      <div
        className={`font-primary tracking-wider overflow-hidden scroll-smooth bg-drk-color ${
          theme === "light" ? "" : "dark"
        }`}
      >
        <RouterProvider router={router} />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
