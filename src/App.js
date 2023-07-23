import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./screens/Home";
import Header from "./component/Header";

function App() {
  
  return (
      <div className="flex flex-col w-full h-screen">
        <Header />
        <div className="flex px-20 w-full h-screen">
          <Home />
        </div>
      </div>
  );
}

export default App;
