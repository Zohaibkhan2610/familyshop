import React from "react";
import Sidebar from './../Layout/Sidebar'
function Home() {
  return <>
  <div className="flex">
    <div className="flex-2/12 bg-amber-600"><Sidebar/></div>
    <div className="flex-10/12 bg-green-400">Home</div>
  </div>
  </>;
}

export default Home;
