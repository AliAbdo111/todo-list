import React, { FC, Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';

import SelectList from './SelectList';
import { RootState } from '../store/store';
import AddNewTask from './AddNewTask';
import Tasks from './Tasks';
import {useAppDispatch ,useAppSelector} from '../utils/hooks';
import { fetchTaskes } from '../store/reducers/TaskREducer';
import { useDispatch } from 'react-redux';
const MainContent: FC = () => {
  const despatch=useDispatch()
  const selectedList =useAppSelector(state=>state.taskKey.taskList);
 const user_id=localStorage.getItem('data')
  useEffect(()=>{
    despatch(fetchTaskes(user_id))
  },[despatch])

  return(
    <div className="column is-6">
      <div className="box">
        <SelectList />
        {
          selectedList &&
            <Fragment>
              <AddNewTask list={selectedList} />
              <hr/>
              <Tasks tasks={selectedList} />
            </Fragment>
        }
      </div>
    </div>
  );
}

export default MainContent;