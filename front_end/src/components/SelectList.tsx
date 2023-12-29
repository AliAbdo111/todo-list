import React, { FC, FormEvent, useEffect } from 'react';
import { useDispatch, } from 'react-redux';

import { Category,  } from '../store/types';
import { useAppSelector } from '../utils/hooks';
import { fetchCategory } from '../store/reducers/categoryreduser';
import { fetchTaskes } from '../store/reducers/TaskREducer';

const SelectList: FC = ({}) => {

  const dispatch = useDispatch();

  const list =useAppSelector(state=>state.CategoryKey.categoryList);
  useEffect(()=>{
    dispatch(fetchCategory())

  },[dispatch])
  const selectChangeHandler = (e: FormEvent<HTMLSelectElement>) => {
    const user_id=localStorage.getItem('data')
    const data={
      user_id:user_id,
    }
    dispatch(fetchTaskes(data));
  }

  return(
    <section>
      <h2 className="is-size-4 has-text-centered mb-4">Choose a Category</h2>
      <div className="field mb-5">
        <div className="control has-icons-left">
          <div className="select fullwidth">
            <select className="fullwidth" onChange={selectChangeHandler}>
              <option value="">Select List</option>
              {list.length > 0 &&
                list.map((list: Category) => (
                  <option key={list?.id} value={list?.id}>{list?.CategoryName}</option>
                ))
              }
            </select>
          </div>
          <div className="icon is-small is-left">
            <i className="fas fa-list"></i>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SelectList;