import React, { FC, useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';

import { List,  } from '../store/types';
import TaskREducer, { addTask ,fetchTaskes,Task} from '../store/reducers/TaskREducer';
import { toast } from 'react-toastify';
// import { addTask, setNotification } from '../store/actions';

interface AddNewTaskProps {
  list: any;
}

const AddNewTask: FC<AddNewTaskProps> = ({ list }) => {
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState('');
  const [description, setTaskDescription] = useState('');

  const changeHandlerName = (e: FormEvent<HTMLInputElement>) => {
    setTaskName(e.currentTarget.value);
  }
  const changeHandlerDes = (e: FormEvent<HTMLInputElement>) => {
    setTaskDescription(e.currentTarget.value);
  }
  const submitHandler =async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(taskName.trim() === '') {
      toast.warn('Task name is required!');
    }
const user_id=Number( localStorage.getItem('data') )
    const newTask: Task = {
      title: taskName,
      description: description, 
      category:3,
      user:2
    }

   await dispatch(addTask(newTask));
   dispatch(fetchTaskes(Number(localStorage.getItem('data'))));

    setTaskName('');
    setTaskDescription('')

  }

  return(
    <section className="section">
      <h2 className="is-size-4 has-text-centered">Add new task to selected field</h2>
      <form onSubmit={submitHandler}>
        <div className="field">
          <label className="label">Task Name</label>
          <div className="control">
            <input type="text" className="input" placeholder="Add Task" value={taskName} onChange={changeHandlerName} />
          </div>
          <div className="control mt-4 ">
            <input type="text" className="input" placeholder="Add Task Description" value={description} onChange={changeHandlerDes} />
          </div>
          <div className="control mt-4">
            <input type="submit" value="Add New Task" className="button is-primary" />
          </div>
        </div>
      </form>
    </section>
  );
}

export default AddNewTask;