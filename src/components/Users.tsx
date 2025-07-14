import  { useEffect, useState } from "react";
import axios from "axios";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await axios.get("https://api.replicacopyindustries.com/api/users/all");
        if (response.status === 200 && response.data?.data) {
          const userData = response.data.data.map((item: any) => ({
            id: item._id,
            name: item.username,
            email: item.email,
            password: item.password,
            role: item.role,
          }));
          setUsers(userData);
        } else {
          setError("No users found");
        }
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    getAllUsers();
  }, []);

  const handleDelete = (id: string) => {
    setUserIdToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!userIdToDelete) return;

    try {
      await axios.delete(`https://api.replicacopyindustries.com/api/users/${userIdToDelete}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("rci-token")}`,
        },
      });

      setUsers(prev => prev.filter(user => user.id !== userIdToDelete));
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

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Users</h2>

      {loading ? (
        <div className="text-center text-gray-400">Loading users...</div>
      ) : error ? (
        <div className="text-center text-red-400">{error}</div>
      ) : users.length === 0 ? (
        <div className="text-center text-gray-400">No users available.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-600 rounded-lg">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold border-b border-gray-600 text-white">
                  S:No
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold border-b border-gray-600 text-white">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold border-b border-gray-600 text-white">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold border-b border-gray-600 text-white">
                  Password
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold border-b border-gray-600 text-white">
                  Role
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold border-b border-gray-600 text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id} className="hover:bg-white/10">
                  <td className="px-6 py-4 text-sm text-white border-b border-gray-700">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-sm text-white border-b border-gray-700">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-white border-b border-gray-700">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-white border-b border-gray-700">
                    {user.password}
                  </td>
                  <td className="px-6 py-4 text-sm text-white border-b border-gray-700">
                    {user.role}
                  </td>
                  <td className="px-6 py-4 text-center border-b border-gray-700">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-500/20"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
