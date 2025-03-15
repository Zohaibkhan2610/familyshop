import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./Pages/Home";
import ChildrenShoe from "./Pages/Children/ChildrenShoe";
import WomenShoe from "./Pages/Women/WomenShoe";
import Header from "./Components/Header";
import MenShoe from "./Pages/Men/MenShoe";
import ScrollToTop from "./Components/ScrollToTop";
import { AuthProvider } from "./Context/AuthContext";
import RegistrationPage from "./Pages/Registartion/RegisterPage"; 
import { WishlistProvider } from "./Context/WishlistContext";
import LoginPage from "./Pages/Registartion/LoginPage";
import ProfilePage from "./Pages/Registartion/ProfilePage";
function App() {
  return (
    <WishlistProvider>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Header />
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/login" Component={LoginPage} />
            <Route path="/Register" Component={RegistrationPage} />
            <Route path="/Profile" Component={ProfilePage} />
            <Route path="/Children" Component={ChildrenShoe} />
            <Route path="/Women" Component={WomenShoe} />
            <Route path="/Men" Component={MenShoe} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </WishlistProvider>
  );
}

export default App;
