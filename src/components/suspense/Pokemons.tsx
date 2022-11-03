import React from "react";
import axios from "axios";

const fetchPokemons = async () => {
  const pokemons = await axios.get("https://pokeapi.co/api/v2/pokemon");
  return pokemons.data;
};
export const Pokemons: React.FC = () => {
  const data = fetchPokemons();
  console.log(data);

  return <ul></ul>;
};
