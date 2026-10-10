
function QuestionFilters({
  searchTerm,
  setSearchTerm,
  difficultyFilter,
  setDifficultyFilter,
  statusFilter,
  setStatusFilter,
}) {
  return (
    <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
      <input
        type="text"
        placeholder="Search questions..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Search questions"
        className="w-full rounded-lg border border-slate-400 bg-white px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
      />

      <select
        value={difficultyFilter}
        onChange={(e) => setDifficultyFilter(e.target.value)}
        aria-label="Filter by difficulty"
        className="w-full rounded-lg border border-slate-400 bg-white px-4 py-3"
      >
        <option value="All">All Difficulties</option>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        aria-label="Filter by status"
        className="w-full rounded-lg border border-slate-400 bg-white px-4 py-3"
      >
        <option value="All">All Statuses</option>
        <option value="Not Started">Not Started</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
}

export default QuestionFilters;
