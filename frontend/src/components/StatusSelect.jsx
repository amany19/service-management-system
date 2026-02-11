export default function StatusSelect({ value, onChange }) {
  return (
    <div className="relative w-full min-w-[120px]">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          appearance-none w-full
          bg-white border border-slate-300 rounded-lg 
          px-3 py-2 pr-8
          text-sm md:text-base
          focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
          cursor-pointer transition-all
        "
      >
        <option value="PENDING">Pending</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="COMPLETED">Completed</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}