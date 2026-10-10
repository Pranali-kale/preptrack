
import FormSelect from "./FormSelect";

function QuestionForm({
  form,
  handleChange,
  handleSubmit,
  error,
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 grid grid-cols-1 gap-4 rounded-xl border border-slate-200 p-4 sm:grid-cols-2"
    >
      <div className="sm:col-span-2">
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Question name
        </label>

        <input
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="e.g. Two Sum"
          required
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      <FormSelect
        label="Category"
        name="category"
        value={form.category}
        onChange={handleChange}
       options={["DSA", "Git", "MERN"]}
      />

      <FormSelect
        label="Difficulty"
        name="difficulty"
        value={form.difficulty}
        onChange={handleChange}
        options={["Easy", "Medium", "Hard"]}
      />

      <div className="sm:col-span-2">
        <FormSelect
          label="Status"
          name="status"
          value={form.status}
          onChange={handleChange}
          options={[
            "Not Started",
            "In Progress",
            "Completed",
          ]}
        />
      </div>

      {error && (
        <p
          role="alert"
          className="text-sm text-red-600 sm:col-span-2"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        className="rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white hover:bg-indigo-700 sm:col-span-2"
      >
        Save Question
      </button>
    </form>
  );
}

export default QuestionForm;
