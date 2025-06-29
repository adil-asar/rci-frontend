import { AppSidebar } from "@/components/app-sidebar";
import { DataTable } from "@/components/data-table";
import { SiteHeader } from "@/components/site-header";
import axios from "axios";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

interface Order {
  id: number;
  header: string;
  name: string;
  orderstatus: string;
  phone: string;
  email: string;
  address: string;
}

const Page = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/all`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("rci-token")}`,
            },
          }
        );

        console.log("API Response:", response.data.data);
        if (response.status === 200 && response.data?.data) {
          const ordersData = response.data.data.map((item) => ({
            id: item?._id,
            name: item?.username,
            email: item?.email,
          }));

          setOrders(ordersData);
        } else {
          setError("No current orders");
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    getAllOrders();
  }, []);

  // Authorization check useEffect
  useEffect(() => {
    const token = localStorage.getItem("rci-token");
    const user = localStorage.getItem("rci-user");

    if (!token || !user) {
   navigate("/");
      return;
    }

    try {
      const parsedUser = JSON.parse(user);
      if (parsedUser?.rrole !== "admin") {
        navigate("/");
      }
    } catch (e) {
      console.error("Invalid user data in localStorage");
      navigate("/");
    }
  }, [navigate]);

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {loading ? (
                <div>Loading orders...</div>
              ) : error ? (
                <div className="text-red-500">{error}</div>
              ) : (
                <DataTable data={orders} />
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Page;
