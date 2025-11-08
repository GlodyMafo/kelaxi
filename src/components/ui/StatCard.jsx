export default function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white px-4 py-3 rounded-2xl shadow flex justify-between items-center gap-3 ">
      <div className="text-sm text-gray-500 flex flex-col items-start gap-2">
        {title}
        <div className="text-sm font-bold text-[#1A2F6B]">{value}</div>
      </div>

      {icon && (
        <span className="text-white p-4 bg-[#1A2F6B] rounded-full">
          {icon}
        </span>
      )}
    </div>
  );
}
