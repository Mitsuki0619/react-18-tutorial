import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { FetchError } from "../../FetchError";

/**
 * ポケモン情報取得関数
 * @param pokeName apiのエンドポイント
 * @re turns ポケモンの情報
 */
const fetchPokeomon = async (url: string) => {
  const pokemon = await axios.get(url);
  return pokemon.data;
};

/**
 * ポケモン詳細情報取得関数
 * @param url apiのエンドポイント
 * @re turns ポケモンの詳細情報
 */
const fetchSpecies = async (url: string) => {
  const species = await axios.get(url);
  return species.data;
};

/**
 * 各ポケモンの画像と名前表示コンポーネント
 */
export const Pokemon: React.FC<{ pokeName: string; url: string }> = ({
  pokeName,
  url,
}) => {
  const pokemon = useQuery({
    queryKey: [pokeName],
    queryFn: () => fetchPokeomon(url),
    enabled: pokeName !== undefined,
    suspense: true,
  });

  return (
    <div className="text-center rounded-md shadow-lg p-3 bg-neutral-600">
      <div className="flex">
        <img src={pokemon.data.sprites.front_default} alt={pokemon.data.name} />
        <img src={pokemon.data.sprites.front_shiny} alt={pokemon.data.name} />
      </div>
      <p>{pokemon.data.name}</p>
      <ErrorBoundary FallbackComponent={FetchError}>
        <PokeSpecies pokeName={pokeName} url={pokemon.data?.species.url} />
      </ErrorBoundary>
    </div>
  );
};

/**
 * ポケモン詳細情報表示コンポーネント（とりあえず日本語名を表示）
 */
const PokeSpecies: React.FC<{ pokeName: string; url: string }> = ({
  pokeName,
  url,
}) => {
  const species = useQuery({
    queryKey: [`${pokeName}'s species`],
    queryFn: () => fetchSpecies(url),
    suspense: true,
  });
  return <p>{species.data.names[0].name}</p>;
};
