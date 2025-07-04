import { useEffect, useState } from "react";
import rciLogo from "../assets/rciLogo.png";
import CustomButton from "./global/CustomButton";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { CiMenuBurger } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi";
import { Link as ScrollLink } from "react-scroll";
import { Link as ReactLink, useLocation, useNavigate } from "react-router-dom";
import { Moon, SunMoon } from "lucide-react";
import { useThemeContext } from "./global/Context";

const navbar = [
  { title: "Home", to: "home" },
  { title: "About", to: "about" },
  { title: "Services", to: "services" },
  { title: "Why Choose Us", to: "whychooseus" },
  { title: "Contact", to: "/contact" }, // This is a route
];

type Props = {
  handleLogout(): void;
};

const Navbar = ({ handleLogout }: Props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [token, setToken] = useState<string | null>("");
  const [active] = useState<number>(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useThemeContext();

  useEffect(() => {
    const token = localStorage.getItem("rci-token");
    setToken(token);
  }, [navigate]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  const handleMenuOption = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  const openInNewTab = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleLightDarkMode = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <>
      {location?.pathname !== "/admin" && (
        <div className="relative max-w-7xl mx-auto py-3 px-2">
          {/* Mobile Menu */}
          {menuOpen && (
            <div className="fixed inset-0 bg-zinc-900 h-screen py-3 px-2 z-50">
              <div className="flex items-center justify-between mb-10 px-3 sm:px-10">
                <img src={rciLogo} alt="rcilogo" className="w-[10rem] cursor-pointer" />
                <div
                  className="transition-all hover:bg-zinc-800 text-zinc-400 p-4 rounded-full cursor-pointer"
                  onClick={handleMenuOption}
                >
                  <TfiClose size={40} />
                </div>
              </div>
              <ul className="flex flex-col items-center w-full cursor-pointer uppercase">
                {navbar.map((item, index) => (
                  <li
                    key={index}
                    className="text-3xl sm:text-6xl p-2 font-extrabold m-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-400"
                    onClick={handleNavClick}
                  >
                    {item.to.startsWith("/") ? (
                      <ReactLink to={item.to}>{item.title}</ReactLink>
                    ) : (
                      <ScrollLink to={item.to} smooth={true} duration={500}>
                        {item.title}
                      </ScrollLink>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Main Navbar */}
          <div className="flex justify-between items-center mb-10 px-3 sm:px-10">
            {/* Socials */}
            <div className="hidden md:flex gap-2">
              {[FaFacebook, FaInstagram, FaLinkedin].map((Icon, idx) => (
                <div
                  key={idx}
                  className="p-3 border border-zinc-700 rounded-full text-zinc-400 hover:bg-zinc-400 hover:text-zinc-900 cursor-pointer"
                  onClick={() =>
                    openInNewTab(
                      idx === 0
                        ? "https://facebook.com"
                        : idx === 1
                        ? "https://instagram.com"
                        : "https://linkedin.com"
                    )
                  }
                >
                  <Icon size={20} />
                </div>
              ))}
            </div>

            {/* Logo */}
            <ReactLink to={"/"}>
              <img src={rciLogo} alt="rciLogo" className="w-[10rem] cursor-pointer" />
            </ReactLink>

            {/* Menu & Actions */}
            <div className="flex items-center gap-3">
              <div
                className="md:hidden hover:bg-zinc-800 text-zinc-400 p-4 rounded-full cursor-pointer"
                onClick={handleMenuOption}
              >
                <CiMenuBurger size={40} />
              </div>

              {theme === "light" ? (
                <Moon
                  strokeWidth={1.2}
                  className="text-zinc-900 cursor-pointer"
                  size={25}
                  onClick={handleLightDarkMode}
                />
              ) : (
                <SunMoon
                  strokeWidth={1.2}
                  className="text-zinc-400 cursor-pointer"
                  size={25}
                  onClick={handleLightDarkMode}
                />
              )}

              {token ? (
                <button
                  onClick={handleLogout}
                  className="px-10 py-4 rounded-lg bg-black text-white uppercase text-xs hover:bg-gray-900"
                >
                  Logout
                </button>
              ) : (
                <ScrollLink to={"services"} smooth={true} duration={500}>
                  <CustomButton
                    className="px-14 py-5 text-xs uppercase border hover:bg-white hover:text-black"
                    title={"Order Now"}
                  />
                </ScrollLink>
              )}
            </div>
          </div>

          <hr />

          {/* Desktop Navigation */}
          {location?.pathname === "/" && (
            <div className="hidden md:flex justify-center py-5">
              <ul className="flex items-center gap-10 text-sm font-medium uppercase">
                {navbar.map((item, index) => (
                  <li
                    key={index}
                    className={`${
                      active === index ? "text-zinc-400" : "text-zinc-500"
                    } hover:text-zinc-400`}
                  >
                    {item.to.startsWith("/") ? (
                      <ReactLink to={item.to}>{item.title}</ReactLink>
                    ) : (
                      <ScrollLink to={item.to} smooth={true} duration={500}>
                        {item.title}
                      </ScrollLink>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
