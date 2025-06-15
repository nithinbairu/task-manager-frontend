// src/components/TaskModal.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For AI description generation
import '../styles/TaskModal.css'; // New CSS file

const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

const TaskModal = ({ isOpen, onClose, onSave, task, token }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('pending');
    const [generatingDescription, setGeneratingDescription] = useState(false);
    const [generatedDescription, setGeneratedDescription] = useState('');

    useEffect(() => {
        if (task) {
            // Populate form for editing
            setName(task.name || task.summary || '');
            setDescription(task.description || '');
            setCategory(task.category || '');
            setDueDate(task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '');
            setStatus(task.status || 'pending');
        } else {
            // Reset form for adding
            setName('');
            setDescription('');
            setCategory('');
            setDueDate('');
            setStatus('pending');
        }
        setGeneratedDescription(''); // Clear generated description on modal open
    }, [task, isOpen]); // Reset when modal opens or task changes

    const handleGenerateDescription = async () => {
        if (!name.trim()) {
            alert("Please enter a Task Name to generate a description.");
            return;
        }
        setGeneratingDescription(true);
        setGeneratedDescription('');
        try {
            const res = await axios.post(
                `${backendUrl}/api/ai/generate-description`,
                { summary: name },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setGeneratedDescription(res.data.description);
            setDescription(res.data.description); // Optionally auto-fill description
        } catch (err) {
            console.error('AI description generation failed:', err);
            alert('Failed to generate description. Please try again.');
        } finally {
            setGeneratingDescription(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) {
            alert("Task Name is required.");
            return;
        }

        onSave({
            name: name.trim(),
            description: description.trim(),
            category: category.trim(),
            dueDate: dueDate ? new Date(dueDate) : null,
            status: status,
        });
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{task ? 'Edit Task' : 'Add New Task'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Task Name:</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        <button type="button" onClick={handleGenerateDescription} disabled={generatingDescription} className="generate-description-btn">
                            {generatingDescription ? 'Generating...' : 'Generate AI Description'}
                        </button>
                        {generatedDescription && <p className="generated-desc-preview">{generatedDescription}</p>}
                    </div>
                    <div className="form-group">
                        <label>Category:</label>
                        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Due Date:</label>
                        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Status:</label>
                        <select value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    <div className="modal-actions">
                        <button type="submit" className="btn-primary">Save Task</button>
                        <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskModal;