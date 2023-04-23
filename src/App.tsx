import { RouterProvider } from 'react-router-dom';
import route from './routes/route';

function App(): JSX.Element {
  return <RouterProvider router={route} />;
}

export default App;
