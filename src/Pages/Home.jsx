import React from "react";
import Card from "../Components/Card";
import MenShoe from "./Men/MenShoe";
function Home() {
  return <>
  <div className="flex">
    <div className="flex-10/12 text-center items-center justify-center bg-green-400">
    <MenShoe/>
    </div>
  </div>
  </>;
}

export default Home;
