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
import About from "./Pages/About";
import Services from "./Pages/Services";
import Contact from "./Pages/Contact";
function App() {
  return (
    <WishlistProvider>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Header />
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/Services" Component={Services} />
            <Route path="/Contact" Component={Contact} />
            <Route path="/About" Component={About} />
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
