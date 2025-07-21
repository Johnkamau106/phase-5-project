import React, { useEffect, useState } from 'react';

const API_URL = 'http://localhost:5000/tasks'; // or your backend URL

const TasksSection = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description: newTask }),
    })
      .then(res => res.json())
      .then(added => {
        setTasks([...tasks, added]);
        setNewTask('');
      });
  };

  const handleDelete = (id) => {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then(() => setTasks(tasks.filter(t => t.id !== id)));
  };

  const handleEdit = (task) => {
    setEditingId(task.id);
    setEditText(task.description);
  };

  const handleUpdate = (id) => {
    fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description: editText }),
    })
      .then(res => res.json())
      .then(updated => {
        setTasks(tasks.map(t => (t.id === id ? updated : t)));
        setEditingId(null);
        setEditText('');
      });
  };

  return (
    <div className="tasks-section">
      <h3>📝 Caregiver Tasks</h3>

      <div className="task-input">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>➕ Add</button>
      </div>

      <div className="task-list">
        {tasks.map(task => (
          <div className="task-card" key={task.id}>
            {editingId === task.id ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <div className="task-actions">
                  <button onClick={() => handleUpdate(task.id)}>💾 Save</button>
                  <button onClick={() => setEditingId(null)}>✖ Cancel</button>
                </div>
              </>
            ) : (
              <>
                <p>{task.description}</p>
                <div className="task-actions">
                  <button onClick={() => handleEdit(task)}>✏ Edit</button>
                  <button onClick={() => handleDelete(task.id)}>🗑 Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksSection;
