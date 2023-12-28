import routes from './routes';
import  React from 'react'
import { useRoutes  } from 'react-router-dom';

const App = () => {
  const content = useRoutes(routes);
  return content;
};
export default App;