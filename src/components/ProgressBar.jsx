
function ProgressBar({ progress, label = "Completion Progress" }) {
  return (
    <div className="mt-6">
      <div className="flex justify-between gap-3">
        <span className="font-medium text-slate-700">
          {label}
        </span>

        <span className="font-bold text-indigo-600">
          {progress}%
        </span>
      </div>

      <div
        className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100"
        role="progressbar"
        aria-label={label}
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full bg-indigo-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
