
function Sidebar({ menuOpen, setMenuOpen }) {
  function goToSection(id) {
    setMenuOpen(false);

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  }

  return (
    <>
      {/* Mobile Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between bg-slate-900 p-4 text-white md:hidden">
        <h1 className="text-xl font-bold">PrepTrack</h1>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          className="rounded-lg p-2 hover:bg-slate-800"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </header>

      {/* Sidebar */}
      <aside
        className={`${
          menuOpen ? "block" : "hidden"
        } fixed inset-x-0 top-[60px] z-20 bg-slate-900 p-5 text-white md:sticky md:top-0 md:block md:h-screen md:w-64 md:shrink-0`}
      >
        <h1 className="hidden text-2xl font-bold md:block">
          PrepTrack
        </h1>

        

        <nav className="mt-6 flex flex-col gap-2">
          <button
            onClick={() => goToSection("dashboard")}
            className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-left hover:bg-indigo-700"
          >
            Dashboard
          </button>

          <button
            onClick={() => goToSection("questions")}
            className="w-full rounded-lg px-4 py-3 text-left hover:bg-slate-800"
          >
            My Questions
          </button>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
