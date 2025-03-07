import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./Pages/Home";
import ChildrenShoe from "./Pages/Children/ChildrenShoe";
import WomenShoe from "./Pages/Women/WomenShoe";
import Header from "./Components/Header";
import MenShoe from "./Pages/Men/MenShoe";
function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" Component={Home}/>
        <Route path="/ChildrenShoe" Component={ChildrenShoe}/>
        <Route path="/WomenShoe" Component={WomenShoe}/>
        <Route path="/MenShoe" Component={MenShoe}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
