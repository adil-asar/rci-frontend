import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { useState } from "react";
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
import { GoogleOAuthProvider } from "@react-oauth/google";
import VerifyEmailPage from "./components/VerifyEmail";

const Layout = () => {
  const handleLogout = async () => {
    localStorage.removeItem("rci-user");
    localStorage.removeItem("rci-token");
    window.location.href = "/signin";
  };

  return (
    <>
      <Toaster richColors position="top-right" />
      <div className="home scroll-smooth">
        <Navbar handleLogout={handleLogout} />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

function App() {
  const [theme, setTheme] = useState<Theme>("dark");

  const routes = createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/services/:id" element={<FormPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/ordernow/:id" element={<OrderForm />} />
        <Route path="/404NotFound" element={<NotFound404 />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/contact" element={<Contact />} />
           <Route path="/verify-email" element={<VerifyEmailPage />} />
      </Route>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/success-login" element={<SuccessLogin />} />
    </Route>
  );

  const router = createBrowserRouter(routes);

  return (
    <GoogleOAuthProvider clientId="1039328786603-e14ec2dg5gk29ulh4spd1c9pu65s002t.apps.googleusercontent.com">
      <ThemeContext.Provider value={{ setTheme, theme }}>
        <div className={`font-primary tracking-wider overflow-hidden scroll-smooth bg-drk-color ${theme === "light" ? "" : "dark"}`}>
          <RouterProvider router={router} />
        </div>
      </ThemeContext.Provider>
    </GoogleOAuthProvider>
  );
}

export default App;