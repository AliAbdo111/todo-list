// EditTaskModal.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Task } from '../store/types';
import { fetchTaskes, modifiedTask } from '../store/reducers/taskReducer';
import { RootState } from '../store/store';

interface EditTaskModalProps {
  taskId: any;
  currentTask: any;
  onClose: () => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ taskId, currentTask, onClose }) => {
  
    // Hookes used in component
  const dispatch = useDispatch();
  const [updatedTitle, setUpdatedTitle] = useState(currentTask.title);
  const [updatedDescription, setUpdatedDescription] = useState(currentTask.description);
  const user_id =useSelector((state:RootState)=>state.aouthKey.id)

  const handleSave = async () => {
        const updatedTask: Task = {
          ...currentTask,
          id:taskId,
          title: updatedTitle,
          description: updatedDescription,
        };
    await dispatch(modifiedTask(updatedTask));
    await dispatch(fetchTaskes(user_id));
    onClose();
  };

  return (
    <div className='overlay'>
      <h3>Edit Task</h3>
      <form className='card-container'>
        <label>Title:</label>
        <input 
          type="text"
          className='login__input red'
          value={updatedTitle} 
          onChange={(e) => setUpdatedTitle(e.target.value)} />
          
        <label>Date:</label>
        <input
          type="date"
          className='login__input red'
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
