import MainLayout from './MainLayout'
import { useDocTitle } from '../customHooks'
import { Link } from 'react-router-dom';

const NotFound = () => {

  const [doctitle, setDocTitle] = useDocTitle("404 - Page Not Found");

  return (
    <MainLayout>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">Go to Homepage</Link>
    </MainLayout>
  );
};

export default NotFound;