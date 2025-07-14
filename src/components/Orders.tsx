import  { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaEye } from "react-icons/fa";
import DeleteConfirmationModal from "./DeleteConfirmationModal";


export interface Order {
  _id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  city: string;
  state: string;
  address: string;
  message?: string;
  deliveryAddress?: string;
  deliveryCity?: string;
  deliveryState?: string;
  documents: string[];
  createdAt: string;
  userInfo?: {
    _id: string;
    username: string;
    email: string;
  } | null;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [viewOrder, setViewOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);

  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const response = await axios.get("http://147.93.86.63:5000/api/orders/all", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("rci-token")}`,
          },
        });

        if (response.status === 200 && response.data?.orders) {
          setOrders(response.data.orders);
        } else {
          setError("No orders found");
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

 const handleDelete = (id: string) => {
    setUserIdToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!userIdToDelete) return;

    try {
      await axios.delete(`http://147.93.86.63:5000/api/orders/${userIdToDelete}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("rci-token")}`,
        },
      });

      setOrders((prev) => prev.filter((order) => order._id !== userIdToDelete));
    } catch (error) {
      console.error("Failed to delete user:", error);
    } finally {
      setIsDeleteModalOpen(false);
      setUserIdToDelete(null);
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setUserIdToDelete(null);
  };


  const handleView = (order: Order) => {
    setViewOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setViewOrder(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 text-white">Orders</h2>

      {loading ? (
        <div className="text-center text-gray-400">Loading orders...</div>
      ) : error ? (
        <div className="text-center text-red-400">{error}</div>
      ) : orders.length === 0 ? (
        <div className="text-center text-gray-400">No orders available.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-800 rounded-lg">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold border-b border-gray-800 text-white">S:No</th>
                <th className="px-6 py-3 text-left text-sm font-semibold border-b border-gray-800 text-white">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold border-b border-gray-800 text-white">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold border-b border-gray-800 text-white">Phone</th>
                <th className="px-6 py-3 text-left text-sm font-semibold border-b border-gray-800 text-white">Service</th>

                <th className="px-6 py-3 text-center text-sm font-semibold border-b border-gray-800 text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id} className="hover:bg-white/10">
                  <td className="px-6 py-4 text-sm text-white border-b border-gray-700">{index + 1}</td>
                  <td className="px-6 py-4 text-sm text-white border-b border-gray-700">{order.name}</td>
                  <td className="px-6 py-4 text-sm text-white border-b border-gray-700">{order.email}</td>
                  <td className="px-6 py-4 text-sm text-white border-b border-gray-700">{order.phone}</td>
                  <td className="px-6 py-4 text-sm text-white border-b border-gray-700">{order.service}</td>

                  <td className="px-6 py-4 flex gap-3 justify-center text-center border-b border-gray-700 space-x-2">
                    <button onClick={() => handleView(order)} className="text-green-400 hover:text-green-300">
                      <FaEye className="text-2xl" />
                    </button>
                  
                    <button onClick={() => handleDelete(order._id)} className="text-red-400 hover:text-red-300">
                      <FaTrash className="text-lg" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      
     {/* Tailwind Modal */}
{isModalOpen && viewOrder && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
    <div className="bg-white w-full max-w-md mx-auto rounded-lg p-6 relative shadow-lg">
      <button
        onClick={closeModal}
        className="absolute top-2 right-3 text-gray-600 hover:text-gray-800 text-2xl"
      >
        &times;
      </button>
      <h3 className="text-lg font-semibold mb-4">Order Details</h3>
      <div className="space-y-2 text-sm text-gray-700">
        <p><strong>Name:</strong> {viewOrder.name}</p>
        <p><strong>Email:</strong> {viewOrder.email}</p>
        <p><strong>Phone:</strong> {viewOrder.phone}</p>
        
          <p><strong> Your Address:</strong> {viewOrder.address}</p>
        <p><strong> Your City:</strong> {viewOrder.city}</p>
        <p><strong> Your State:</strong> {viewOrder.state}</p>
      <p><strong>Selected Service:</strong> {viewOrder.service}</p>
         <p><strong> Delivery Address:</strong> {viewOrder.deliveryAddress || "N/A"}</p>
       <p><strong> Delivery City:</strong> {viewOrder.deliveryCity || "N/A"}</p>
        <p><strong> Delivery State:</strong> {viewOrder.deliveryState || "N/A"}</p>


        <p><strong>Message:</strong> {viewOrder.message || "N/A"}</p>
        <p><strong>Created At:</strong> {new Date(viewOrder.createdAt).toLocaleString()}</p>
        <p><strong>User:</strong> {viewOrder.userInfo?.username || "N/A"}</p>

        {/* ✅ Document View/Download Section */}
        <p><strong>Documents:</strong></p>
        {viewOrder.documents.length === 0 ? (
          <p className="text-sm text-gray-600">No documents uploaded.</p>
        ) : (
          <ul className="list-disc pl-5 space-y-1 text-sm text-blue-700">
            {viewOrder.documents.map((docUrl, index) => (
              <li key={index}>
                <span className="font-medium">File {index + 1}:</span>{" "}
                <a
                  href={docUrl}
                  target="_blank"
                   download
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline mr-3"
                >
                  View
                </a>
                <a
                  href={docUrl}
                  download
                  className="text-green-600 hover:underline"
                >
                  Download
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  </div>
)}

  <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        itemName="this user"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

    </div>
  );
}
