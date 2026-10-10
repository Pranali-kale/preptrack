import { useEffect, useState } from "react";

import Sidebar from "./components/Sidebar";
import StatCard from "./components/StatCard";
import ProgressBar from "./components/ProgressBar";
import QuestionForm from "./components/QuestionForm";
import CategoryTabs from "./components/CategoryTabs";
import QuestionFilters from "./components/QuestionFilters";
import QuestionList from "./components/QuestionList";

const initialForm = {
  title: "",
  category: "DSA",
  difficulty: "Easy",
  status: "Not Started",
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("DSA");

  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  // Load questions from LocalStorage
  const [questions, setQuestions] = useState(() => {
    try {
      const savedQuestions = localStorage.getItem(
        "prepTrackQuestions"
      );

      const parsedQuestions = savedQuestions
        ? JSON.parse(savedQuestions)
        : [];

      // Convert old Pending status to Not Started
      return parsedQuestions.map((question) => ({
        ...question,
        status:
          question.status === "Pending"
            ? "Not Started"
            : question.status,
      }));
    } catch {
      return [];
    }
  });

  // Save questions when they change
  useEffect(() => {
    try {
      localStorage.setItem(
        "prepTrackQuestions",
        JSON.stringify(questions)
      );
    } catch (error) {
      console.error("Unable to save questions:", error);
    }
  }, [questions]);

  //  statistics
  const completed = questions.filter(
    (question) => question.status === "Completed"
  ).length;

  const notStarted = questions.filter(
    (question) => question.status === "Not Started"
  ).length;

  const inProgress = questions.filter(
    (question) => question.status === "In Progress"
  ).length;

  //  progress
  const overallProgress = questions.length
    ? Math.round((completed / questions.length) * 100)
    : 0;

  // Questions belonging to selected category
  const filteredQuestions = questions.filter(
    (question) => question.category === selectedCategory
  );

  // Category statistics
  const totalQuestions = filteredQuestions.length;

  const completedQuestions = filteredQuestions.filter(
    (question) => question.status === "Completed"
  ).length;

  const notStartedQuestions = filteredQuestions.filter(
    (question) => question.status === "Not Started"
  ).length;

  const inProgressQuestions = filteredQuestions.filter(
    (question) => question.status === "In Progress"
  ).length;

  // Category progress
  const progress = totalQuestions
    ? Math.round((completedQuestions / totalQuestions) * 100)
    : 0;

  // Search and filter questions
  const visibleQuestions = filteredQuestions.filter((question) => {
    const matchesSearch = question.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesDifficulty =
      difficultyFilter === "All" ||
      question.difficulty === difficultyFilter;

    const matchesStatus =
      statusFilter === "All" ||
      question.status === statusFilter;

    return (
      matchesSearch &&
      matchesDifficulty &&
      matchesStatus
    );
  });

  const hasActiveFilters =
    searchTerm.trim() !== "" ||
    difficultyFilter !== "All" ||
    statusFilter !== "All";

  // Reset filters when category changes
  function resetFilters() {
    setSearchTerm("");
    setDifficultyFilter("All");
    setStatusFilter("All");
  }

  // Handle form inputs
  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));

    setError("");
  }

  // Add a new question
  function handleSubmit(event) {
    event.preventDefault();

    if (!form.title.trim()) {
      setError("Please enter a question name.");
      return;
    }

    const newQuestion = {
      ...form,
      id: crypto.randomUUID(),
      title: form.title.trim(),
    };

    setQuestions((previousQuestions) => [
      ...previousQuestions,
      newQuestion,
    ]);

    setForm({
      ...initialForm,
      category: selectedCategory,
    });

    setError("");
    setShowForm(false);
    resetFilters();
  }

  // Update question status
  function updateStatus(id, status) {
    setQuestions((previousQuestions) =>
      previousQuestions.map((question) =>
        question.id === id
          ? { ...question, status }
          : question
      )
    );
  }

  // Delete a question
  function deleteQuestion(id) {
    setQuestions((previousQuestions) =>
      previousQuestions.filter(
        (question) => question.id !== id
      )
    );
  }

  // Open form with currently selected category
  function toggleForm() {
    if (showForm) {
      setShowForm(false);
      setError("");
      return;
    }

    setForm({
      ...initialForm,
      category: selectedCategory,
    });

    setError("");
    setShowForm(true);
  }

  return (
    <div className="min-h-screen bg-slate-100 md:flex">
      <Sidebar
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      <main className="min-w-0 flex-1 p-4 sm:p-6 md:p-8">
        {/* Dashboard Header */}
        <header id="dashboard" className="mb-6 sm:mb-8">
          <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">
            Interview Preparation
          </h2>

         
        </header>

        {/* Overall Statistics */}
        <section className="grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-4">
          <StatCard
            title="Total Questions"
            value={questions.length}
          />

          <StatCard
            title="Completed"
            value={completed}
          />

          <StatCard
            title="Not Started"
            value={notStarted}
          />

          <StatCard
            title="In Progress"
            value={inProgress}
          />
        </section>

        {/* Overall Progress */}
        <section className="mt-6 rounded-2xl bg-white p-5 shadow-sm">
          <ProgressBar
            progress={overallProgress}
            label="Overall Progress"
          />
        </section>

        {/* Questions Section */}
        <section
          id="questions"
          className="mt-6 rounded-2xl bg-white p-4 shadow-sm sm:p-6"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-800">
                My Questions
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Add and manage your preparation questions.
              </p>
            </div>

            <button
              type="button"
              onClick={toggleForm}
              className="w-full rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white hover:bg-indigo-700 sm:w-auto"
            >
              {showForm ? "Cancel" : "+ Add Question"}
            </button>
          </div>

          {/* Add Question Form */}
          {showForm && (
            <QuestionForm
              form={form}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              error={error}
            />
          )}

          {/* Category Tabs */}
          <CategoryTabs
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            resetFilters={resetFilters}
          />

          {/* Category Statistics */}
          <section className="mt-6 rounded-2xl bg-slate-50 p-4 sm:p-5">
            <h3 className="text-xl font-bold text-slate-800">
              {selectedCategory} Progress
            </h3>

            <div className="mt-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
              <StatCard
                title="Total Questions"
                value={totalQuestions}
              />

              <StatCard
                title="Completed"
                value={completedQuestions}
              />

              <StatCard
                title="Not Started"
                value={notStartedQuestions}
              />

              <StatCard
                title="In Progress"
                value={inProgressQuestions}
              />
            </div>

            <ProgressBar
              progress={progress}
              label="Category Completion"
            />
          </section>

          {/* Search and Filters */}
          <QuestionFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            difficultyFilter={difficultyFilter}
            setDifficultyFilter={setDifficultyFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />

          {/* Question List */}
          <QuestionList
            questions={visibleQuestions}
            onUpdateStatus={updateStatus}
            onDeleteQuestion={deleteQuestion}
            hasActiveFilters={hasActiveFilters}
            selectedCategory={selectedCategory}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
