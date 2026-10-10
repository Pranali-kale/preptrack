
function CategoryTabs({
  selectedCategory,
  setSelectedCategory,
  resetFilters,
}) {
const categories = ["DSA", "Git", "MERN"];

  return (
    <nav className="mt-6 flex flex-wrap justify-center gap-3 border-b border-slate-200 sm:gap-6">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => {
            setSelectedCategory(category);
            resetFilters();
          }}
          className={`shrink-0 border-b-2 px-4 py-3 font-bold transition ${
            selectedCategory === category
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-slate-500 hover:text-indigo-600"
          }`}
        >
          {category}
        </button>
      ))}
    </nav>
  );
}

export default CategoryTabs;
