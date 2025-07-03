import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("rci-user");
    localStorage.removeItem("rci-token");
    navigate("/");
  };

  return (
    <button
      className="mt-4 px-3 py-2 rounded hover:bg-red-600 bg-red-500 text-white"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default Logout;
