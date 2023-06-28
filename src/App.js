import React, { useContext } from 'react';
import Settings from "./Components/settings";
import Timer from "./Components/timer";


import {Context } from "./Context/DataContext";

function App() {
  const {toggled} = useContext(Context);
  // console.log("toggled is: " + toggled);

  return (
    <div className="App">
      <Timer/>
      <Settings />
    </div>
  );
}

export default App;
