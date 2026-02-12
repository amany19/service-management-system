import { useEffect, useState } from "react";
import api from "../api/axios";
import DataTable from "../components/DataTable";
import UserForm from "../components/UserForm";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        console.log("blablalba", users);
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
                console.log("data: ", data)

                const res = await api.post("/user", data);
                console.log("res: ", res)

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

            <DataTable
                data={users}
                onEdit={handleEdit}
                onDelete={handleDelete}
                columns={[
                    {
                        key: "name",
                        label: "User",
                        render: (u) => (
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0 border border-blue-200 uppercase">
                                    {u.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")
                                        .toUpperCase()}
                                </div>
                                <div className="min-w-0">
                                    <p className="font-semibold text-slate-900 leading-none truncate">
                                        {u.name}
                                    </p>
                                    <p className="text-xs text-slate-500 mt-1 truncate">{u.email}</p>
                                </div>
                            </div>
                        ),
                    },
                    {
                        key: "role",
                        label: "Role",
                        render: (u) => (
                            <span
                                className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase border ${u.role === "admin"
                                        ? "bg-purple-50 text-purple-700 border-purple-200"
                                        : "bg-slate-50 text-slate-700 border-slate-200"
                                    }`}
                            >
                                {u.role}
                            </span>
                        ),
                    },
                ]}
            />

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
