import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../store/store';
import {  setListToEdit, setListIdToDelete } from '../store/actions';
import { Category, List } from '../store/types';
import { fetchCategory } from '../store/reducers/categoryreduser';

const Lists: FC = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.CategoryKey.categoryList);

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  const setListToEditHandler = (id: any) => {
    // dispatch(setListToEdit(id));
  } 

  const setListIdToDeleteHandler = (id: string) => {
    dispatch(setListIdToDelete(id));
  }

  return(
    <div className="panel is-primary">
      <p className="panel-heading">Your categories</p>
      <div>
        { categories.length === 0
          ?
            <p className="py-4 has-text-centered">No categories</p>
          :
            <div>
              {categories.map((list: Category) => {
                return <div className="panel-block py-3" key={list?.id}>
                  <p className='red' onClick={() => setListToEditHandler(list?.id)}>{list?.CategoryName}</p>
                  <span className="panel-icon has-text-danger" onClick={() => console.log('')}>
                    <i className="fas fa-times-circle"></i>
                  </span>
                </div>
              })}
            </div>
        }
      </div>
    </div>
  );
}

export default Lists;