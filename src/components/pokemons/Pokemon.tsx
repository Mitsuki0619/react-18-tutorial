import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export const Pokemon: React.FC<{ pokemonName: string }> = ({ pokemonName }) => {
  const fetchPokeomonDetail = async () => {
    const pokemon = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    return pokemon.data;
  };

  const pokemon = useQuery({
    queryKey: [pokemonName],
    queryFn: fetchPokeomonDetail,
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
