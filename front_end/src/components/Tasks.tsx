import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Task } from '../store/types';
import { setTaskToDelete, setTaskToEdit } from '../store/actions';
import { RootState } from '../store/store';
import { fetchTaskes, removeTask } from '../store/reducers/TaskREducer';
import { useAppDispatch } from '../utils/hooks';
import { toast } from 'react-toastify';
import EditTaskModal from './EditTaskModal';

interface TasksProps {
  tasks: Task[];
}

const Tasks: FC<TasksProps> = ({ tasks }) => {

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [taskEdit,settaskEdit]=useState({})
  const [taskId,settaskId]=useState(0)
  const list = useSelector((state: RootState) => state.taskKey.taskList);

  const setTaskToEditHandler = (task: Task) => {
    setIsEditModalOpen(true);
    settaskId(task.id)
    settaskEdit(task)

  }

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const user_id = localStorage.getItem('data')
  useEffect(() => {
    dispatch(fetchTaskes(user_id))
  }, [user_id, dispatch])

  const setTaskToDeleteHandler = async (task: number) => {
    try {
      await dispatch(removeTask(task));
      dispatch(fetchTaskes(user_id))

    } catch (error) {
      toast.error('Error removing task:')
    }

  }

  const tasksTable = (
    <div>
          
    <table className="table is-striped is-fullwidth">
      <thead>
        <tr>
          <th>Task</th>
          <th className="has-text-centered">Edit</th>
          <th className="has-text-centered">Delete</th>
        </tr>
      </thead>
      <tbody>
        {
          list.map((task: any) => (
            <tr key={task?.id} className={'completed'}>
              <td>{task?.title}</td>
              <td className="has-text-centered">
                <button className="button is-primary is-small" onClick={() => setTaskToEditHandler(task)}>
                  <span className="icon">
                    <i className="fas fa-edit"></i>
                  </span>
                </button>
              </td>

              <td className="has-text-centered">
                <button className="button is-danger is-small" onClick={() => setTaskToDeleteHandler(task.id)}>
                  <span className="icon">
                    <i className="fas fa-times"></i>
                  </span>
                </button>
              </td>
            </tr>
            
          ))
        }
           {isEditModalOpen && (
        <EditTaskModal taskId={taskId} currentTask={taskEdit} onClose={closeEditModal} />
      )}
      </tbody>
    </table>
 
    </div>
  );

  return (
    <section className="section">
      <h2 className="is-size-4 has-text-centered">List of tasks in selected list</h2>
      {tasks.length === 0 ? <p className="py-4 has-text-centered">No Tasks</p> : tasksTable}
    </section>
  );
}

export default Tasks;