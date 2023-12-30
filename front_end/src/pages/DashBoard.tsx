import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import '../App.css'
import Sidebar from '.././components/Sidebar';
import { RootState } from '.././store/store';
import MainContent from '.././components/MainContent';
import Profile from './profile/Profil';

const DashBoard: FC = () => {

const user = useSelector((state:RootState)=>state.aouthKey.user);

  return (
    <div className="App">
      {/* <Header title="Task List App" subtitle="Create some lists and add some tasks to each list" /> */}
      <h2 className="is-size-4 has-text-centered mb-4">ToDo list</h2>

      <div className="container px-8">
        <div className="columns">
          <Sidebar />
          <MainContent />
          <Profile user={user } />
        </div> 
      </div>
    </div>
  );
}

export default DashBoard;
