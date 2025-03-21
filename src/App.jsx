import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./Pages/Home";
import ChildrenShoe from "./Pages/Children/ChildrenShoe";
import WomenShoe from "./Pages/Women/WomenShoe";
import Header from "./Components/Header";
import MenShoe from "./Pages/Men/MenShoe";
import ScrollToTop from "./Components/ScrollToTop";
import { AuthProvider } from "./Context/AuthContext";
import RegistrationPage from "./Pages/Account/RegisterPage"; 
import { WishlistProvider } from "./Context/WishlistContext";
import LoginPage from "./Pages/Account/LoginPage";
import ProfilePage from "./Pages/Account/ProfilePage";
import About from "./Pages/About";
import Services from "./Pages/Services";
import Contact from "./Pages/Contact";
import WishlistPage from "./Pages/Account/WishlistPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SettingsPage from "./Pages/Account/SettingsPage";
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
            <Route path="/Settings" Component={SettingsPage} />
            <Route path="/Wishlist" Component={WishlistPage}/>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      <ToastContainer />
    </WishlistProvider>
    
  );
}

export default App;
