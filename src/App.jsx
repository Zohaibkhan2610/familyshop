import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./Pages/Home";
import ChildrenShoe from "./Pages/Children/ChildrenShoe";
import WomenShoe from "./Pages/Women/WomenShoe";
import Header from "./Components/Header";
import MenShoe from "./Pages/Men/MenShoe";
import ScrollToTop from "./Components/ScrollToTop";
function App() {
  return (
    <BrowserRouter>
    <ScrollToTop/>
    <Header/>
      <Routes>
        <Route path="/" Component={Home}/>
        <Route path="/Children" Component={ChildrenShoe}/>
        <Route path="/Women" Component={WomenShoe}/>
        <Route path="/Men" Component={MenShoe}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
