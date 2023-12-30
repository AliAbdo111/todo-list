import React, { FC, Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { fetchTaskes } from '../store/reducers/taskReducer';
import { useAppSelector} from '../utils/hooks';
import { RootState } from '../store/store';
import SelectList from './SelectList';
import AddNewTask from './AddNewTask';
import Tasks from './Tasks';


const MainContent: FC = () => {

  const despatch=useDispatch()
  const selectedList =useAppSelector(state=>state.CategoryKey.id);
  const user_id =useSelector((state:RootState)=>state.aouthKey.id);
  useEffect(()=>{ despatch(fetchTaskes(user_id))},[despatch]);

  return(
    <div className="column is-6">
      <div className="box">
        <SelectList />
        {
          selectedList &&
            <Fragment>
              <AddNewTask list={selectedList} />
              <hr/>
              <Tasks  />
            </Fragment>
        }
      </div>
    </div>
  );
}

export default MainContent;