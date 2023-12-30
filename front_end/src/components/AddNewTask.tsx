import React, { FC, useState, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { List,  } from '../store/types';
import TaskREducer, { addTask ,fetchTaskes,Task} from '../store/reducers/taskReducer';
import { toast } from 'react-toastify';
import { RootState } from '../store/store';

interface AddNewTaskProps {
  list: any;
}

const AddNewTask: FC<AddNewTaskProps> = ({ list }) => {

  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState('');
  const [description, setTaskDescription] = useState('');
  const user_id =useSelector((state:RootState)=>state.aouthKey.id);
  let categoryId= useSelector((state:RootState)=>state.CategoryKey.id);


  const changeHandlerName = (e: FormEvent<HTMLInputElement>) => {
    setTaskName(e.currentTarget.value);
  }
  const changeHandlerDes = (e: FormEvent<HTMLInputElement>) => {
    setTaskDescription(e.currentTarget.value);
  }

  const submitHandler =async (e: FormEvent<HTMLFormElement>) => {
    try{e.preventDefault();
    if(taskName.trim() === '') {
      toast.warn('Task name is required!');
    }

    let newTask = {
      title: taskName,
      description: description, 
      category:categoryId,
      user:user_id
    }

   await dispatch(addTask(newTask));
   dispatch(fetchTaskes(user_id));

    setTaskName('');
    setTaskDescription('')
}catch(error){
toast.error('Error Occuerd server')
}
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
            <input type="date" className="input" placeholder="Add Task Description" value={description} onChange={changeHandlerDes} />
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