// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import socket from "../sockets/socket";
import RequestsTable from "../components/RequestsTable";
import api from "../api/axios";

export default function Dashboard() {
  const [requests, setRequests] = useState([]);

  // 🟢 Fetch all existing requests on mount
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await api.get("/request"); // your GET all requests endpoint
        setRequests(res.data);
      } catch (err) {
        console.error("Failed to fetch requests", err);
      }
    };

    fetchRequests();

    // 🔴 Socket listeners for real-time updates
    socket.on("new_request", (request) => {
      setRequests((prev) => [request, ...prev]);
    });

    socket.on("update_request", (updated) => {
      setRequests((prev) =>
        prev.map((r) => (r.id === updated.id ? updated : r))
      );
    });

    return () => {
      socket.off("new_request");
      socket.off("update_request");
    };
  }, []);

  // 🟡 Handle status changes (optimistic UI + backend update)
  const handleStatusChange = async (id, status) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );

    try {
      await api.patch("/request/status", { id, status }); // matches your backend
    } catch (err) {
      console.error("Status update failed", err);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-4">
      {requests.length === 0 ? (
        <p className="text-sm text-slate-500">
          Waiting for incoming requests…
        </p>
      ) : (
        <RequestsTable
          requests={requests}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}
