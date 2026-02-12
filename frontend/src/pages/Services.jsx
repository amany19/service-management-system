import { useEffect, useState } from "react";
import socket from "../sockets/socket";
import api from "../api/axios";
import DataTable from "../components/DataTable";
import ServiceForm from "../components/ServiceForm";

export default function Services() {
    const [services, setServices] = useState([]);
    const [editingService, setEditingService] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    // Fetch all services on mount
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await api.get("/service");
                setServices(res.data);
            } catch (err) {
                console.error("Failed to fetch services", err);
            }
        };

        fetchServices();

        // Optional: listen for real-time service changes (if backend emits events)
        socket.on("service_created", (service) => {
            setServices((prev) => [service, ...prev]);
        });

        socket.on("service_updated", (service) => {
            setServices((prev) =>
                prev.map((s) => (s.id === service.id ? service : s))
            );
        });

        socket.on("service_deleted", (id) => {
            setServices((prev) => prev.filter((s) => s.id !== id));
        });

        return () => {
            socket.off("service_created");
            socket.off("service_updated");
            socket.off("service_deleted");
        };
    }, []);

    // Open modal for creating new service
    const handleAdd = () => {
        setEditingService(null);
        setModalOpen(true);
    };

    // Open modal for editing existing service
    const handleEdit = (service) => {
        setEditingService(service);
        setModalOpen(true);
    };

    // Delete service
    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this service?")) return;
        try {
            await api.delete(`/service/${id}`);
            setServices((prev) => prev.filter((s) => s.id !== id));
        } catch (err) {
            console.error("Failed to delete service", err);
        }
    };


    const handleSave = async (data) => {
        try {

            const payload = { ...data, price: parseFloat(data.price) };

            if (editingService) {

                const res = await api.patch(`/service/${editingService.id}`, payload);
                setServices((prev) =>
                    prev.map((s) => (s.id === res.data.id ? res.data : s))
                );
            } else {
                // Create
                const res = await api.post("/service", payload);
                setServices((prev) => [res.data, ...prev]);
            }
            setModalOpen(false);
        } catch (err) {
            console.error("Failed to save service", err);
        }
    };
    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-semibold">Services</h1>
                <button
                    onClick={handleAdd}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add Service
                </button>
            </div>

            <DataTable
                data={services}
                onEdit={handleEdit}
                onDelete={handleDelete}
                columns={[
                    { key: "id", label: "ID", className: "text-slate-500 font-mono text-xs" },
                    { key: "name", label: "Name", className: "font-semibold text-slate-900" },
                    {
                        key: "price",
                        label: "Price",
                        render: (s) => (
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-bold">
                                ${s.price}
                            </span>
                        ),
                    },
                    {
                        key: "category",
                        label: "Category",
                        render: (s) => (
                            <span className="text-slate-600 bg-slate-100 px-2 py-1 rounded text-xs font-medium uppercase">
                                {s.category}
                            </span>
                        ),
                    },
                ]}
            />


            {modalOpen && (
                <ServiceForm
                    service={editingService}
                    onSave={handleSave}
                    onClose={() => setModalOpen(false)}
                />
            )}
        </div>
    );
}
