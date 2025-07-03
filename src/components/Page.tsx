// components/Dashboard.tsx

import { useState } from "react";
import Orders from "./Orders";
import Users from "./Users";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("orders");

  return (
    <div className="flex min-h-screen bg-black text-white">
      <aside className="w-64 bg-[#0f131f] p-4">
        <h1 className="text-xl mb-8"> RCI Admin</h1>
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
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {activeTab === "orders" && (
          <div>
           <Orders />
          </div>
        )}

        {activeTab === "users" && (
          <div>
          <Users />
          </div>
        )}
      </main>
    </div>
  );
}
