import { useState , useEffect} from "react";
import Orders from "./Orders";
import Users from "./Users";
import Logout from "./Logout";
import { useNavigate } from "react-router-dom";
import Admins from "./Admins";
export default function AdminDashboard() {


  const navigate = useNavigate();

useEffect(() => {
  const token = localStorage.getItem("rci-token");
  const user = localStorage.getItem("rci-user");

  if (!token) {
    navigate("/"); // Redirect if no token
    return;
  }

  if (user) {
    try {
      const parsedUser = JSON.parse(user);
      console.log("Role:", parsedUser.role);

      if (parsedUser.role !== "admin") {
        navigate("/"); // Redirect if not admin
      }
    } catch (e) {
      console.error(" Failed to parse rci-user from localStorage", e);
      navigate("/"); 
    }
  } 
}, [navigate]);



  const [activeTab, setActiveTab] = useState("orders");


  return (
    <div className="flex min-h-screen bg-black text-white">
      <aside className="w-64 bg-[#0f131f] p-4 flex flex-col justify-between">
        <div>
          <h1 className="text-xl mb-8">RCI Admin</h1>
          <nav className="flex flex-col gap-2">
            <button
              className={`text-left px-3 py-2 rounded hover:bg-gray-800 ${
                activeTab === "orders" ? "bg-gray-800" : ""
              }`}
              onClick={() => setActiveTab("orders")}
            >
              Orders
            </button>
            <button
              className={`text-left px-3 py-2 rounded hover:bg-gray-800 ${
                activeTab === "users" ? "bg-gray-800" : ""
              }`}
              onClick={() => setActiveTab("users")}
            >
              Users
            </button>

              <button
              className={`text-left px-3 py-2 rounded hover:bg-gray-800 ${
                activeTab === "admins" ? "bg-gray-800" : ""
              }`}
              onClick={() => setActiveTab("admins")}
            >
              Admins
            </button>
          </nav>
        </div>

       <Logout />
      
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {activeTab === "orders" && <Orders />}
        {activeTab === "users" && <Users />}
        {activeTab === "admins" && <Admins />}
      </main>
    </div>
  );
}
