import React, { Suspense, useEffect, useState, useTransition } from "react";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Pokemon } from "./Pokemon";
import { SkeltonList } from "./Skelton";

/**
 * ポケモンAPIを叩く
 * @returns 取得データ
 */
const fetchPokemons = async () => {
  const pokemons = await axios.get(
    "https://pokeapi.co/api/v2/pokemon?limit=1500"
  );
  return pokemons.data;
};

/**
 * ポケモンリストコンポーネント
 */
export const Pokemons: React.FC<{ search: string }> = ({ search }) => {
  /**
   * reactQueryで取得したデータをクエリに格納
   * suspenseをtrueにしているため、suspenseが使える
   */
  const pokemons = useQuery({
    queryKey: ["pokemons"],
    queryFn: fetchPokemons,
    suspense: true,
  });

  /**
   * useTransitionの実体化
   */
  const [isPending, startTransition] = useTransition();

  /**
   * 検索ワードで絞り込んだポケモン配列（実際に表示させるポケモンの配列）
   */
  const [filteredPokemons, setFilteredPokemons] = useState([]);

  /**
   * 取得したポケモンデータを検索ワードで絞り込む
   * @param search 検索ワードのstate
   * @returns 絞り込んだ結果
   */
  const filterPokemons = (search: string) => {
    if (!search) {
      return pokemons.data.results;
    }
    return pokemons.data.results.filter((elem: any) =>
      elem.name.includes(search)
    );
  };

  useEffect(() => {
    // transition
    startTransition(() => setFilteredPokemons(filterPokemons(search)));
  }, [search]);

  return (
    <>
      {isPending && <SkeltonList />}
      <ul className="flex w-10/12 flex-wrap gap-5 justify-center">
        {filteredPokemons.map((elem: any) => (
          <li key={elem.name}>
            <Pokemon pokemonName={elem.name} />
          </li>
        ))}
      </ul>
    </>
  );
};
