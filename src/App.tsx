import { Suspense, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { PokeList } from "./components/PokeList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Suspense fallback={"loading"}>
        <PokeList />
      </Suspense>
    </div>
  );
}

export default App;
