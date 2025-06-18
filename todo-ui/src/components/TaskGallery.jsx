export const TaskGallery = ({ task }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 space-y-4">
      <h3 className="text-xl font-bold text-[#374151]">Your Task</h3>
      <div className="text-gray-700">
        <p><strong>Name:</strong> {task.name}</p>
        <p><strong>Due:</strong> {task.date}</p>
        <p><strong>Priority:</strong> {task.priority}</p>
      </div>
    </div>
  );
};