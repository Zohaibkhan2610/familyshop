import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./Pages/Home";
import ChildrenShoe from "./Pages/ChildrenShoe";
import WomenShoe from "./Pages/WomenShoe";
import MenShoe from "./Pages/MenShoe";
import Header from "./Components/Header";
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
