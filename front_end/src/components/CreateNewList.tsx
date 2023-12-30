import React, { FC, useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { addCategory, fetchCategory } from '../store/reducers/categoryReducer';

const CreateNewList: FC = () => {

      // Hookes used in component
  const dispatch = useDispatch();
  const [categoryName, setCategoryName] = useState('');


  const inputChangeHandler = (e: FormEvent<HTMLInputElement>) => {
    setCategoryName(e.currentTarget.value);
  }

  const submitHandler =async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(categoryName.trim() === '') {
      return alert('List name is required!');
    }
    const newList: any = {
      CategoryName: categoryName,
      // tasks: []
    }

  await  dispatch(addCategory(newList));
  dispatch(fetchCategory());
  setCategoryName('');
  }

  return(
    <div className="card mb-5">
      <div className="card-header">
        <p className="card-header-title">Create New List</p>
      </div>
      <div className="card-content">
        <form onSubmit={submitHandler}>
          <div className="field">
            <label className="label">List Name</label>
            <div className="control">
              <input 
                type="text" 
                className="input"
                placeholder="List Name"
                name="listName"
                value={categoryName}
                onChange={inputChangeHandler}
              />
            </div>
          </div>
          <div className="control">
            <button type="submit" className="button is-primary">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateNewList;