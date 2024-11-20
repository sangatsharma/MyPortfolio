// src/App.tsx
import React from "react";
import CanvasComponent from "./components/CanvasComponent";
import Portfolio from "./pages/portfolio";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1 className="text-center text-2xl mt-4">Canvas Animation</h1>
      {/* <CanvasComponent /> */}
      <Portfolio />
    </div>
  );
};

export default App;
