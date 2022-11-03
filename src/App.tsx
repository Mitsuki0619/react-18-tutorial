import { Suspense } from "react";
import { Pokemons } from "./components/suspense/Pokemons";
import { ErrorBoundary } from "react-error-boundary";
import { FetchError, onError } from "./FetchError";

function App() {
  return (
    <div>
      <ErrorBoundary FallbackComponent={FetchError} onError={onError}>
        <Suspense fallback={"loading"}>
          <Pokemons />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
