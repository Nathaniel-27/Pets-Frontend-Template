import MainLayout from './MainLayout'
import { useDocTitle } from '../customHooks'

const HomePage = () => {

  const [doctitle, setDocTitle] = useDocTitle("Home page");

  return (
    <MainLayout>
      <h1>Home Page</h1>
      <p>You can use this front end app to manage users in your API project</p>
    </MainLayout>
  )
}

export default HomePage