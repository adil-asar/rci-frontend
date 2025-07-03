import React, { useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

export default function Admins() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const getAllAdmins = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/all-admins`);

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
          setError("No Admins found");
        }
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    getAllAdmins();
  }, []);

  const handleDelete = (id: string) => {
    // Placeholder for delete logic
    console.log("Delete admin with ID:", id);
  };

  const handleEdit = (id: string) => {
    // Placeholder for edit logic
    console.log("Edit admin with ID:", id);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Admins</h2>

      {loading ? (
        <div className="text-center text-gray-400">Loading admins...</div>
      ) : error ? (
        <div className="text-center text-red-400">{error}</div>
      ) : users.length === 0 ? (
        <div className="text-center text-gray-400">No admins available.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-600 rounded-lg">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider border-b border-gray-600 text-white">
                  S:No
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider border-b border-gray-600 text-white">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider border-b border-gray-600 text-white">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider border-b border-gray-600 text-white">
                  Password
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider border-b border-gray-600 text-white">
                  Role
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold uppercase tracking-wider border-b border-gray-600 text-white">
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
                      className="rounded  bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-500/20"
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
    </div>
  );
}
