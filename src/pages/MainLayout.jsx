import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const MainLayout = ({children}) => {
  return (
    <>
      <Header />
      <NavBar />
      <main>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default MainLayout