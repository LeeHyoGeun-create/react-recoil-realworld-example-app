import { Outlet, useNavigation } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Root(): JSX.Element {
  const navigation = useNavigation();
  return (
    <>
      <Header />
      <div className={navigation.state === 'loading' ? 'loading' : ''}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Root;
