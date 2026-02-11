import { useEffect, useState } from "react";
import api from "../api/axios";
import UserTable from "../components/UserTable";
import UserForm from "../components/UserForm";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/user");
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    };
    fetchUsers();
  }, []);

  const handleAdd = () => {
    setEditingUser(null);
    setModalOpen(true);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await api.delete(`/user/${id}`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Failed to delete user", err);
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  const handleSave = async (data) => {
    try {
      if (editingUser) {
        const res = await api.put(`/user/${editingUser.id}`, data);
        setUsers((prev) =>
          prev.map((u) => (u.id === res.data.id ? res.data : u))
        );
      } else {
        const res = await api.post("/user", data);
        setUsers((prev) => [res.data, ...prev]);
      }
      setModalOpen(false);
    } catch (err) {
      console.error("Failed to save user", err);
      alert(err.response?.data?.message || "Save failed");
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Users</h1>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add User
        </button>
      </div>

      <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />

      {modalOpen && (
        <UserForm
          user={editingUser}
          onSave={handleSave}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
