import { Suspense, useState } from "react";
import { Pokemons } from "./components/pokemons/Pokemons";
import { ErrorBoundary } from "react-error-boundary";
import { FetchError, onError } from "./FetchError";
import { SkeltonList } from "./components/pokemons/Skelton";

function App() {
  /**
   * 検索ワード管理state
   */
  const [search, setSearch] = useState<string>("");

  return (
    <div className="h-full w-full">
      <div className="w-full h-full flex flex-col items-center justify-center py-8 gap-5">
        <div>
          <input
            type="text"
            className="rounded-full py-2 px-4 bg-transparent shadow-lg w-96 border-2 border-neutral-300 focus:outline-none text-2xl text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <ErrorBoundary FallbackComponent={FetchError} onError={onError}>
          <Suspense fallback={<SkeltonList/>}>
            <Pokemons search={search} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;
