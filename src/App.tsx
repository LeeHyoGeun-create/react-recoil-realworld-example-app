import { RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import route from './routes/route';

function App(): JSX.Element {
  return (
    <RecoilRoot>
      <RouterProvider router={route} />
    </RecoilRoot>
  );
}

export default App;
