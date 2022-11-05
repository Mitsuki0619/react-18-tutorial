import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

/**
 * ポケモン情報取得関数
 * @param pokemonName ポケモンの名前
 * @re turns ポケモンの情報
 */
const fetchPokeomonDetail = async (pokemonName: string) => {
  const pokemon = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
  );
  return pokemon.data;
};

/**
 * 各ポケモンの画像と名前表示コンポーネント
 */
export const Pokemon: React.FC<{ pokemonName: string }> = ({ pokemonName }) => {
  /**
   * reactQueryで取得したデータをクエリに格納
   * suspenseをtrueにしているため、suspenseが使える
   */
  const pokemon = useQuery({
    queryKey: [pokemonName],
    queryFn: () => fetchPokeomonDetail(pokemonName),
    enabled: pokemonName !== undefined,
    suspense: true,
  });

  return (
    <div className="text-center rounded-md shadow-lg p-3 bg-neutral-600">
      <div className="flex">
        <img src={pokemon.data.sprites.front_default} alt={pokemon.data.name} />
        <img src={pokemon.data.sprites.front_shiny} alt={pokemon.data.name} />
      </div>
      <p>{pokemon.data.name}</p>
    </div>
  );
};
