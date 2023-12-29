// EditTaskModal.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Task } from '../store/types';
import { modifiedTask } from '../store/reducers/TaskREducer';

interface EditTaskModalProps {
  taskId: any;
  currentTask: any;
  onClose: () => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ taskId, currentTask, onClose }) => {
  const dispatch = useDispatch();
  const [updatedTitle, setUpdatedTitle] = useState(currentTask.title);
  const [updatedDescription, setUpdatedDescription] = useState(currentTask.description);

  const handleSave = async () => {
    const updatedTask: any = {
      ...currentTask,
      title: updatedTitle,
      description: updatedDescription,
    };

    await dispatch(modifiedTask(updatedTask));
    onClose();
  };

  return (
    <div className='overlay'>
      <h3>Edit Task</h3>
      <form className='card-container'>
        <label>Title:</label>
        <input type="text" className='login__input'
          value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)} />

        <label>Description:</label>
        <input
          type="text"
          className='login__input'
          value={updatedDescription}
          onChange={(e) => setUpdatedDescription(e.target.value)}
        />
        <div className='butn'>
          <button type="button" className="button" onClick={handleSave}>
            Save
          </button>
          <button type="button" className='button' onClick={onClose}>
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
};

export default EditTaskModal;
