
function StatCard({ title, value }) {
  return (
    <div className="min-w-0 rounded-xl bg-white p-4 shadow-sm sm:rounded-2xl sm:p-6">
      <p className="break-words text-sm text-slate-500">
        {title}
      </p>

      <h3 className="mt-2 text-2xl font-bold text-slate-800 sm:text-3xl">
        {value}
      </h3>
    </div>
  );
}

export default StatCard;
