import StatusBadge from "./StatusBadge";
import StatusSelect from "./StatusSelect";

export default function RequestsTable({ requests, onStatusChange }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="border-b text-slate-500 uppercase text-xs">
          <tr>
            <th className="p-3 font-medium">ID</th>
            <th className="p-3 font-medium">Service</th>
            <th className="p-3 font-medium">User</th>
            <th className="p-3 font-medium">Status</th>
            <th className="p-3 font-medium">Update</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r) => (
            <tr key={r.id} className="border-b hover:bg-slate-50 transition-colors">
              <td className="p-3">{r.id}</td>
              <td className="p-3 font-medium">{r.service?.name}</td>
              <td className="p-3">{r.user?.name}</td>
              <td className="p-3">
                <StatusBadge status={r.status} />
              </td>
              <td className="p-3">
                <StatusSelect
                  value={r.status}
                  onChange={(status) => onStatusChange(r.id, status)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
