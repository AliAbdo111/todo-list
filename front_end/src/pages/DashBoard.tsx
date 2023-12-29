import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import '../App.css'
import Header from '.././components/Header';
import Sidebar from '.././components/Sidebar';
import Notification from '.././components/Notification';
import { RootState } from '.././store/store';
import DeleteListModal from '.././components/DeleteListModal';
import EditListModal from '.././components/EditListModal';
import MainContent from '.././components/MainContent';
import EditTaskModal from '.././components/EditTaskModal';
import DeleteTaskModal from '.././components/DeleteTaskModal';
import Profile from './profile/Profil';

const DashBoard: FC = () => {
  // const notificationMsg = useSelector((state: RootState) => state.notification.message);
  // const listIdToDelete = useSelector((state: RootState) => state.list.listIdToDelete);
  // const listToEdit = useSelector((state: RootState) => state.list.listToEdit);
  // const taskToEdit = useSelector((state: RootState) => state.list.taskToEdit);
  // const taskToDelete = useSelector((state: RootState) => state.list.taskToDelete);

  return (
    <div className="App">
      {/* <Header title="Task List App" subtitle="Create some lists and add some tasks to each list" /> */}
      <h2 className="is-size-4 has-text-centered mb-4">ToDo list</h2>

      <div className="container px-8">
        <div className="columns">
          <Sidebar />
          <MainContent />
          <Profile />
        </div>
      </div>

      {/* <Notification msg={notificationMsg} />
      {listIdToDelete && <DeleteListModal listId={listIdToDelete} />}
      {listToEdit && <EditListModal list={listToEdit} />}
      {taskToEdit && <EditTaskModal taskToEdit={taskToEdit} />}
      {taskToDelete && <DeleteTaskModal taskToDelete={taskToDelete} />} */}
    </div>
  );
}

export default DashBoard;
