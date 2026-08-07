function ReportTimeline({ history }) {
  if (!history || history.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">📜 Rescue Timeline</h2>
        <p>No updates yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6">
        📜 Rescue Timeline
      </h2>

      {history.map((item, index) => (
        <div
          key={index}
          className="border-l-4 border-red-500 pl-5 pb-6 relative"
        >
          <div className="absolute -left-2 top-1 w-4 h-4 bg-red-500 rounded-full"></div>

          <h3 className="font-bold text-lg">
            {item.status}
          </h3>

          <p className="text-gray-600">
            {item.note}
          </p>

          <p className="text-sm text-gray-500">
            Updated by: {item.updatedBy?.name}
          </p>

          <p className="text-xs text-gray-400">
            {new Date(item.timestamp).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ReportTimeline;