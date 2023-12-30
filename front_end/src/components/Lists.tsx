import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../store/store';
import { Category } from '../store/types';
import { fetchCategory } from '../store/reducers/categoryReducer';
import EditListModal from './EditListModal';

const Lists: FC = () => {
    // Hookes used in component
  const [isEditModalOpen, setisEditModalOpen] = useState(false)
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.CategoryKey.categoryList);
  useEffect(() => {dispatch(fetchCategory());}, [dispatch]);

  // hundeler used in component
  const setListToEditHandler = (id: any) => {
    setisEditModalOpen(true)
  }
  const closeEditModal = () => {
    setisEditModalOpen(false);
  };
// ui
  return (
    <div className="panel is-primary">
      <p className="panel-heading">Your categories</p>
      <div>
        {categories.length === 0
          ?
          <p className="py-4 has-text-centered">No categories</p>
          :
          <div>
            {categories.map((list: Category) => {
              return <div className="panel-block py-3" key={list?.id}>
                  {isEditModalOpen && (
                  <EditListModal currentList={list.CategoryName} onClose={closeEditModal} listId={list.id} />
                )}
                <p className='red' >{list?.CategoryName}</p>
                <span className="icon" onClick={() => setListToEditHandler(list?.id)}>
                  <i className="fas fa-edit red"></i>
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