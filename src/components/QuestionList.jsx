
function QuestionList({
  questions,
  onUpdateStatus,
  onDeleteQuestion,
  hasActiveFilters,
  selectedCategory,
}) {
  if (questions.length === 0) {
    return (
      <div className="mt-6 rounded-xl border-2 border-dashed border-slate-300 px-4 py-10 text-center">
        <h4 className="font-semibold text-slate-700">
          {hasActiveFilters
            ? "No matching questions found"
            : `No ${selectedCategory} questions yet`}
        </h4>

        <p className="mt-2 text-sm text-slate-500">
          {hasActiveFilters
            ? "Try changing your search or filters."
            : "Add your first question to get started."}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-3">
      {questions.map((question) => (
        <article
          key={question.id}
          className="flex flex-col gap-4 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="min-w-0">
            <h4 className="break-words font-semibold text-slate-800">
              {question.title}
            </h4>

            <p className="mt-1 text-sm text-slate-500">
              {question.category} · {question.difficulty}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              aria-label={`Status for ${question.title}`}
              value={question.status}
              onChange={(e) =>
                onUpdateStatus(question.id, e.target.value)
              }
              className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm sm:flex-none"
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            <button
              type="button"
              onClick={() => onDeleteQuestion(question.id)}
              aria-label={`Delete ${question.title}`}
              className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              Delete
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

export default QuestionList;
