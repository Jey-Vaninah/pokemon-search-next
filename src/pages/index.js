"use client";

import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { randomNumber } from "../utils/random";
import { SearchInput } from "@/components";
import { axioInstance } from "@/config/axios";

const PokemonSearchPage = () => {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState({
    value: "",
    showSuggestion: false,
    selectedPokemon: null,
  });

  const router = useRouter();

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const { data } = await axioInstance.get("/pokemon-species?limit=1000");
        setPokemons(data.results);
      } catch (error) {
        console.error("Erreur lors du chargement des Pokémon :", error);
      }
    };

    fetchPokemons();
  }, []);

  const pokemonSuggestions = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().startsWith(search.value.toLowerCase())
  );

  const doSearch = () => {
    const pokemon =
      search.selectedPokemon ?? pokemons.find((p) => p.name.toLowerCase() === search.value.toLowerCase());
    if (!pokemon) return;

    const id = pokemon.url.split("/").filter(Boolean).pop();
    router.push(`/details/${id}`);
  };

  return (
    <div className="bg-cover bg-center h-screen w-full flex flex-col items-center" style={{ backgroundImage: "url('/background.png')" }}>
      <div className="bg-[rgba(0,0,0,.5)] w-full min-h-full flex flex-col  p-10 items-center">
        <h1 className="text-white text-4xl font-bold">
          Welcome to <span className="text-blue-400">Pokémon Search</span>
        </h1>

        <div className="relative w-[700px] mt-6 flex flex-col gap-2">
          <SearchInput searchValue={search.value} suggestions={pokemonSuggestions} showSuggestion={search.showSuggestion} setSearch={setSearch} />
        </div>

        <div className="mt-6 flex gap-4">
          <button
            onClick={doSearch}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <FaSearch />
            Search
          </button>
          <button
            onClick={() => router.push(`/details/${randomNumber()}`)}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
          >
            Random
          </button>
        </div>
      </div>
    </div>
  );
};

export default PokemonSearchPage;
