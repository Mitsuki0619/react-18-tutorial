import React, { Suspense, useEffect, useState } from "react";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Pokemon } from "./Pokemon";

export const Pokemons: React.FC = () => {
  const fetchPokemons = async () => {
    const pokemons = await axios.get("https://pokeapi.co/api/v2/pokemon");
    return pokemons.data;
  };

  let random = Math.floor(Math.random() * 1000);
  const queryClient = useQueryClient();
  const pokemons = useQuery({
    queryKey: ["pokemons"],
    queryFn: fetchPokemons,
    suspense: true,
  });

  console.log(pokemons.data?.results);

  return (
    <ul>
      {pokemons.data?.results.map((elem: any) => (
          <li key={elem.name}>
            <Pokemon pokemonName={elem.name} />
          </li>
      ))}
    </ul>
  );
};
