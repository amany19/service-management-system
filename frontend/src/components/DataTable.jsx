export default function DataTable({
  columns,    
  data,       
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider ${
                  col.alignRight ? "text-right" : ""
                }`}
              >
                {col.label}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-blue-50/50 transition-colors group">
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={`px-6 py-4 ${col.className || ""} ${
                    col.alignRight ? "text-right" : ""
                  }`}
                >
                  {col.render ? col.render(item) : item[col.key]}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(item)}
                        className="px-3 py-1 text-white bg-amber-600 hover:bg-amber-500 rounded-lg transition-colors font-medium"
                      >
                        Edit
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(item.id)}
                        className="px-3 py-1 text-white bg-red-600 hover:bg-red-500 rounded-lg transition-colors font-medium"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
