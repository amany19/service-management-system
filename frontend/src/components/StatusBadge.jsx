export default function StatusBadge({ status }) {
  const styles = {
    PENDING: "bg-yellow-100 text-yellow-700 border-yellow-200",
    IN_PROGRESS: "bg-blue-100 text-blue-700 border-blue-200",
    COMPLETED: "bg-green-100 text-green-700 border-green-200",
  };

  return (
    <span className={`
      inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border
      md:text-sm md:px-3 md:py-1
      whitespace-nowrap
      ${styles[status] || "bg-slate-100 text-slate-700"}
    `}>
      {status.replace("_", " ")}
    </span>
  );
}