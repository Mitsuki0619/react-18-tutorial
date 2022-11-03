import { Suspense, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Pokemons } from "./components/suspense/Pokemons";

function App() {
  return (
    <div className="App">
      <Suspense fallback={"loading"}>
        <Pokemons />
      </Suspense>
    </div>
  );
}

export default App;
