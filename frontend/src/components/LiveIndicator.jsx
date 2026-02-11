import { useEffect, useState } from "react";
import socket from "../sockets/socket";

export default function LiveIndicator() {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));

    return () => socket.disconnect();
  }, []);

  return (
    <div className="flex items-center gap-2">
      <span
        className={`w-2 h-2 rounded-full ${
          connected ? "bg-green-500 animate-pulse" : "bg-red-500"
        }`}
      />
      <span className="text-sm font-medium">
        {connected ? "Live" : "Offline"}
      </span>
    </div>
  );
}
