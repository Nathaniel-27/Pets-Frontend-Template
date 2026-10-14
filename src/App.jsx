import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import UsersPage from "./pages/users/UsersPage"
import NotFound from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/users/*" element={<UsersPage />} />
      
      {/* This catch-all route must be last */}
      <Route path="*" element={<NotFound />} /> 
    </Routes>
  );
}

export default App;