// EditTaskModal.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Category } from '../store/types';
import { fetchTaskes, modifiedTask } from '../store/reducers/taskReducer';
import { fetchCategory } from '../store/reducers/categoryReducer';

interface EditTaskModalProps {
  listId: any;
  currentList: any;
  onClose: () => void;
}

const EditListModal: React.FC<EditTaskModalProps> = ({listId, currentList, onClose }) => {

      // Hookes used in component
  const dispatch = useDispatch();
  const [name, setName] = useState(currentList);

  const handleSave = async () => {
    const updatedList: Category = {
      CategoryName:currentList,
      id:listId
    };
    await dispatch(modifiedTask(updatedList));
    dispatch(fetchCategory())
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
          value={name}
          onChange={(e) => setName(e.target.value)}
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

export default EditListModal;
