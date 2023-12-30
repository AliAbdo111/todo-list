import React, { FC, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector, } from 'react-redux';

import { Category,  } from '../store/types';
import { useAppSelector } from '../utils/hooks';
import { fetchCategory, setCategorySelected } from '../store/reducers/categoryReducer';
import { fetchTaskes, filterByCategory } from '../store/reducers/taskReducer';
import { RootState } from '../store/store';

const SelectList: FC = () => {
  
// Hookes used in component
  const dispatch = useDispatch();
  const user_id =  useSelector((state:RootState)=>state.aouthKey.id)
  const list    =   useAppSelector(state=>state.CategoryKey.categoryList)
  const id    =   useAppSelector(state=>state.CategoryKey.id)
  
  useEffect(()=>{
    dispatch(fetchCategory())
  },[dispatch])


  const selectChangeHandler = async(e: any) => {
    console.log(e.target.value)
    dispatch(setCategorySelected(e.target.value))
    await dispatch(filterByCategory(e.target.value));
  }

  return(
    <section>
      <h2 className="is-size-4 has-text-centered mb-4">Choose a Category</h2>
      <div className="field mb-5">
        <div className="control has-icons-left">
          <div className="select fullwidth">
            <select className="fullwidth" defaultValue={id} onChange={selectChangeHandler} >
              <option value="">Select List</option>
              {list.length > 0 &&
                list.map((list: Category) => (
                  <option key={list?.id}  value={list?.id}>{list?.CategoryName}</option>
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