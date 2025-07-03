import { useEffect, useState } from "react";
import rciLogo from "../assets/rciLogo.png";
import CustomButton from "./global/CustomButton";
import { FaFacebook } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { CiMenuBurger } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi";
import { Link as ReactLink, useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
import { Moon, SunMoon } from "lucide-react";
import { useThemeContext } from "./global/Context";

const navbar = [
  { title: "Home", to: "home" },
  { title: "About", to: "about" },
  { title: "Services", to: "services" },
  { title: "Why Choose Us", to: "whychooseus" },
  { title: "Contact", to: "footer" },
];

type props = {
  handleLogout(): void;

};


const Navbar = ({ handleLogout}: props) => {

  

  const [menuOpen, setMenuOpen] = useState<boolean>(false);
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
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
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

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleLightDarkMode = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <>
      {location?.pathname !== "/admin" && (
        <div className="relative max-w-7xl mx-auto py-3 px-2">
          <div
            className={`${
              !menuOpen ? "hidden" : "block"
            } fixed inset-0 bg-zinc-900 h-screen py-3 px-2 z-50`}
          >
            <div className="flex flex-row items-center justify-between mb-10 px-3 sm:px-10">
              <div>
                <img
                  src={rciLogo}
                  alt={"rcilogo"}
                  className="w-[10rem] cursor-pointer"
                />
              </div>
              <div
                className="transition-all duration-200 ease-linear block md:hidden hover:bg-zinc-800 text-zinc-400 hover:text-zinc-400 p-4 rounded-full cursor-pointer will-change-transform"
                onClick={() => handleMenuOption()}
              >
                <TfiClose size={40} />
              </div>
            </div>

            <ul className="flex flex-col items-center w-full cursor-pointer uppercase will-change-transform">
              {navbar &&
                navbar.map((item, index) => (
                  <li
                    key={index}
                    className={
                      "transition-all duration-200 ease-linear text-zinc-400 inline-block hover:text-zinc-900 hover:bg-zinc-400 rotate-0 hover:-rotate-2 text-3xl sm:text-6xl p-2 font-extrabold m-2 whitespace-nowrap"
                    }
                    onClick={handleNavClick}
                  >
                    <Link
                      to={item.to}
                      smooth={true}
                      duration={500}
                      onClick={handleNavClick}
                    >
                      {item?.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div className="flex justify-between items-center mb-10 px-3 sm:px-10">
            <div className="hidden md:flex flex-row items-center gap-2 cursor-pointer">
              <div
                className="p-3 border border-zinc-700 rounded-full not-dark:hover:bg-zinc-900 dark:hover:bg-zinc-400 not-dark:text-zinc-900 dark:text-zinc-400 not-dark:hover:text-white dark:hover:text-zinc-900 hover:text-zinc-900 cursor-pointer"
                onClick={() => openInNewTab("https://facebook.com")}
              >
                <FaFacebook size={20} />
              </div>
              <div
                className="p-3 border border-zinc-700 rounded-full not-dark:hover:bg-zinc-900 dark:hover:bg-zinc-400 not-dark:text-zinc-900 dark:text-zinc-400 not-dark:hover:text-white dark:hover:text-zinc-900 hover:text-zinc-900 cursor-pointer"
                onClick={() => openInNewTab("https://instagram.com")}
              >
                <FaInstagram size={15} />
              </div>
              <div
                className="p-3 border border-zinc-700 rounded-full not-dark:hover:bg-zinc-900 dark:hover:bg-zinc-400 not-dark:text-zinc-900 dark:text-zinc-400 not-dark:hover:text-white dark:hover:text-zinc-900 hover:text-zinc-900 cursor-pointer"
                onClick={() => openInNewTab("https://linkedin.com")}
              >
                <FaLinkedin size={15} />
              </div>
            </div>

            <div>
              <ReactLink to={"/"}>
                <img
                  src={rciLogo}
                  alt={"rciLogo"}
                  className="w-[10rem] cursor-pointer"
                />
              </ReactLink>
            </div>
            <div
              className="transition-all duration-200 ease-linear md:hidden hover:bg-zinc-800 text-zinc-400 hover:text-white p-4 rounded-full cursor-pointer"
              onClick={() => handleMenuOption()}
            >
              <CiMenuBurger size={40} />
            </div>
            <div className="flex items-center justify-center gap-3">
              {/* <IoSearchOutline className='cursor-pointer text-zinc-400' size={30} /> */}

              {theme === "light" ? (
                <Moon
                  strokeWidth={1.2}
                  className="not-dark:text-zinc-900 dark:text-zinc-400 cursor-pointer"
                  size={25}
                  onClick={handleLightDarkMode}
                />
              ) : (
                <SunMoon
                  strokeWidth={1.2}
                  className="not-dark:text-zinc-900 dark:text-zinc-400 cursor-pointer"
                  size={25}
                  onClick={handleLightDarkMode}
                />
              )}
            
             

              {token ? (
               <button
               onClick={handleLogout}
                className=" px-10 py-4 rounded-lg bg-black text-white cursor-pointer uppercase text-xs hover:text-white hover:bg-gray-900 ">
                Logout
               </button>
                
              ) : (
                <Link to={"services"} smooth={true} duration={500}>
                  <CustomButton
                    className="w-full md:w-auto px-14 py-5 cursor-pointer uppercase text-xs hover:text-black hover:bg-white border hover:border-black"
                    title={"Order Now"}
                  />
                </Link>
              )}
            </div>
          </div>
          <hr />
          {location?.pathname === "/" && (
            <div className="hidden md:flex items-center justify-center py-5">
              <ul className="flex items-center gap-5 lg:gap-10 text-sm font-medium cursor-pointer uppercase justify-center w-full">
                {navbar &&
                  navbar.map((item, index) => (
                    <li
                      className={`${
                        active === index ? "text-zinc-400" : "text-zinc-500"
                      } hover:text-zinc-400`}
                    >
                      <Link to={item.to} smooth={true} duration={500}>
                        {item?.title}
                      </Link>
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
