import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { FetchError } from "../../FetchError";

/**
 * ポケモン情報取得関数
 * @param pokeName ポケモンの名前
 * @re turns ポケモンの情報
 */
const fetchPokeomonDetail = async (pokeName: string) => {
  const pokemon = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${pokeName}`
  );
  return pokemon.data;
};

const fetchJaName = async (url: string) => {
  const species = await axios.get(url);
  return species.data;
};

/**
 * 各ポケモンの画像と名前表示コンポーネント
 */
export const Pokemon: React.FC<{ pokeName: string }> = ({ pokeName }) => {
  /**
   * reactQueryで取得したデータをクエリに格納
   * suspenseをtrueにしているため、suspenseが使える
   */
  const pokemon = useQuery({
    queryKey: [pokeName],
    queryFn: () => fetchPokeomonDetail(pokeName),
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

const PokeSpecies: React.FC<{ pokeName: string; url: string }> = ({
  pokeName,
  url,
}) => {
  const species = useQuery({
    queryKey: [`${pokeName}JP`],
    queryFn: () => fetchJaName(url),
    suspense: true,
  });
  return <p>{species.data.names[0].name}</p>;
};
